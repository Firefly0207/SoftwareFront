import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPage.css';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="admin-page-container">
      <h2 className="admin-page-title">Administrator Functions</h2>
      <div className="admin-page-menu">
        <button onClick={() => handleNavigation('/admin/add')} className="admin-page-button">
          Add Task...
        </button>
        <button onClick={() => handleNavigation('/admin/edit')} className="admin-page-button">
          Edit Task...
        </button>
        <button onClick={() => handleNavigation('/admin/delete')} className="admin-page-button">
          Delete Task...
        </button>
        <button onClick={() => handleNavigation('/admin/submissions')} className="admin-page-button">
          Manage Submission
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
