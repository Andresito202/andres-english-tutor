import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';

export default function QuizCard({ lessons, onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const currentLesson = lessons[currentQuestionIndex];

  useEffect(() => {
    if (!currentLesson) return;
    
    // Generate 3 options (1 correct, 2 random wrong)
    const wrongLessons = lessons.filter(l => l.id !== currentLesson.id);
    const shuffledWrong = wrongLessons.sort(() => 0.5 - Math.random()).slice(0, 2);
    
    const allOptions = [...shuffledWrong, currentLesson].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
    setSelectedOption(null);
    setIsCorrect(null);
  }, [currentLesson, lessons]);

  const handleSelect = (option) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(option);
    setIsCorrect(option.id === currentLesson.id);
  };

  const handleNext = () => {
    if (currentQuestionIndex < lessons.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  if (!currentLesson) return null;

  return (
    <div className="quiz-card avant-glass fade-in">
      <div className="quiz-header">
        <span className="quiz-badge">Práctica de Módulo</span>
        <h2>¿Cómo se dice en inglés?</h2>
        <h3 className="quiz-target-word">&quot;{currentLesson.spanish}&quot;</h3>
      </div>

      <div className="quiz-options">
        {options.map((opt, i) => {
          let btnClass = "quiz-option-btn";
          if (selectedOption) {
            if (opt.id === currentLesson.id) btnClass += " correct";
            else if (opt.id === selectedOption.id) btnClass += " incorrect";
          }

          return (
            <button 
              key={`${opt.id}-${i}`}
              className={btnClass}
              onClick={() => handleSelect(opt)}
              disabled={selectedOption !== null}
            >
              <span>{opt.english}</span>
              {selectedOption && opt.id === currentLesson.id && <Icons.CheckCircle size={22} strokeWidth={3} />}
              {selectedOption && opt.id === selectedOption.id && opt.id !== currentLesson.id && <Icons.XCircle size={22} strokeWidth={3} />}
            </button>
          );
        })}
      </div>

      {selectedOption !== null && (
        <div className={`quiz-feedback fade-in ${isCorrect ? 'success-bg' : 'error-bg'}`}>
          <p className={isCorrect ? "feedback-success" : "feedback-error"}>
            {isCorrect ? (
              <><Icons.PartyPopper size={20} /> ¡Excelente! Respuesta correcta.</>
            ) : (
              <><Icons.AlertCircle size={20} /> Incorrecto. La respuesta es: {currentLesson.english}</>
            )}
          </p>
          <button className="btn-avant mt-4" onClick={handleNext} style={{ minWidth: '200px' }}>
            {currentQuestionIndex < lessons.length - 1 ? "Siguiente Pregunta" : "Finalizar Módulo"}
            <Icons.ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
