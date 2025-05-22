import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import TaskDetailPage from './pages/TaskDetail';
import TaskSubmitPage from './pages/TaskSubmit';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';
import MyPage from './pages/MyPage';
import Navbar from './components/Navbar';
import LeaderboardDetail from './pages/LeaderboardDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './components/NotFound';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
          <Route path="/tasks/:taskId/submit" element={<TaskSubmitPage />} />
          <Route path="/result" element={<Result />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/leaderboard/:taskId" element={<LeaderboardDetail />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
