import { useState, useRef, useEffect, useCallback } from 'react';

export function useModuleAudio() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const audioLockRef = useRef(false);
  const voicesRef = useRef([]);

  // Load voices securely
  useEffect(() => {
    const loadVoices = () => {
      let availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        voicesRef.current = availableVoices;
      }
    };
    
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
    
    return () => {
      // Clean up on unmount just in case
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopModuleAudio = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      audioLockRef.current = false;
      setIsSpeaking(false);
    }
  }, []);

  const speakModuleText = useCallback(async (text) => {
    if (!window.speechSynthesis) {
      setAudioError("Tu navegador no soporta síntesis de voz.");
      return;
    }

    if (audioLockRef.current || isSpeaking) {
      return;
    }

    audioLockRef.current = true;
    setIsSpeaking(true);
    setAudioError(null);

    // Cancel anything that might be stuck
    window.speechSynthesis.cancel();
    await new Promise(resolve => setTimeout(resolve, 50));

    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      let voices = voicesRef.current;
      if (voices.length === 0) {
        voices = window.speechSynthesis.getVoices();
        voicesRef.current = voices;
      }

      // Priority: Default -> MS Desktop -> Google US -> en-US -> en
      let selectedVoice = null;
      selectedVoice = voices.find(v => v.default) || 
                      voices.find(v => v.name.includes("Microsoft") && v.lang.startsWith("en")) ||
                      voices.find(v => v.name.includes("Google US English")) ||
                      voices.find(v => v.lang === 'en-US') ||
                      voices.find(v => v.lang.startsWith('en')) || 
                      voices[0];

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      let watchdog;
      let hasStarted = false;

      const cleanup = () => {
        clearTimeout(watchdog);
        audioLockRef.current = false;
        setIsSpeaking(false);
      };

      utterance.onstart = () => {
        hasStarted = true;
        clearTimeout(watchdog);
      };

      utterance.onend = () => {
        cleanup();
        resolve();
      };

      utterance.onerror = (e) => {
        cleanup();
        if (e.error !== "interrupted" && e.error !== "canceled") {
          setAudioError(`Error de audio: ${e.error}`);
        }
        resolve(); // resolve instead of reject so UI doesn't crash
      };

      // Watchdog: If onstart doesn't fire in 2 seconds, OS service is stuck
      watchdog = setTimeout(() => {
        if (!hasStarted) {
          window.speechSynthesis.cancel();
          cleanup();
          setAudioError("El motor de voz está bloqueado en tu sistema.");
          resolve(); 
        }
      }, 2000);

      window.speechSynthesis.speak(utterance);
    });
  }, [isSpeaking]);

  return {
    isSpeaking,
    audioError,
    speakModuleText,
    stopModuleAudio
  };
}
