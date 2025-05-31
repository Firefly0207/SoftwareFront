import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useResult } from '../contexts/ResultContext';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { WebSocketMessage, ComparisonResult, ComparisonProgress } from '../types/ComparisonResult';

const Result: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { result, setResult, isLoading, setIsLoading, progress, setProgress } = useResult();
  const [showRegisterButton, setShowRegisterButton] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!location.state?.requestId || !token) {
      navigate('/grading');
      return;
    }

    const connectWebSocket = () => {
      const socket = new SockJS(`${import.meta.env.VITE_API_BASE_URL}/ws-progress`, null, {
        transports: ['websocket']
      });

      const stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          Authorization: token
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        debug: (str) => {
          console.log('[WebSocket Debug]:', str);
        }
      });

      stompClient.onConnect = () => {
        console.log('✅ WebSocket 연결됨');
        const tokenWithoutBearer = token.replace('Bearer ', '');
        
        // 진행 상황 구독
        stompClient.subscribe(`/topic/progress/${tokenWithoutBearer}`, (message) => {
          try {
            const response = JSON.parse(message.body) as WebSocketMessage;
            console.log('Progress 메시지 수신:', response);
            if (response.status === 'progress') {
              const progressData = response.data as ComparisonProgress;
              setProgress({
                current: progressData.current,
                total: progressData.total
              });
            }
          } catch (error) {
            console.error('Progress 메시지 처리 중 오류:', error);
          }
        });

        // 최종 결과 구독
        stompClient.subscribe(`/topic/result/${tokenWithoutBearer}`, (message) => {
          try {
            const response = JSON.parse(message.body) as WebSocketMessage;
            console.log('Result 메시지 수신:', response);
            if (response.status === 'success') {
              const resultData = response.data as ComparisonResult;
              setResult(resultData);
              setIsLoading(false);
            } else {
              console.error('Result 실패:', response);
              alert('비교 실패');
              navigate('/grading');
            }
          } catch (error) {
            console.error('Result 메시지 처리 중 오류:', error);
          }
        });
      };

      stompClient.onStompError = (frame) => {
        console.error('❗ STOMP 에러:', frame.headers['message'], frame.body);
        setTimeout(() => {
          navigate('/grading');
        }, 1000);
      };

      stompClient.onWebSocketError = (event) => {
        console.error('❌ WebSocket 에러:', event);
        setTimeout(() => {
          navigate('/grading');
        }, 1000);
      };

      stompClient.onDisconnect = () => {
        console.log('WebSocket 연결 해제됨');
      };

      stompClient.activate();
      return stompClient;
    };

    setIsLoading(true);
    const stompClient = connectWebSocket();

    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, [token, location.state?.requestId]);

  const handleRegisterLeaderboard = async () => {
    if (!result) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/leaderboard/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          requestId: result.requestId,
          task: result.task
        })
      });

      const data = await response.json();
      if (data.status === 'success') {
        setShowRegisterButton(false);
        navigate('/leaderboard');
      } else {
        alert('리더보드 등록 실패');
      }
    } catch (error) {
      alert('리더보드 등록 중 오류 발생');
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Comparing Images...</h2>
        {progress && (
          <p>Progress: {progress.current} / {progress.total}</p>
        )}
      </div>
    );
  }

  if (!result) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>No result available</h2>
        <button onClick={() => navigate('/grading')} style={btnStyle}>
          Return to Grading
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Result</h2>
        
        <div style={{ margin: '2rem 0' }}>
          <p style={{ fontSize: '1.25rem' }}>Task: <strong>{result.task}</strong></p>
          <p style={{ fontSize: '1.25rem' }}>PSNR: <strong>{result.psnrAvg.toFixed(2)}</strong></p>
          <p style={{ fontSize: '1.25rem' }}>SSIM: <strong>{result.ssimAvg.toFixed(4)}</strong></p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          {showRegisterButton && (
            <button onClick={handleRegisterLeaderboard} style={btnStyle}>
              Register on Leaderboard
            </button>
          )}
          <button onClick={() => navigate('/grading')} style={btnStyle}>
            Return to Grading
          </button>
        </div>
      </div>
    </div>
  );
};

const btnStyle: React.CSSProperties = {
  width: '211px',
  height: '41px',
  padding: '0.6rem 1.2rem',
  backgroundColor: 'black',
  color: 'white',
  border: 'none',
  borderRadius: '0.6rem',
  cursor: 'pointer',
  fontSize: '14px',
  display: 'flex',    
  lineHeight: '1',                
  fontWeight: 500,
  justifyContent: 'center',
  alignItems: 'center',                
};

export default Result;
