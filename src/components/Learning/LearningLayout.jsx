import { useState } from 'react';
import { useLearningProgress } from '../../hooks/useLearningProgress';
import LevelList from './LevelList';
import LessonCard from './LessonCard';
import QuizCard from './QuizCard';
import ProgressBar from './ProgressBar';
import { learningModules } from '../../data/learningModules';
import * as Icons from 'lucide-react';

export default function LearningLayout() {
  const { progress, markModuleCompleted, markLessonCompleted, isLessonCompleted } = useLearningProgress();
  
  const [currentView, setCurrentView] = useState('levels'); // 'levels', 'lesson', 'quiz', 'summary'
  const [activeModule, setActiveModule] = useState(null);
  const [lessonIndex, setLessonIndex] = useState(0);

  const handleSelectModule = (mod) => {
    setActiveModule(mod);
    setLessonIndex(0);
    setCurrentView('lesson');
  };

  const handleNextLesson = () => {
    if (lessonIndex < activeModule.lessons.length - 1) {
      setLessonIndex(prev => prev + 1);
    } else {
      setCurrentView('quiz');
    }
  };

  const handlePrevLesson = () => {
    if (lessonIndex > 0) {
      setLessonIndex(prev => prev - 1);
    }
  };

  const handleQuizComplete = () => {
    markModuleCompleted(activeModule.moduleId);
    setCurrentView('summary');
  };

  const goBackToLevels = () => {
    setActiveModule(null);
    setCurrentView('levels');
  };

  return (
    <div className="learning-layout">
      {currentView === 'levels' ? (
        <div className="learning-page fade-in">
          {/* Professional Header Box */}
          <div className="learning-header-box">
            <div className="learning-header-text">
              <span className="workspace-kicker">English performance workspace</span>
              <h1>Comunicación para contextos profesionales</h1>
              <p>Entrena reuniones, entrevistas, negociación, presentaciones y conversaciones de trabajo con práctica medible.</p>
            </div>
            
            <div className="learning-stats">
              <div className="stat-item">
                <span className="stat-value">
                  {learningModules.reduce((acc, lvl) => acc + (lvl.modules?.length || 0), 0)}
                </span>
                <span className="stat-label">Rutas activas</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{progress.completedModules.length}</span>
                <span className="stat-label">Dominadas</span>
              </div>
            </div>
          </div>

          <div className="learning-body">
            <LevelList progress={progress} onSelectModule={handleSelectModule} />
          </div>
        </div>
      ) : (
        <div className="internal-module-layout fade-in">
          <div className="internal-top-nav">
            <button className="btn-back-elegant" onClick={goBackToLevels}>
              <Icons.ArrowLeft size={18} strokeWidth={3} />
              Volver al workspace
            </button>
          </div>

          <div className="module-header-card avant-glass">
            <div className="module-header-content">
              <div className="module-badge">Entrenamiento aplicado</div>
              <h2 className="module-title">{activeModule?.title}</h2>
              <p className="module-desc">{activeModule?.description}</p>
            </div>
            <div className="module-header-status">
               <span className="lesson-count-tag">
                 <Icons.BookOpen size={16} />
                 Lección {currentView === 'lesson' ? lessonIndex + 1 : activeModule.lessons.length} de {activeModule.lessons.length}
               </span>
            </div>
          </div>

          <div className="internal-body">
            {currentView === 'lesson' && activeModule && (
              <div className="lesson-view-container fade-in">
                <div className="internal-progress-box">
                  <ProgressBar current={lessonIndex + 1} total={activeModule.lessons.length} />
                </div>

                <div className="mt-8">
                  <LessonCard 
                    lesson={activeModule.lessons[lessonIndex]}
                    onNext={handleNextLesson}
                    onPrev={handlePrevLesson}
                    hasNext={true} 
                    hasPrev={lessonIndex > 0}
                    isCompleted={isLessonCompleted(`${activeModule.moduleId}-${activeModule.lessons[lessonIndex].id}`)}
                    onMarkCompleted={() => markLessonCompleted(`${activeModule.moduleId}-${activeModule.lessons[lessonIndex].id}`)}
                  />
                </div>
                
                <div className="lesson-footer-tip">
                  <div className="tip-box">
                    <Icons.Lightbulb size={18} className="tip-icon" />
                    <span>Práctica recomendada: escucha, repite y úsalo en una situación profesional concreta.</span>
                  </div>
                </div>
              </div>
            )}

            {currentView === 'quiz' && activeModule && (
              <div className="quiz-container fade-in">
                <QuizCard 
                  lessons={activeModule.lessons} 
                  onComplete={handleQuizComplete} 
                />
              </div>
            )}

            {currentView === 'summary' && activeModule && (
              <div className="summary-container-v2 avant-glass fade-in">
                <div className="award-visual">
                  <Icons.Trophy size={64} strokeWidth={1.5} />
                </div>
                <h2 className="summary-title">Competencia completada</h2>
                <p className="summary-desc">
                  Registraste el recorrido completo de <strong>{activeModule.title}</strong>. Puedes repetirlo para mejorar precisión y fluidez.
                </p>
                <div className="summary-actions">
                  <button className="btn-avant" onClick={goBackToLevels}>
                    Elegir otra competencia
                    <Icons.ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
