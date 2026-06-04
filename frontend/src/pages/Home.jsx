import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Code, Brain, Users, ArrowRight } from 'lucide-react';
import './Home.css';
import axios from 'axios';

const INTERVIEW_MODES = [
  { id: 'HR', title: 'HR & Culture Fit', icon: <Users size={32} />, color: '#ec4899', desc: 'Behavioral, teamwork, and culture questions.' },
  { id: 'Technical', title: 'Technical Screen', icon: <Code size={32} />, color: '#6366f1', desc: 'System design, APIs, and framework questions.' },
  { id: 'DSA', title: 'Data Structures', icon: <Brain size={32} />, color: '#10b981', desc: 'Algorithmic problem solving and optimization.' },
  { id: 'Behavioural', title: 'Behavioural', icon: <Briefcase size={32} />, color: '#f59e0b', desc: 'Past experiences and situational judgement.' }
];

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const startInterview = async (type) => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/sessions/`, { interview_type: type });
      navigate('/interview', { state: { session: res.data } });
    } catch (err) {
      console.error(err);
      alert('Backend is not running!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-wrapper animate-fade-in">
      <header className="home-hero text-center">
        <h1 className="hero-title">
          Ace Your Next <span className="text-gradient">Interview</span>
        </h1>
        <p className="hero-subtitle">Real-time AI Coach • Voice Analysis • Instant Feedback</p>
      </header>

      <section className="modes-section">
        <h2 className="section-title">Select Interview Mode</h2>
        <div className="modes-grid">
          {INTERVIEW_MODES.map(mode => (
            <div key={mode.id} className="mode-card glass-panel" onClick={() => startInterview(mode.id)}>
              <div className="icon-wrapper" style={{ background: `linear-gradient(135deg, ${mode.color}40, transparent)`, color: mode.color }}>
                {mode.icon}
              </div>
              <h3 className="mode-title">{mode.title}</h3>
              <p className="mode-desc">{mode.desc}</p>
              <div className="mode-footer">
                <span>Start Session</span>
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Preparing your AI Interviewer...</p>
        </div>
      )}
    </div>
  );
};

export default Home;
