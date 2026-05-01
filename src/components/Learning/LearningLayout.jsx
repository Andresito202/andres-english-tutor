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
              <h1>Ruta de Aprendizaje con Andres</h1>
              <p>Domina el inglés paso a paso con lecciones guiadas por tu tutor de IA.</p>
            </div>
            
            <div className="learning-stats">
              <div className="stat-item">
                <span className="stat-value">
                  {learningModules.reduce((acc, lvl) => acc + (lvl.modules?.length || 0), 0)}
                </span>
                <span className="stat-label">Módulos</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{progress.completedModules.length}</span>
                <span className="stat-label">Completados</span>
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
              Volver a Módulos
            </button>
          </div>

          <div className="module-header-card avant-glass">
            <div className="module-header-content">
              <div className="module-badge">Curso de Inglés</div>
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
                    <span>Tip: Escucha la pronunciación varias veces y repite en voz alta.</span>
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
                <h2 className="summary-title">¡Módulo Completado!</h2>
                <p className="summary-desc">
                  ¡Excelente trabajo! Has dominado el contenido de <strong>{activeModule.title}</strong>.
                </p>
                <div className="summary-actions">
                  <button className="btn-avant" onClick={goBackToLevels}>
                    Ir al siguiente nivel
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
