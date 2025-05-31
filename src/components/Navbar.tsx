import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { AuthContext } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // context에서 제공된 logout 함수
    navigate('/');
  };

  return (
    <nav className="navbar">
      {/* 왼쪽: 로고 / 서비스명 */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">🏠 Gakkle</Link>
      </div>

      {/* 가운데: 메뉴 */}
      <div className="navbar-center">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/tasks" className="navbar-link">Tasks</Link>
        <Link to="/grading" className="navbar-link">Grading</Link>
        <Link to="/leaderboard" className="navbar-link">Leaderboard</Link>
      </div>

      {/* 오른쪽: 로그인 여부에 따라 버튼 */}
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <Link to="/mypage" className="navbar-link">MyPage</Link>
            <button className="navbar-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Sign In</Link>
            <Link to="/signup" className="navbar-link">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
