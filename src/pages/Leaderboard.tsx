/// <reference types="vite/client" />

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/leaderboardStyles.css';

interface Task {
  task: string;
}

const Leaderboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/leaderboard/task`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const json = await res.json();
        if (json.status === 'success') {
          setTasks(json.data);
        } else {
          setError(json.message || '태스크 목록을 불러오지 못했습니다.');
        }
      } catch (err: any) {
        setError('네트워크 오류 또는 서버 오류');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [token]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Task 목록</h2>
      {loading && <p>불러오는 중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        {tasks.map((t) => (
          <button
          key={t.task}
          style={{
            padding: '0.85rem 1.7rem',
            fontSize: '1rem',
            borderRadius: '6px',
            background: '#fafbfc',
            border: '1px solid #cfd8dc',
            color: '#222',
            cursor: 'pointer',
            marginBottom: '0.5rem',
            marginRight: '0.5rem',
            transition: 'background 0.15s, border 0.15s',
            boxShadow: '0 1px 2px rgba(60,60,60,0.03)'
          }}
          onMouseOver={e => {
            (e.currentTarget as HTMLButtonElement).style.background = '#f1f3f4';
            (e.currentTarget as HTMLButtonElement).style.border = '1px solid #b0bec5';
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLButtonElement).style.background = '#fafbfc';
            (e.currentTarget as HTMLButtonElement).style.border = '1px solid #cfd8dc';
          }}
          onClick={() => navigate(`/leaderboard/${t.task}`)}
        >
          {t.task}
        </button>
        
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
