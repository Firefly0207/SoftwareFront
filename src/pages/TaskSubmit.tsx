import React, { useState, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskSubmitPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    // 실제 제출 로직 추가 가능
    console.log(`Submitting file: ${file.name}`);
    navigate('/result');
  };

  return (
    <div>
      <div style={{ maxWidth: '700px', margin: '2rem auto', textAlign: 'center' }}>
        <h2>Submit for Task {taskId}</h2>
        <p>Upload a ZIP file containing your model predictions.</p>

        <input
          type="file"
          onChange={handleFileChange}
          accept=".zip"
          style={{ margin: '1rem 0' }}
        />
        {file && <p>📦 Selected file: {file.name}</p>}

        <button
          onClick={handleSubmit}
          style={{
            marginTop: '1rem',
            padding: '0.6rem 1.2rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TaskSubmitPage;
