import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuestionCard from '../components/QuestionCard';
import VoiceInput from '../components/VoiceInput';

const Interview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const session = location.state?.session;
  
  const [question, setQuestion] = useState('');
  
  const fetchQuestion = () => {
    if (!session) return;
    setQuestion('Generating next question...');
    axios.get(`http://localhost:8000/api/sessions/${session.id}/question`)
      .then(res => setQuestion(res.data.question))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (!session) {
      navigate('/');
      return;
    }
    fetchQuestion();
  }, [session, navigate]);

  const handleAnswerSubmit = async (transcript) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/sessions/${session.id}/answer?question=${encodeURIComponent(question)}&answer=${encodeURIComponent(transcript)}`);
      navigate(`/report/${session.id}`, { state: { results: res.data, session: session } });
    } catch (err) {
      console.error(err);
      alert("Failed to submit answer.");
    }
  };

  if (!session) return null;

  return (
    <div className="animate-fade-in" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Active Interview</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Mode: {session.interview_type}</p>
      </header>
      
      <QuestionCard question={question} />
      
      <VoiceInput onSubmitAnswer={handleAnswerSubmit} onNextQuestion={fetchQuestion} />
    </div>
  );
};

export default Interview;
