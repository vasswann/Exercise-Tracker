import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// this react strict mode give me a warning when I use material UI speedDial component
// I can't fix this yet so I can change Rect.StrictMode to React.Fragment
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
