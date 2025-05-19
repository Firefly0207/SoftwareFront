import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 로직 추가
    alert('로그아웃 되었습니다.');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      borderBottom: '1px solid #ccc',
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#fff'
    }}>
      {/* 좌측: 서비스 이름 */}
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          Gakkle
        </Link>
      </div>

      {/* 중앙: 메뉴 */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
        flex: 1,
        fontWeight: 600
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Home</Link>
        <Link to="/tasks" style={{ textDecoration: 'none', color: 'black' }}>Tasks</Link>
        <Link to="/leaderboard" style={{ textDecoration: 'none', color: 'black' }}>Leaderboard</Link>
        <Link to={isLoggedIn ? "/mypage" : "/login"} style={{ textDecoration: 'none', color: 'black' }}>Mypage</Link>
      </div>

      {/* 우측: 로그인 / 로그아웃 */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={{
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>Sign in</Link>
            <Link to="/signup" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;