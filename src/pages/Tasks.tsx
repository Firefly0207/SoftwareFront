import React, { useState } from 'react';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';
import { useNavigate } from 'react-router-dom';
import '../styles/Tasks.css';

const Tasks: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const startTask = async () => {
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/task/start`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('🚀 작업 시작 요청 성공:', response.data);

      const socket = new SockJS(`${import.meta.env.VITE_API_BASE_URL}/ws-progress`);
      const client = over(socket);

      client.connect({}, () => {
        console.log('✅ WebSocket 연결 완료');

        client.subscribe(`/topic/task/${token}`, (message) => {
          const body = JSON.parse(message.body);
          console.log('📥 수신:', body);
          setMessages((prev) => [...prev, JSON.stringify(body)]);
        });

        // ✅ WebSocket 연결 후 라우팅
        navigate('/tasks/1/submit'); // taskId 실제 값으로 교체
      });

    } catch (error) {
      console.error('❌ 작업 시작 실패:', error);
    }
  };

  return (
    <div className="tasks-container">
      <h1>📄 Tasks Page</h1>
      <button onClick={startTask}>작업 시작</button>

      <ul>
        {messages.map((m, i) => <li key={i}>{m}</li>)}
      </ul>
    </div>
  );
};

export default Tasks;
