
export default function ProgressBar({ current, total }) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  
  return (
    <div className="progress-container" style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-dark)' }}>Progreso de la lección</span>
        <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{percentage}%</span>
      </div>
      <div className="progress-bar-bg" style={{ width: '100%', height: '12px', background: 'var(--accent-soft)', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(37, 99, 235, 0.1)' }}>
        <div className="progress-bar-fill" style={{ width: `${percentage}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)', borderRadius: '20px' }}></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
        <span className="progress-text" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>
          Paso {current} de {total}
        </span>
      </div>
    </div>
  );
}
