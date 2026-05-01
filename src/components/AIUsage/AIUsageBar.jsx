import * as Icons from 'lucide-react';

export default function AIUsageBar({ usage }) {
  if (!usage) return null;

  const {
    monthlyUsed = 0,
    monthlyLimit = 0,
    percentageUsed = 0,
    isAiEnabled = true,
    isLimitReached = false,
    resetDate,
  } = usage;

  const getStatusColor = () => {
    if (!isAiEnabled || isLimitReached) return 'var(--error)';
    if (percentageUsed > 95) return '#f97316';
    if (percentageUsed > 80) return 'var(--warning)';
    return 'var(--accent-primary)';
  };

  const statusColor = getStatusColor();

  return (
    <div className="ai-usage-bar-container avant-glass">
      <div className="usage-info">
        <div className="usage-title">
          <Icons.Zap
            size={14}
            color={statusColor}
            fill={!isAiEnabled || isLimitReached ? 'var(--error)' : 'none'}
          />
          <span>Uso de IA este mes</span>
        </div>
        <div className="usage-numbers">
          <strong>{monthlyUsed.toLocaleString()}</strong> / {monthlyLimit.toLocaleString()} tokens
        </div>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${Math.min(100, percentageUsed)}%`,
            backgroundColor: statusColor,
            boxShadow: `0 0 10px ${statusColor}44`,
          }}
        />
      </div>

      <div className="usage-footer">
        <span className="percentage">{percentageUsed}% usado</span>
        <span className="reset-date">{resetDate ? `Reinicia el ${resetDate}` : 'Reinicio mensual'}</span>
      </div>

      {(!isAiEnabled || isLimitReached) && (
        <div className="limit-alert">
          <Icons.AlertTriangle size={14} />
          <span>{isAiEnabled ? 'Limite alcanzado. Practica con IA pausada.' : 'IA pausada temporalmente.'}</span>
        </div>
      )}
    </div>
  );
}
