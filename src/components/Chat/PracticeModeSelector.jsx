import * as Icons from 'lucide-react';

const MODES = [
  { id: 'pronunciation', label: 'Pronunciation', icon: Icons.Mic2, color: '#3b82f6' },
  { id: 'daily_conversation', label: 'Daily Conversation', icon: Icons.MessageCircle, color: '#10b981' },
  { id: 'vocabulary', label: 'Vocabulary', icon: Icons.BookOpen, color: '#f59e0b' },
  { id: 'interview_practice', label: 'Interview Practice', icon: Icons.Briefcase, color: '#8b5cf6' },
  { id: 'repeat_after_me', label: 'Repeat', icon: Icons.RotateCw, color: '#ec4899' },
];

export default function PracticeModeSelector({ currentMode, onModeChange }) {
  return (
    <div className="practice-mode-selector">
      {MODES.map((mode) => {
        const Icon = mode.icon;
        const isActive = currentMode === mode.id;

        return (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`mode-pill ${isActive ? 'active' : ''}`}
            style={{
              '--mode-color': mode.color,
            }}
            title={mode.label}
          >
            <Icon size={16} />
            <span>{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
}
