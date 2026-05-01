import * as Icons from 'lucide-react';

export default function ModuleCard({ module, isCompleted, onClick, completedLessons = [] }) {
  const IconComponent = Icons[module.visualKey] ? Icons[module.visualKey] : Icons.BookOpen;
  
  // Calculate progress percentage
  const totalLessons = module.lessons?.length || 0;
  const finishedLessons = module.lessons?.filter(l => 
    completedLessons.includes(`${module.moduleId}-${l.id}`)
  ).length || 0;
  
  const percentage = totalLessons > 0 ? Math.round((finishedLessons / totalLessons) * 100) : 0;

  return (
    <div className={`module-card ${isCompleted ? 'completed' : ''}`} onClick={onClick}>
      <div className="module-card-top">
        <div className="module-card-icon">
          <IconComponent size={24} strokeWidth={2} />
        </div>
        <div className="module-card-info">
          <h3>{module.title}</h3>
          {isCompleted && <span className="level-badge" style={{ background: '#22c55e', color: 'white' }}>Completado</span>}
        </div>
      </div>
      
      <p className="module-card-description">{module.description}</p>
      
      {/* Mini Progress Bar */}
      <div className="module-mini-progress" style={{ marginTop: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '4px', fontWeight: 700, color: 'var(--text-muted)' }}>
          <span>Progreso</span>
          <span>{isCompleted ? '100%' : `${percentage}%`}</span>
        </div>
        <div style={{ width: '100%', height: '6px', background: 'var(--accent-soft)', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ width: isCompleted ? '100%' : `${percentage}%`, height: '100%', background: isCompleted ? '#22c55e' : 'var(--accent-primary)', transition: 'width 0.3s ease' }}></div>
        </div>
      </div>
      
      <div className="module-card-footer">
        <div className="lesson-tag">
          <Icons.Layers size={14} />
          {totalLessons} lecciones
        </div>
        
        <button className="module-action">
          {isCompleted ? 'Repasar' : finishedLessons > 0 ? 'Continuar' : 'Iniciar'}
          <Icons.ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
