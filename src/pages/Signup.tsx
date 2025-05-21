import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CSSProperties } from 'react';

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [team, setTeam] = useState<string>('');
  const navigate = useNavigate();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user-info/signup`, {
        id: team,
        email,
        password,
      });
      alert('✅ 회원가입 성공');
      console.log('Signup response:', response.data);
      navigate('/login');
    } catch (error: any) {
      console.error('Signup error:', error);
      alert(`❌ 회원가입 실패: ${error.response?.data?.message || '오류 발생'}`);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} style={formStyle}>
        <input
          type="text"
          placeholder="Team Name"
          value={team}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTeam(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

const containerStyle: CSSProperties = {
  maxWidth: '400px',
  margin: 'auto',
  padding: '2rem',
};

const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

export default Signup;
