import { Fragment, useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';
import { sendMessageToAI, getAIUsageStatus } from '../../services/aiService';
import AIAvatar from './AIAvatar';
import AIUsageBar from '../AIUsage/AIUsageBar';
import PracticeModeSelector from './PracticeModeSelector';
import { normalizeSpeechTranscript } from '../../utils/speechUtils';

function loadVoices() {
  return new Promise((resolve) => {
    let voices = window.speechSynthesis.getVoices();

    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    const timeout = setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', handler);
      resolve(window.speechSynthesis.getVoices());
    }, 1500);

    const handler = () => {
      voices = window.speechSynthesis.getVoices();
      clearTimeout(timeout);
      window.speechSynthesis.removeEventListener('voiceschanged', handler);
      resolve(voices);
    };

    window.speechSynthesis.addEventListener('voiceschanged', handler);
  });
}

function renderMessageText(text) {
  return text.split('\n').map((line, index, lines) => (
    <Fragment key={`${index}-${line.slice(0, 16)}`}>
      {line}
      {index < lines.length - 1 && <br />}
    </Fragment>
  ));
}

async function testBeep() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    throw new Error('AudioContext no soportado');
  }

  const ctx = new AudioContextClass();
  if (ctx.state === 'suspended') await ctx.resume();

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = 440;
  gain.gain.value = 0.2;

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start();
  setTimeout(() => {
    oscillator.stop();
    ctx.close();
  }, 600);
}

const AIChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Hi there! I'm Andres, your English tutor. I'm ready to help you practice. How can I assist you today?" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioError, setAudioError] = useState('');
  const [isDiagOpen, setIsDiagOpen] = useState(false);
  const [aiUsage, setAiUsage] = useState(null);
  const [practiceMode, setPracticeMode] = useState(() => {
    return localStorage.getItem('andres_practice_mode') || 'daily_conversation';
  });

  useEffect(() => {
    localStorage.setItem('andres_practice_mode', practiceMode);
  }, [practiceMode]);

  const isAiUnavailable = aiUsage?.isLimitReached || aiUsage?.isAiEnabled === false;

  const [diag, setDiag] = useState({
    speechSynthesisSupported: 'speechSynthesis' in window,
    voicesCount: 0,
    selectedVoiceName: 'None',
    selectedVoiceLang: 'None',
    lastAudioEvent: 'None',
    lastAudioError: 'None',
    audioContextSupported: !!(window.AudioContext || window.webkitAudioContext),
    currentUrl: window.location.href,
    userAgent: navigator.userAgent,
    lastMicError: 'None',
    sysSpeaking: false,
  });

  const messagesEndRef = useRef(null);
  const recognition = useRef(null);
  const audioLockRef = useRef(false);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      loadVoices().then((voices) => {
        setDiag((prev) => ({ ...prev, voicesCount: voices.length }));
      });
    }

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = true;
      recognition.current.lang = 'en-US';
      recognition.current.maxAlternatives = 1;

      let finalTranscript = '';
      let isProcessing = false;

      // In DEV, run tests once
      if (import.meta.env.DEV) {
        import('../../utils/speechUtils').then(m => m.runSpeechTests());
      }

      recognition.current.onresult = (event) => {
        let interimTranscript = '';
        let avgConfidence = 0;
        let finalResultsCount = 0;

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
            avgConfidence += result[0].confidence;
            finalResultsCount++;
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        const currentText = finalTranscript || interimTranscript;
        if (currentText) {
          setInput(currentText);
        }

        if (finalTranscript && !isProcessing) {
          isProcessing = true;

          const confidence = finalResultsCount > 0 ? avgConfidence / finalResultsCount : 0;

          if (import.meta.env.DEV) {
            console.log('[Speech] Raw Result:', event.results);
            console.log('[Speech] Final Transcript Built:', finalTranscript);
            console.log('[Speech] Confidence:', confidence);
          }

          // Confidence validation (0.55 threshold)
          // We only block if confidence is explicitly low (> 0)
          if (confidence > 0 && confidence < 0.55) {
            if (import.meta.env.DEV) console.warn('[Speech] Confidence too low, asking to repeat.');
            setAudioError('I didn\'t catch that clearly. Please try again.');
            recognition.current.stop();
            setTimeout(() => { isProcessing = false; }, 1000);
            return;
          }

          const normalized = normalizeSpeechTranscript(finalTranscript);
          if (import.meta.env.DEV) console.log('[Speech] Normalized Text:', normalized);

          // Stop and send
          recognition.current.stop();
          handleSendVoice(normalized);

          // Reset
          finalTranscript = '';
          setTimeout(() => { isProcessing = false; }, 1000);
        }
      };

      recognition.current.onerror = (event) => {
        setDiag((prev) => ({ ...prev, lastMicError: event.error }));
        if (event.error !== 'no-speech') {
          setAudioError(`Microphone error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      try {
        window.speechSynthesis.cancel();
      } catch (error) {
        console.warn('Speech synthesis cleanup failed', error);
      }
    };
    // SpeechRecognition is registered once to avoid resetting browser audio state on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchUsage = async () => {
      const status = await getAIUsageStatus();
      if (status) setAiUsage(status);
    };
    fetchUsage();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  async function speakText(text) {
    if (!('speechSynthesis' in window)) throw new Error('speechSynthesis no soportado en este navegador');
    if (!text || !text.trim()) throw new Error('Texto vacio para reproducir');

    const cleanText = text.trim().replace(/[*_#`]/g, '');

    if (recognition.current) {
      try {
        recognition.current.stop();
        setIsListening(false);
      } catch (error) {
        console.warn('Speech recognition stop failed', error);
      }
    }

    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    const voices = await loadVoices();

    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-US';
      utterance.volume = 1;
      utterance.rate = 0.95;
      utterance.pitch = 1;

      const englishVoice =
        voices.find((voice) => voice.default && voice.lang.startsWith('en')) ||
        voices.find((voice) => voice.name.includes('Microsoft') && voice.lang.startsWith('en')) ||
        voices.find((voice) => voice.lang === 'en-US') ||
        voices.find((voice) => voice.lang && voice.lang.startsWith('en')) ||
        voices[0];

      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      setDiag((prev) => ({
        ...prev,
        selectedVoiceName: englishVoice?.name || 'Default',
        selectedVoiceLang: englishVoice?.lang || 'Default',
        lastAudioEvent: 'starting',
        lastAudioError: 'None',
        sysSpeaking: window.speechSynthesis.speaking,
      }));

      let watchdogTimer = null;
      let hasStarted = false;

      utterance.onstart = () => {
        if (watchdogTimer) clearTimeout(watchdogTimer);
        hasStarted = true;
        setIsSpeaking(true);
        setDiag((prev) => ({
          ...prev,
          lastAudioEvent: 'onstart',
          lastAudioError: 'None',
          sysSpeaking: window.speechSynthesis.speaking,
        }));
      };

      utterance.onend = () => {
        if (watchdogTimer) clearTimeout(watchdogTimer);
        setIsSpeaking(false);
        setDiag((prev) => ({
          ...prev,
          lastAudioEvent: 'onend',
          lastAudioError: 'None',
          sysSpeaking: window.speechSynthesis.speaking,
        }));
        resolve();
      };

      utterance.onerror = (event) => {
        if (watchdogTimer) clearTimeout(watchdogTimer);
        const errorName = event.error || 'Unknown';
        setIsSpeaking(false);
        setDiag((prev) => ({
          ...prev,
          lastAudioEvent: 'onerror',
          lastAudioError: errorName,
          sysSpeaking: window.speechSynthesis.speaking,
        }));

        if (errorName === 'interrupted' || errorName === 'canceled') {
          resolve();
          return;
        }

        reject(new Error(errorName));
      };

      try {
        window.speechSynthesis.speak(utterance);
        watchdogTimer = setTimeout(() => {
          if (!hasStarted) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            setDiag((prev) => ({
              ...prev,
              lastAudioEvent: 'watchdog-timeout',
              lastAudioError: 'Engine Deadlocked',
              sysSpeaking: false,
            }));
            reject(new Error('El motor de voz del navegador esta bloqueado.'));
          }
        }, 2000);
      } catch (error) {
        if (watchdogTimer) clearTimeout(watchdogTimer);
        setIsSpeaking(false);
        reject(error);
      }
    });
  }

  const handleTestAudio = async () => {
    if (audioLockRef.current) return;
    audioLockRef.current = true;
    setAudioError('');
    setIsSpeaking(true);
    try {
      await speakText('Audio test successful. I can hear you.');
    } catch (error) {
      setAudioError(error.message || 'Audio failed');
    } finally {
      setIsSpeaking(false);
      audioLockRef.current = false;
    }
  };

  const handleTestBeep = async () => {
    setAudioError('');
    try {
      await testBeep();
    } catch (error) {
      setAudioError(error.message || 'Beep failed');
    }
  };

  const handleMessageAudio = async (text) => {
    if (audioLockRef.current) return;
    audioLockRef.current = true;
    setAudioError('');
    setIsSpeaking(true);
    try {
      await speakText(text);
    } catch (error) {
      setAudioError(error.message || 'Audio failed');
    } finally {
      setIsSpeaking(false);
      audioLockRef.current = false;
    }
  };

  const handleSendVoice = async (text) => {
    console.log('[Chat] textToSend to IA:', text);
    if (!text.trim()) return;
    if (isAiUnavailable) {
      setAudioError(
        aiUsage?.isAiEnabled === false
          ? 'La practica con IA esta pausada temporalmente.'
          : 'Limite mensual de IA alcanzado.'
      );
      return;
    }

    if (recognition.current) {
      try {
        recognition.current.stop();
        setIsListening(false);
      } catch (error) {
        console.warn('Speech recognition stop failed', error);
      }
    }

    const userMessage = { id: Date.now(), sender: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await sendMessageToAI(userMessage.text, messages, practiceMode);
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'ai', text: response.text }]);

      if (response.usage) {
        setAiUsage((prev) => ({
          ...prev,
          monthlyUsed: response.usage.monthlyUsed,
          monthlyLimit: response.usage.monthlyLimit,
          percentageUsed: response.usage.percentageUsed,
          isAiEnabled: response.usage.isAiEnabled ?? prev?.isAiEnabled ?? true,
          isLimitReached: response.usage.isLimitReached ?? response.usage.monthlyUsed >= response.usage.monthlyLimit,
          resetDate: response.usage.resetDate ?? prev?.resetDate,
        }));
      }

      handleMessageAudio(response.text);
    } catch (error) {
      if (error.status === 429) {
        setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'ai', text: error.message }]);
        if (error.usage) setAiUsage(error.usage);
      } else {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, sender: 'ai', text: error.message || 'Error contactando a la IA.' },
        ]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async (event) => {
    if (event) event.preventDefault();
    handleSendVoice(input);
  };

  const toggleListen = () => {
    if (!recognition.current) {
      setAudioError('Microphone not supported.');
      return;
    }

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
      return;
    }

    try {
      recognition.current.start();
      setIsListening(true);
    } catch {
      recognition.current.stop();
      setTimeout(() => {
        try {
          recognition.current.start();
          setIsListening(true);
        } catch {
          setAudioError('Could not access mic.');
        }
      }, 100);
    }
  };

  return (
    <>
      {audioError && <div className="error-toast">{audioError}</div>}

      <div className="chat-shell avant-glass">
        <header className="chat-header">
          <div className="chat-header-top">
            <div className="chat-brand-group">
              <AIAvatar isSpeaking={isSpeaking} />
              <div className="brand-title">
                <Icons.ShieldCheck size={18} color="var(--accent-primary)" />
                <h1>Andres</h1>
              </div>
            </div>

            <AIUsageBar usage={aiUsage} />
          </div>

          <div className="chat-header-modes">
            <PracticeModeSelector currentMode={practiceMode} onModeChange={setPracticeMode} />
          </div>
        </header>

        <div className="messages-container">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-wrapper ${msg.sender === 'user' ? 'user' : 'ai'}`}>
              <div className="message-bubble">
                <div>{renderMessageText(msg.text)}</div>
                {msg.sender === 'ai' && (
                  <button
                    onClick={() => handleMessageAudio(msg.text)}
                    disabled={isSpeaking}
                    className="btn-read-aloud"
                    title="Read aloud"
                  >
                    <Icons.Volume2 size={14} color={isSpeaking ? '#94a3b8' : 'var(--accent-primary)'} />
                  </button>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message-wrapper ai">
              <div className="message-bubble typing">
                <div className="dot-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <form onSubmit={handleSend} className="avant-input-wrapper">
            <button
              type="button"
              onClick={toggleListen}
              className="btn-mic"
              style={{
                background: isListening ? 'var(--accent-soft)' : 'transparent',
                color: isListening ? 'var(--accent-primary)' : 'var(--text-muted)',
              }}
              title="Use Microphone"
              disabled={isTyping || isSpeaking}
            >
              {isListening ? <Icons.Mic size={22} className="listening" /> : <Icons.MicOff size={22} />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your message..."
              className="avant-input"
              disabled={isTyping || isSpeaking}
            />

            <button type="submit" className="btn-avant" disabled={!input.trim() || isTyping || isSpeaking || isAiUnavailable}>
              Send
              <Icons.Send size={18} />
            </button>
          </form>
        </div>

        {/* Compact Diagnostic Panel at Bottom */}
        <div className="diag-footer">
          <button type="button" className="diag-toggle-mini" onClick={() => setIsDiagOpen(!isDiagOpen)}>
            <Icons.Activity size={12} />
            <span>{isDiagOpen ? 'Ocultar Diagnostico' : 'Ver Diagnostico'}</span>
          </button>

          {isDiagOpen && (
            <div className="diag-grid-mini">
              <span>Voices: {diag.voicesCount}</span>
              <span>Speaking: {String(isSpeaking)}</span>
              <span>Mic: {String(isListening)}</span>
              <span>Status: {diag.lastAudioEvent}</span>
              <button type="button" onClick={handleTestAudio} className="btn-mini-test">Audio</button>
              <button type="button" onClick={handleTestBeep} className="btn-mini-test">Beep</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AIChat;
