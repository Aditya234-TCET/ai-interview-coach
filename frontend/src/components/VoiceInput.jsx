import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Send, Loader2, SkipForward } from 'lucide-react';

const VoiceInput = ({ onSubmitAnswer, onNextQuestion }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = 0; i < event.results.length; ++i) {
          finalTranscript += event.results[i][0].transcript;
        }
        setTranscript(finalTranscript);
      };
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setTranscript('');
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleSubmit = async () => {
    if (!transcript) return;
    if (isRecording) toggleRecording();
    setSubmitting(true);
    await onSubmitAnswer(transcript);
    setSubmitting(false);
    setTranscript('');
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div style={{ position: 'relative' }}>
          <textarea 
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your answer will appear here as you speak..."
            style={{ width: '100%', minHeight: '150px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem', color: 'white', fontFamily: 'inherit', fontSize: '1.05rem', resize: 'vertical' }}
          />
          {isRecording && (
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '4px' }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="waveform-bar" style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            onClick={toggleRecording} 
            className={`btn-primary ${isRecording ? 'animate-pulse-glow' : ''}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: isRecording ? '#ef4444' : 'var(--accent-gradient)' }}
          >
            {isRecording ? <><Square size={18} /> Stop Recording</> : <><Mic size={18} /> Start Speaking</>}
          </button>
          
          <button 
            onClick={handleSubmit} 
            disabled={!transcript || submitting}
            className="btn-glass"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: (!transcript || submitting) ? 0.5 : 1 }}
          >
            {submitting ? <Loader2 size={18} className="spin" /> : <Send size={18} />} 
            Submit Answer
          </button>

          {onNextQuestion && (
            <button 
              onClick={onNextQuestion}
              className="btn-glass"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(255, 255, 255, 0.2)' }}
            >
              <SkipForward size={18} /> Skip
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceInput;
