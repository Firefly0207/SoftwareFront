import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/leaderboardStyles.css';

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tasksPerPage = 10;

  const indexOfLast = currentPage * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentTasks = dummyTasks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(dummyTasks.length / tasksPerPage);

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
          {currentTasks.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td><Link to={`/leaderboard/${t.id}`}>{t.task}</Link></td>
              <td>{t.avgScore}</td>
              <td>{t.entries}</td>
              <td>{t.last}</td>
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
