// src/components/Layout.jsx
import React from 'react';

function Layout({ children }) {
  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  );
}

export default Layout;
