import React from 'react';
import TaskCard from '../components/TaskCard';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

const dummyTasks: Task[] = [
  { id: 1, title: 'Task 1', description: 'short description for task', dueDate: '00d 00h 00m' },
  { id: 2, title: 'Task 2', description: 'short description for task', dueDate: '01d 03h 20m' },
  { id: 3, title: 'Task 3', description: 'short description for task', dueDate: '02d 08h 15m' },
  { id: 4, title: 'Task 4', description: 'short description for task', dueDate: '05d 00h 00m' },
];

const TaskPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem 1rem',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Tasks</h2>

        <div
          className="scroll-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxHeight: '500px',
            overflowY: 'scroll',
            overflowX: 'hidden',
            paddingRight: '0.5rem',
          }}
        >
          {dummyTasks.map((task) => (
            <div
              key = {task.id}
              onClick={() => navigate(`/tasks/${task.id}`)}
              style = {{ cursor: 'pointer', marginBottom: '1rem' }}
            >

            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              dueDate={task.dueDate}
            />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
