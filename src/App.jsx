import { useState } from 'react';
import AIChat from './components/Chat/AIChat';
import LearningLayout from './components/Learning/LearningLayout';
import * as Icons from 'lucide-react';
import './styles/design-system.css';

function App() {
  const useDirectGemini = import.meta.env.VITE_USE_DIRECT_GEMINI === 'true';
  const hasDirectGeminiConfig = Boolean(import.meta.env.VITE_GEMINI_API_KEY);
  const hasEdgeFunctionConfig = Boolean(
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  const isConfigured = useDirectGemini ? hasDirectGeminiConfig : hasEdgeFunctionConfig;
  const missingConfigMessage = useDirectGemini
    ? 'Define VITE_GEMINI_API_KEY in the local environment to use direct Gemini mode.'
    : 'Define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY so the app can call the Supabase Edge Functions.';
  const [activeView, setActiveView] = useState('chat');

  if (!isConfigured) {
    return (
      <div className="app-container">
        <div className="aura-bg">
          <div className="aura-orb orb-1"></div>
          <div className="aura-orb orb-2"></div>
        </div>
        <div className="avant-glass" style={{ zIndex: 10, padding: '4rem', maxWidth: '600px', textAlign: 'center', border: '1px solid rgba(255,0,127,0.3)' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-1px' }}>Configuration Required</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', marginBottom: '2rem' }}>
            {missingConfigMessage}
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
            Modulos
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
