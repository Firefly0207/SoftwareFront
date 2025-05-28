import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';
import '../styles/TaskSubmit.css';

const TaskSubmit: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);
  const token = localStorage.getItem('token');
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!token) {
      console.warn('❗ 토큰이 없습니다. 로그인 후 이용해주세요.');
      return;
    }

    const socket = new SockJS(`${import.meta.env.VITE_API_BASE_URL}/ws-progress`);
    const client = over(socket);

    client.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        console.log('✅ WebSocket 연결 성공');
        client.subscribe(`/topic/result/${token}`, (message) => {
          const body = JSON.parse(message.body);
          console.log('📥 결과 수신:', body);
          setResults((prev) => [...prev, JSON.stringify(body)]);
        });
      },
      (error) => {
        console.error('❌ WebSocket 연결 실패:', error);
      }
    );

    stompClientRef.current = client;

    return () => {
      if (stompClientRef.current?.connected) {
        stompClientRef.current.disconnect(() => {
          console.log('🛑 WebSocket 연결 해제 완료');
        });
      }
    };
  }, [token]);

  return (
    <div className="task-submit-container">
      <h1 className="task-submit-title">📦 Task Submit</h1>
      <ul className="task-submit-list">
        {results.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskSubmit;
