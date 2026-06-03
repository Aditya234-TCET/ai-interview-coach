import React, { useState, useEffect, useRef } from 'react';
import { Lightbulb, Clock, Shield, Volume2, VolumeX, Loader2 } from 'lucide-react';

const QuestionCard = ({ question, difficulty = "Medium" }) => {
  const [hintOpen, setHintOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const utteranceRef = useRef(null);

  // Timer resets on each new question
  useEffect(() => {
    setTime(0);
    const timer = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, [question]);

  // Auto-speak when question loads
  useEffect(() => {
    if (!question || question === 'Generating next question...') return;

    const speak = () => {
      window.speechSynthesis.cancel(); // stop any existing speech

      const utterance = new SpeechSynthesisUtterance(question);

      // Pick a natural-sounding voice
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v =>
        v.name.includes('Google UK English Female') ||
        v.name.includes('Google US English') ||
        v.name.includes('Samantha') ||
        v.lang === 'en-US'
      );
      if (preferred) utterance.voice = preferred;
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setVoiceReady(true);
    };

    // Voices may not be loaded yet
    if (window.speechSynthesis.getVoices().length > 0) {
      speak();
    } else {
      window.speechSynthesis.onvoiceschanged = speak;
    }

    return () => window.speechSynthesis.cancel();
  }, [question]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(question);
        const voices = window.speechSynthesis.getVoices();
        const preferred = voices.find(v =>
          v.name.includes('Google UK English Female') ||
          v.name.includes('Google US English') ||
          v.name.includes('Samantha') ||
          v.lang === 'en-US'
        );
        if (preferred) utterance.voice = preferred;
        utterance.rate = 0.92;
        utterance.pitch = 1.05;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span className="badge" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(236, 72, 153, 0.2)', color: '#ec4899', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600 }}>
            <Shield size={14} /> {difficulty}
          </span>
          <span className="badge" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem' }}>
            <Clock size={14} /> {formatTime(time)}
          </span>

          {/* AI Voice button */}
          <button
            onClick={handleToggleSpeak}
            title={isSpeaking ? 'Stop AI Voice' : 'Replay Question'}
            style={{
              background: isSpeaking
                ? 'rgba(99, 102, 241, 0.25)'
                : 'rgba(255,255,255,0.08)',
              border: `1px solid ${isSpeaking ? '#6366f1' : 'rgba(255,255,255,0.15)'}`,
              color: isSpeaking ? '#818cf8' : '#a0aec0',
              borderRadius: '999px',
              padding: '0.25rem 0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              fontFamily: 'Outfit',
              transition: 'all 0.2s ease',
            }}
          >
            {isSpeaking ? (
              <>
                <VolumeX size={14} />
                <span style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                  {[...Array(3)].map((_, i) => (
                    <span key={i} style={{
                      display: 'inline-block', width: '3px', background: '#818cf8', borderRadius: '2px',
                      height: `${8 + i * 4}px`,
                      animation: 'soundwave 0.6s ease-in-out infinite alternate',
                      animationDelay: `${i * 0.15}s`,
                    }} />
                  ))}
                </span>
                Stop
              </>
            ) : (
              <><Volume2 size={14} /> Replay</>
            )}
          </button>
        </div>

        <button onClick={() => setHintOpen(!hintOpen)} style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Outfit' }}>
          <Lightbulb size={18} /> {hintOpen ? 'Hide Hint' : 'Get Hint'}
        </button>
      </div>

      {/* AI speaking indicator */}
      {isSpeaking && (
        <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', color: '#818cf8', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', gap: '3px' }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="waveform-bar" style={{ animationDelay: `${i * 0.1}s`, background: '#818cf8' }} />
            ))}
          </div>
          AI Interviewer is speaking...
        </div>
      )}

      <h2 style={{ fontSize: '1.75rem', lineHeight: 1.4, marginBottom: '1rem' }}>{question || "Loading question..."}</h2>
      
      {hintOpen && (
        <div className="animate-fade-in" style={{ background: 'rgba(99, 102, 241, 0.1)', borderLeft: '4px solid #6366f1', padding: '1rem', borderRadius: '0 8px 8px 0', marginTop: '1rem', color: '#a0aec0', fontSize: '0.95rem' }}>
          <strong>Hint:</strong> Break down the problem logically and consider your past experiences where you demonstrated this skill.
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
