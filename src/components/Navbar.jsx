// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/problems">Problems</Link> |{" "}
      <Link to="/leaderboard">Leaderboard</Link> |{" "}
      <Link to="/mypage">MyPage</Link>
    </nav>
  );
}
export default Navbar;
