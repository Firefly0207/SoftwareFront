import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/leaderboardStyles.css';

interface TeamEntry {
  team: string;
  score: number;
  entries: number;
  last: string;
}

// 타입 명시된 leaderboard 데이터
const leaderboardData: Record<number, TeamEntry[]> = {
  1: [
    { team: 'Team A', score: 1.0, entries: 1, last: '1 month ago' },
    { team: 'Team B', score: 1.0, entries: 3, last: '1 month ago' },
    { team: 'Team C', score: 1.0, entries: 5, last: '1 month ago' },
    { team: 'Team D', score: 1.0, entries: 7, last: '1 month ago' },
    { team: 'Team E', score: 1.0, entries: 10, last: '1 month ago' },
    { team: 'Team F', score: 0.95, entries: 1, last: '1 month ago' },
    { team: 'Team G', score: 0.95, entries: 3, last: '1 month ago' },
    { team: 'Team H', score: 0.8, entries: 1, last: '1 month ago' },
    { team: 'Team Z (You)', score: 0.61, entries: 20, last: '1 month ago' },
  ],
};

const LeaderboardDetail: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const taskKey = parseInt(taskId || '0');
  const data = leaderboardData[taskKey] || [];

  // 점수 기준 내림차순 정렬
  const sorted = [...data].sort((a, b) => b.score - a.score);

  const myTeamName = 'Team Z (You)';
  const myTeamIndex = sorted.findIndex(team => team.team === myTeamName);
  const myTeam = sorted[myTeamIndex];
  const myTeamRank = myTeamIndex + 1;

  const others = sorted.filter(team => team.team !== myTeamName);
  const finalList = myTeam ? [myTeam, ...others] : sorted;

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate('/leaderboard')} style={{ marginBottom: '1rem' }}>
        &lt; Return to Leaderboard
      </button>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Leaderboard for Task {taskId}
      </h2>

      <table className="leaderboard-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>#</th>
            <th>Team</th>
            <th>Score</th>
            <th>Entries</th>
            <th>Last</th>
          </tr>
        </thead>
        <tbody>
          {finalList.map((team, index) => {
            const originalIndex = sorted.findIndex(t => t.team === team.team);
            const isMyTeam = team.team === myTeamName;

            return (
              <tr
                key={index}
                style={{
                  backgroundColor: isMyTeam ? '#fff8dc' : 'white',
                  fontWeight: isMyTeam ? 'bold' : 'normal',
                }}
              >
                <td>{originalIndex + 1}</td>
                <td>{team.team}</td>
                <td>{team.score}</td>
                <td>{team.entries}</td>
                <td>{team.last}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardDetail;
