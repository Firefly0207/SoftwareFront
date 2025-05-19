import React from 'react';
import { useNavigate } from 'react-router-dom';

function TaskCard({ id, title, description, dueDate }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tasks/${id}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        boxSizing: 'border-box',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#eee',
          borderRadius: '4px',
          flexShrink: 0,
        }}
      />

      <div style={{ flex: 1, minWidth: '200px' }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p style={{ margin: '0.3rem 0', color: '#666' }}>{description}</p>
        <p style={{ fontSize: '0.85rem', color: '#999' }}>Due date: {dueDate}</p>
      </div>

      <button
        onClick={handleClick}
        style={{
          padding: '0.5rem 1rem',
          border: '1px solid #888',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        Get started
      </button>
    </div>
  );
}

export default TaskCard;
