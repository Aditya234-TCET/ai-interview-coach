import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const ScoreDashboard = ({ results }) => {
  if (!results) return null;

  const data = [
    { subject: 'Grammar', A: results.grammar_score, fullMark: 100 },
    { subject: 'Confidence', A: results.confidence_score, fullMark: 100 },
    { subject: 'Relevance', A: results.relevance_score, fullMark: 100 },
  ];

  return (
    <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Analysis Report</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="rgba(255,255,255,0.2)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#a0aec0' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Score" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ color: '#a0aec0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Grammar Score</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: results.grammar_score > 80 ? '#10b981' : '#f59e0b' }}>
              {results.grammar_score.toFixed(0)}/100
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ color: '#a0aec0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Confidence (Filler Words)</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: results.confidence_score > 80 ? '#10b981' : '#f59e0b' }}>
              {results.confidence_score.toFixed(0)}/100
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ color: '#a0aec0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Relevance</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: results.relevance_score > 80 ? '#10b981' : '#f59e0b' }}>
              {results.relevance_score.toFixed(0)}/100
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', borderLeft: '4px solid #6366f1' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#f0f4f8' }}>
          <CheckCircle size={18} color="#10b981" /> AI Feedback
        </h4>
        <p style={{ color: '#a0aec0', lineHeight: 1.6 }}>Your response was analyzed successfully. Work on reducing filler words like "um" and "uh" to improve confidence score. Your relevance to the question was good!</p>
      </div>
    </div>
  );
};

export default ScoreDashboard;
