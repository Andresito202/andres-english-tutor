import { learningModules } from '../../data/learningModules';
import ModuleCard from './ModuleCard';
import * as Icons from 'lucide-react';

export default function LevelList({ progress, onSelectModule }) {
  const getLevelIcon = (id) => {
    switch(id) {
      case 'beginner': return <Icons.Zap size={20} />;
      case 'basic': return <Icons.Trophy size={20} />;
      case 'intermediate': return <Icons.Globe size={20} />;
      case 'advanced': return <Icons.Star size={20} />;
      default: return <Icons.BookOpen size={20} />;
    }
  };

  return (
    <div className="levels-container">
      {learningModules.map((level) => (
        <div key={level.levelId} className="level-section">
          <div className="level-header">
            <div className="level-title-group">
              <span className="level-badge">{level.levelId}</span>
              <h2>
                {getLevelIcon(level.levelId)}
                {level.levelTitle}
              </h2>
              <p className="level-description">{level.description}</p>
            </div>
          </div>
          
          <div className="modules-grid">
            {level.modules && level.modules.length > 0 ? (
              level.modules.map((mod) => (
                <ModuleCard 
                   key={mod.moduleId} 
                   module={mod} 
                   isCompleted={progress.completedModules.includes(mod.moduleId)}
                   completedLessons={progress.completedLessons}
                   onClick={() => onSelectModule(mod)} 
                />
              ))
            ) : (
              <div className="coming-soon-card">
                <span className="coming-soon-badge">Próximamente</span>
                <h4>Contenido en desarrollo</h4>
                <p>Nuevos módulos de nivel {level.levelTitle.toLowerCase()} estarán disponibles pronto.</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
