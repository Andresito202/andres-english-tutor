import { useState } from 'react';
import * as Icons from 'lucide-react';
import { useModuleAudio } from '../../hooks/useModuleAudio';

export default function LessonCard({ lesson, onNext, onPrev, hasNext, hasPrev, isCompleted, onMarkCompleted }) {
  const { speakModuleText, isSpeaking, audioError } = useModuleAudio();
  const [showIpa, setShowIpa] = useState(false);
  
  // Resolve icon using PascalCase mapping.
  const toPascalCase = (str) => str ? str.replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase()) : '';
  const IconName = toPascalCase(lesson.visualKey);
  const IconComponent = Icons[IconName] ? Icons[IconName] : Icons.Image;

  const handlePlayAudio = () => {
    speakModuleText(lesson.audioText || lesson.english);
  };

  return (
    <div className="lesson-flashcard avant-glass fade-in">
      {audioError && <div className="error-toast">{audioError}</div>}
      
      <div className="flashcard-visual">
        <IconComponent size={50} strokeWidth={1.5} color="var(--accent-primary)" />
      </div>

      <div className="flashcard-content">
        <p className="flashcard-spanish">{lesson.spanish}</p>
        <h2 className="flashcard-english">{lesson.english}</h2>
        
        <div className="flashcard-pronunciation-container">
          <div className="pronunciation-line">
            <span className="pronunciation-label">Pronunciación</span>
            <span className="pronunciation-text">{lesson.pronunciation}</span>
          </div>
          
          {lesson.ipa && (
            <div className="ipa-wrapper">
              {showIpa ? (
                <div className="ipa-line fade-in">
                  <span className="ipa-label">IPA (Técnico)</span>
                  <code className="ipa-text">{lesson.ipa}</code>
                </div>
              ) : null}
              
              <button 
                className="btn-toggle-ipa" 
                onClick={() => setShowIpa(!showIpa)}
              >
                {showIpa ? "Ocultar IPA" : "Ver IPA"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flashcard-actions">
        <div className="nav-actions">
          <button 
            className="btn-icon-glass" 
            onClick={onPrev} 
            disabled={!hasPrev}
            title="Anterior"
          >
            <Icons.ArrowLeft size={20} />
          </button>
        </div>

        <button 
          className={`btn-avant play-audio-btn ${isSpeaking ? 'is-playing' : ''}`} 
          onClick={handlePlayAudio}
          disabled={isSpeaking}
        >
          {isSpeaking ? <Icons.Volume2 className="pulsing" /> : <Icons.Volume2 />}
          {isSpeaking ? 'Escuchando...' : 'Escuchar Pronunciación'}
        </button>

        <div className="nav-actions">
          <button 
            className="btn-icon-glass" 
            onClick={onMarkCompleted}
            title={isCompleted ? "Aprendido" : "Marcar como aprendido"}
            style={{ color: isCompleted ? '#22c55e' : 'var(--text-muted)' }}
          >
            {isCompleted ? <Icons.CheckCircle fill="#22c55e" color="white" /> : <Icons.CheckCircle />}
          </button>
          
          <button 
            className="btn-icon-glass primary" 
            onClick={onNext} 
            disabled={!hasNext}
            title="Siguiente"
            style={hasNext ? {background: 'var(--accent-soft)', color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)'} : {}}
          >
            <Icons.ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
