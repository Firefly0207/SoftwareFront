import React from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import UploadIcon from "@mui/icons-material/Upload";
import CodeIcon from "@mui/icons-material/Code";
import ChecklistIcon from "@mui/icons-material/Checklist";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

function HomePage() {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate('/tasks');
  };
  return (
    <>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem 1rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "700" }}>Gakkle</h1>
        <p style={{ color: "#555" }}>Gakkle provides AI-based image evaluation</p>
        <button
          onClick={handleStart}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Get Started
        </button>

        <div style={{ marginTop: "4rem" }}>
          <h2>How it works?</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "3rem",
              marginTop: "2rem",
            }}
          >
            {[
              {
                icon: <UploadIcon fontSize="large" />,
                title: "Upload",
                desc: "업로드한 이미지로 시작하세요",
              },
              {
                icon: <CodeIcon fontSize="large" />,
                title: "Compare",
                desc: "AI가 자동으로 비교합니다",
              },
              {
                icon: <ChecklistIcon fontSize="large" />,
                title: "Score",
                desc: "성능을 점수화해줍니다",
              },
              {
                icon: <EmojiEventsIcon fontSize="large" />,
                title: "Rank",
                desc: "다른 참가자들과 순위를 비교하세요",
              },
            ].map((item, idx) => (
              <div key={idx} style={{ width: "200px" }}>
                <div>{item.icon}</div>
                <h4>{item.title}</h4>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
