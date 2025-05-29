import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/leaderboardStyles.css';
import { LeaderboardEntry, LeaderboardResponse } from '../types/webSocketTypes';

interface TeamEntry {
  team: string;
  score: number;
  entries: number;
  last: string;
}

// 타입 명시된 leaderboard 데이터
// const leaderboardData: Record<number, TeamEntry[]> = {
//   1: [
//     { team: 'Team A', score: 1.0, entries: 1, last: '1 month ago' },
//     { team: 'Team B', score: 1.0, entries: 3, last: '1 month ago' },
//     { team: 'Team C', score: 1.0, entries: 5, last: '1 month ago' },
//     { team: 'Team D', score: 1.0, entries: 7, last: '1 month ago' },
//     { team: 'Team E', score: 1.0, entries: 10, last: '1 month ago' },
//     { team: 'Team F', score: 0.95, entries: 1, last: '1 month ago' },
//     { team: 'Team G', score: 0.95, entries: 3, last: '1 month ago' },
//     { team: 'Team H', score: 0.8, entries: 1, last: '1 month ago' },
//     { team: 'Team Z (You)', score: 0.61, entries: 20, last: '1 month ago' },
//   ],
// };

const LeaderboardDetail: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const taskKey = parseInt(taskId || '0');
  // const data = leaderboardData[taskKey] || [];

  const token = localStorage.getItem('token') || '';
  const myLoginId = localStorage.getItem('loginId') || '';

  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  // API 요청
  useEffect(() => {
    const fetchTaskLeaderboard = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/leaderboard?task=${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json: LeaderboardResponse = await res.json();
        if (json.status === 'success') {
          setEntries(json.data);
        }
      } catch (err) {
        console.error('상세 리더보드 로딩 실패:', err);
      }
    };

    fetchTaskLeaderboard();
  }, [taskId, token]);


  // 점수 기준 내림차순 정렬
  const sorted = [...entries].sort((a, b) => b.psnrAvg - a.psnrAvg);

  const myTeamName = 'Team Z (You)';
  const myTeamIndex = sorted.findIndex((e) => e.loginId === myLoginId);
  const myTeam = sorted[myTeamIndex];
  const myTeamRank = myTeamIndex + 1;

  // const others = sorted.filter(team => team.team !== myTeamName);
  // const finalList = myTeam ? [myTeam, ...others] : sorted;
  const finalList = myTeam ? [myTeam, ...sorted.filter(e => e.loginId !== myLoginId)] : sorted;
  

  

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
          {finalList.map((entry, index) => {
            const originalIndex = sorted.findIndex(e => e.loginId === entry.loginId);
            const isMe = entry.loginId === myLoginId;

            return (
              <tr
                key={`${entry.loginId}-${entry.task}`}
                style={{
                  backgroundColor: isMe ? '#fff8dc' : 'white',
                  fontWeight: isMe ? 'bold' : 'normal',
                }}
              >
                <td>{originalIndex + 1}</td>
                <td>{entry.loginId}</td>
                <td>{entry.psnrAvg.toFixed(2)}</td>
                <td>{entry.task}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardDetail;
