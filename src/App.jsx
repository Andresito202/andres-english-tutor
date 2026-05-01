import { useState } from 'react';
import AIChat from './components/Chat/AIChat';
import LearningLayout from './components/Learning/LearningLayout';
import * as Icons from 'lucide-react';
import './styles/design-system.css';

function App() {
  const [isConfigured] = useState(!!import.meta.env.VITE_GEMINI_API_KEY);
  const [activeView, setActiveView] = useState('chat'); // 'chat' | 'learning'

  if (!isConfigured) {
    return (
      <div className="app-container">
        <div className="aura-bg">
          <div className="aura-orb orb-1"></div>
          <div className="aura-orb orb-2"></div>
        </div>
        <div className="avant-glass" style={{ zIndex: 10, padding: '4rem', maxWidth: '600px', textAlign: 'center', border: '1px solid rgba(255,0,127,0.3)' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-1px' }}>System Offline</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', marginBottom: '2rem' }}>
            A neural link requires a valid API Key. Inject your Gemini Key into the <code style={{ color: 'var(--aura-1)' }}>.env</code> file to awaken the tutor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      {/* Tab Switcher Navigation */}
      <nav className="global-nav avant-glass">
        <div className="nav-brand">
          <Icons.ShieldCheck className="brand-icon" />
          <span>Andres</span>
        </div>
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeView === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveView('chat')}
          >
            <Icons.MessageSquare size={18} />
            Chat con IA
          </button>
          <button 
            className={`nav-tab ${activeView === 'learning' ? 'active' : ''}`}
            onClick={() => setActiveView('learning')}
          >
            <Icons.Library size={18} />
            Módulos
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <div className="app-container">
        {activeView === 'chat' ? <AIChat /> : <LearningLayout />}
      </div>
    </div>
  );
}

export default App;
