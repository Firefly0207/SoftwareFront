// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import TaskDetailPage from './pages/TaskDetail';
import TaskSubmitPage from './pages/TaskSubmit';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';
import MyPage from './pages/MyPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
        <Route path="/tasks/:taskId/submit" element={<TaskSubmitPage />} />
        <Route path="/result" element={<Result />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
