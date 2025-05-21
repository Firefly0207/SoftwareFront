import React from 'react';
import { useNavigate } from 'react-router-dom';

const Result: React.FC = () => {
  const navigate = useNavigate();

  const score: number = 0.9123;
  const rank: number = 3;
  const total: number = 25;

  return (
    <div>
      <div style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
        <h2>🎉 Submission Result</h2>
        <p style={{ fontSize: '1.25rem' }}>Score: <strong>{score}</strong></p>
        <p style={{ fontSize: '1.25rem' }}>Rank: <strong>{rank} / {total}</strong></p>

        <div style={{ marginTop: '2rem' }}>
          <button onClick={() => navigate(-1)} style={btnStyle}>Submit Again</button>
          <button
            onClick={() => navigate('/leaderboard')}
            style={{ ...btnStyle, marginLeft: '1rem' }}
          >
            Go to Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

const btnStyle: React.CSSProperties = {
  padding: '0.6rem 1.2rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Result;
