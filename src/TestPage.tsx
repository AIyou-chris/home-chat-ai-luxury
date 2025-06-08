import React from 'react';

export const TestPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Page Works!</h1>
      <p>If you see this, the routing is working.</p>
      <p>Current URL: {window.location.pathname}</p>
    </div>
  );
}; 