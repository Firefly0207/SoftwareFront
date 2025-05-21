import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user-info/login`, {
        email,
        password,
      });

      // 로그인 성공 시 로컬 스토리지 및 전역 상태 업데이트
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email.trim());
      login();

      alert('✅ 로그인 성공!');
      navigate('/mypage');
    } catch (error: any) {
      console.error('Login error:', error);
      alert(`❌ 로그인 실패: ${error.response?.data?.message || '오류 발생'}`);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
    </div>
  );
};

export default Login;
