// src/pages/TaskSubmitPage.jsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function TaskSubmitPage() {
  const { taskId } = useParams();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const task = {
    id: taskId,
    title: `Task ${taskId}`,
    description: '이 Task는 제출한 zip 파일을 AI가 자동으로 평가합니다.',
    dueDate: '2025/06/01 18:00',
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!file) {
      alert('파일을 선택해주세요!');
      return;
    }

    // 실제 제출 API 연동 예정
    alert(`"${file.name}" 파일을 Task ${task.id}에 제출했습니다.`);
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

        <div style={{ marginTop: '2rem' }}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <br />
          <button onClick={handleSubmit} style={{ marginTop: '1rem', padding: '0.5rem 1.5rem' }}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskSubmitPage;
