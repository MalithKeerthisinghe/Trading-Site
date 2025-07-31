import React, { useState } from "react";
import { createPortal } from "react-dom";
import "../Pages/HomePage.css";

const LeftSidebar = () => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const handleUserIconClick = () => {
    setShowProfilePopup(prev => !prev);
  };

  const ProfilePopup = () => (
    <div className="profile-popup">
      <div className="profile-header">
        <div className="avatar-placeholder">👤</div>
        <div>
          <p>Hello,</p>
          <p className="profile-id">1234-5678-9101</p>
        </div>
      </div>
      <div className="section">
        <p className="section-title">Upcoming achievements</p>
        <div className="empty-achievements"></div>
      </div>
      <div className="section">
        <p className="section-title">Account information</p>
        <div className="info-card">
          <p><strong>Profile ID:</strong> 1234-5678-9101</p>
          <p><strong>Email:</strong> malithkeerthisinghe200@gmail.com</p>
          <p><strong>Country:</strong> LK</p>
        </div>
      </div>
      <button onClick={() => setShowProfilePopup(false)}>Close</button>
    </div>
  );

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-item">
          <span role="img" aria-label="home">🏠</span>
        </div>
        <div className="sidebar-item">
          <span role="img" aria-label="plus">➕</span>
        </div>
        <div className="sidebar-item">
          <span role="img" aria-label="arrow-up">⬆️</span>
        </div>
        <div className="sidebar-item">
          <span role="img" aria-label="dollar">💵</span>
        </div>
        <div className="sidebar-item" onClick={handleUserIconClick}>
          <span role="img" aria-label="user">👤</span>
        </div>
        <div className="sidebar-item">
          <span role="img" aria-label="gear">⚙️</span>
        </div>
      </div>
      {showProfilePopup &&
        createPortal(<ProfilePopup />, document.body)}
    </>
  );
};

export default LeftSidebar;