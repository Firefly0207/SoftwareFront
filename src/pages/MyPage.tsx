import React from 'react';

interface Submission {
  task: string;
  score: number;
  rank: number;
  entries: number;
  last: string;
}

interface User {
  team: string;
  totalSubmissions: number;
  averageScore: number;
  bestRank: number;
}

const MyPage: React.FC = () => {
  const user: User = {
    team: 'Team Z',
    totalSubmissions: 12,
    averageScore: 0.8432,
    bestRank: 2,
  };

  const submissionHistory: Submission[] = [
    { task: 'Task 1', score: 0.9123, rank: 3, entries: 5, last: '3 days ago' },
    { task: 'Task 2', score: 0.8231, rank: 5, entries: 2, last: '1 week ago' },
    { task: 'Task 3', score: 0.7555, rank: 9, entries: 1, last: '2 weeks ago' },
    // ... 필요시 추가
  ];

  return (
    <div>
      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
        <h2 style={{ textAlign: 'center' }}>My Page</h2>

        <div
          style={{
            backgroundColor: '#f9f9f9',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem',
          }}
        >
          <p><strong>Team:</strong> {user.team}</p>
          <p><strong>Total Submissions:</strong> {user.totalSubmissions}</p>
          <p><strong>Average Score:</strong> {user.averageScore.toFixed(4)}</p>
          <p><strong>Best Rank:</strong> {user.bestRank}</p>
        </div>

        <h3>Submission History</h3>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Score</th>
              <th>Rank</th>
              <th>Entries</th>
              <th>Last Submission</th>
            </tr>
          </thead>
          <tbody>
            {submissionHistory.map((row, index) => (
              <tr key={index}>
                <td>{row.task}</td>
                <td>{row.score}</td>
                <td>{row.rank}</td>
                <td>{row.entries}</td>
                <td>{row.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPage;
