import React from 'react';
import { useNavigate } from 'react-router-dom';

const Result: React.FC = () => {
  const navigate = useNavigate();

  const score: number = 0.9123;
  const rank: number = 3;
  const total: number = 25;

  const dummyPercentages = [0.21, 0.45, 0.65, 0.82, score]; 
  const sorted = [...dummyPercentages].sort((a, b) => a - b);

  return (
    <div
      style={{
          display: 'flex',             
          justifyContent: 'center',
          alignItems: 'center',
        }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem 1rem',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '1.5rem' }}>Result</h2>
        <div style={{ margin: '2rem 0' }}>
          <h3 style={{ marginBottom: '3rem' }}>Percentage chart</h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              gap: '1rem',
              height: '150px',
              marginBottom: '3rem',
            }}
          >
            {sorted.map((val, idx) => (
              <div
                key={idx}
                style={{
                  width: '20px',
                  height: `${val * 100}%`,
                  backgroundColor: val === score ? '#4CAF50' : '#ccc',
                  transition: 'height 0.3s',
                }}
                title={`${(val * 100).toFixed(2)}%`}
              />
            ))}
          </div>
        </div>

        <p style={{ fontSize: '1.25rem' }}>Score: <strong>{score}</strong></p>
        <p style={{ fontSize: '1.25rem' }}>Rank: <strong>{rank} / {total}</strong></p>

        <div style={{ marginTop: '2.5rem' }}>
          <button 
            onClick={()=>navigate(`/leaderboard`)}
            style={{ ...btnStyle }}>
            Register on Leaderboard
          </button>
          <button
            onClick={() => navigate(-1)}
            style={{ ...btnStyle, marginTop: '0.6rem' }}
          >
            Return to Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const btnStyle: React.CSSProperties = {
  width: '211px',
  height: '41px',
  padding: '0.6rem 1.2rem',
  backgroundColor: 'black',
  color: 'white',
  border: 'none',
  borderRadius: '0.6rem',
  cursor: 'pointer',
  fontSize: '14px',
  display: 'flex',    
  lineHeight: '1',                
  fontWeight: 500,
  justifyContent: 'center',
  alignItems: 'center',                
};


export default Result;
