import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Task {
  id: string | undefined;
  title: string;
  description: string;
  dueDate: string;
}

const TaskDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();

  // 실제에선 taskId로 API에서 데이터를 받아올 예정
  const task: Task = {
    id: taskId,
    title: `Task ${taskId}`,
    description: 'This Task is sample Task.',
    dueDate: '2025/06/01 18:00',
  };

  const handleStart = () => {
    navigate(`/tasks/${taskId}/submit`);
  };

  return (
    <div>
      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1
            }}
            aria-label="Go back"
          >
            ←
          </button>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{task.title}</h2>
        </div>
        <p style={{ color: '#888' }}>Due: {task.dueDate}</p>
        <p>{task.description}</p>

        <button onClick={handleStart} style={{ marginTop: '1.5rem' }}>
          Start Task
        </button>
      </div>
    </div>
  );
};

export default TaskDetailPage;
