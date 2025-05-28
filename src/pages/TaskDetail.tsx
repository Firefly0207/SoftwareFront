import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';
import '../styles/TaskDetail.css';

const TaskDetail: React.FC = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [progress, setProgress] = useState<string[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const socket = new SockJS(`${import.meta.env.VITE_API_BASE_URL}/ws-progress`);
    const client = over(socket);

    client.connect({}, () => {
      console.log("✅ WebSocket 연결됨");

      client.subscribe(`/topic/progress/${token}`, (message) => {
        const body = JSON.parse(message.body);
        console.log("📥 진행상황 수신:", body);
        setProgress(prev => [...prev, JSON.stringify(body)]);
      });
    });

    setStompClient(client);

    return () => {
      if (stompClient?.connected) {
        stompClient.disconnect(() => {
          console.log("🛑 WebSocket 연결 해제됨");
        });
      }
    };
  }, []);

  return (
    <div className="task-detail-container">
      <h1 className="task-detail-title">📊 Task Detail</h1>
      <ul className="task-detail-list">
        {progress.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskDetail;
