import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/leaderboardStyles.css';
import { useWebSocket } from '../hooks/useWebSocket';
import { GradingResultData } from '../types/webSocketTypes';
import { LeaderboardEntry, LeaderboardResponse } from '../types/webSocketTypes';

interface Task {
  id: number;
  task: string;
  avgScore: string;
  entries: number;
  last: string;
}

const dummyTasks: Task[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  task: `Task ${i + 1}`,
  avgScore: (Math.random() * 1).toFixed(2),
  entries: Math.floor(Math.random() * 10 + 1),
  last: '1 month ago',
}));

const Leaderboard: React.FC = () => {
  const [tasks, setTasks] = useState<LeaderboardEntry[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tasksPerPage = 10;

  const indexOfLast = currentPage * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const token = localStorage.getItem('token') || 'guest';
  console.log('token:', token);

  // state 추가
const [currentTask, setCurrentTask] = useState<string>('mock'); // 기본값으로 'mock' 설정

  // 초기 API 요청
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // API 호출 부분
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/leaderboard/user?task=${currentTask}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }
        const json: LeaderboardResponse = await res.json();

        if (json.status === 'success') {
          setTasks(json.data);
        }
      } catch (err) {
        console.error('리더보드 데이터 로딩 실패:', err);
      }
    };
    fetchLeaderboard();
  }, [token]);

  // WebSocket 구독 처리
  useWebSocket({
    token,
    onGradingResult: (data: GradingResultData) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.task === data.task
            ? {
                ...task,
                psnrAvg: data.psnrAvg ?? 0,
              }
            : task
        )
      );
    },
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center' }}>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Avg. Score</th>
            <th>Entries</th>
            <th>Last</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((t, i) => (
            <tr key={`${t.loginId}-${t.task}`}>
              <td>{t.rank ?? indexOfFirst + i + 1}</td>
              <td>
                <Link to={`/leaderboard/${t.task}`}>{t.task}</Link>
              </td>
              <td>{t.psnrAvg.toFixed(2)}</td>
              <td>{Math.floor(Math.random() * 10 + 1)}</td> {/* 더미 entries */}
              <td>{new Date().toLocaleDateString()}</td> {/* 더미 last */}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            style={{ margin: '0 5px', padding: '0.5rem' }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
