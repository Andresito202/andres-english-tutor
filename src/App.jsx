import { useState } from 'react';
import AIChat from './components/Chat/AIChat';
import LearningLayout from './components/Learning/LearningLayout';
import * as Icons from 'lucide-react';
import './styles/design-system.css';

function AIConfigurationNotice({ missingConfigMessage }) {
  return (
    <div className="chat-shell avant-glass" style={{ minHeight: '520px', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '620px', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', margin: '0 auto 1.5rem', borderRadius: '24px', display: 'grid', placeItems: 'center', background: 'rgba(96, 165, 250, 0.14)', color: 'var(--accent-primary)' }}>
          <Icons.LockKeyhole size={30} />
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-1px' }}>
          Asistente de conversación no disponible
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Las rutas profesionales, prácticas de pronunciación y evaluaciones siguen operativas. El asistente se habilita al conectar el servicio seguro de IA.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
          {missingConfigMessage}
        </p>
      </div>
    </div>
  );
}

function App() {
  const useDirectGemini = import.meta.env.VITE_USE_DIRECT_GEMINI === 'true';
  const hasDirectGeminiConfig = Boolean(import.meta.env.VITE_GEMINI_API_KEY);
  const hasEdgeFunctionConfig = Boolean(
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  const isAiConfigured = useDirectGemini ? hasDirectGeminiConfig : hasEdgeFunctionConfig;
  const missingConfigMessage = useDirectGemini
    ? 'Define VITE_GEMINI_API_KEY in the local environment to use direct Gemini mode.'
    : 'Define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY so the app can call the Supabase Edge Functions.';
  const [activeView, setActiveView] = useState(() => (isAiConfigured ? 'chat' : 'learning'));

  return (
    <div className="app-wrapper">
      {/* Tab Switcher Navigation */}
      <nav className="global-nav avant-glass">
        <div className="nav-brand">
          <span className="brand-monogram">AE</span>
          <span className="brand-copy">
            <strong>Andres English</strong>
            <small>Business communication workspace</small>
          </span>
        </div>
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeView === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveView('chat')}
          >
            <Icons.MessageSquare size={18} />
            Asistente de práctica
          </button>
          <button 
            className={`nav-tab ${activeView === 'learning' ? 'active' : ''}`}
            onClick={() => setActiveView('learning')}
          >
            <Icons.Library size={18} />
            Rutas profesionales
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <div className="app-container">
        {activeView === 'chat' && isAiConfigured && <AIChat />}
        {activeView === 'chat' && !isAiConfigured && (
          <AIConfigurationNotice missingConfigMessage={missingConfigMessage} />
        )}
        {activeView === 'learning' && <LearningLayout />}
      </div>
    </div>
  );
}

export default App;
