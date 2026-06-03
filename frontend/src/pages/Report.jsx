import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import ScoreDashboard from '../components/ScoreDashboard';
import { ArrowLeft } from 'lucide-react';

const Report = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results;

  if (!results) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2>No results found.</h2>
        <Link to="/" style={{ color: '#6366f1' }}>Go back Home</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('/')} 
        style={{ background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}
      >
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontFamily: 'Outfit' }}>
          Interview <span className="text-gradient">Report</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Review your performance and actionable feedback.</p>
      </header>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#f0f4f8' }}>Question Asked:</h3>
        <p style={{ fontSize: '1.2rem', color: '#e2e8f0', lineHeight: 1.5 }}>"{results.question}"</p>
        
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#f0f4f8' }}>Your Transcript:</h3>
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '8px', color: '#cbd5e1', lineHeight: 1.6, fontStyle: 'italic' }}>
          "{results.answer_transcript}"
        </div>
      </div>

      <ScoreDashboard results={results} />
      
      {location.state?.session && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
          <button 
            onClick={() => navigate('/interview', { state: { session: location.state.session } })}
            className="btn-primary"
            style={{ padding: '1rem 2.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-gradient)' }}
          >
            Next Question →
          </button>
        </div>
      )}
    </div>
  );
};

export default Report;
