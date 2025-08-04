import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Import this
import './index.css';

import HomePage from './pages/HomePage.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ Wrap everything in Router */}
      <HomePage />
    </BrowserRouter>
  </StrictMode>
);
