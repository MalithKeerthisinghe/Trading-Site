import React, { useState } from "react";
import { createPortal } from "react-dom";
import "../Pages/HomePage.css";
import { FiBell } from "react-icons/fi";

const LeftSidebar = () => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const handleUserIconClick = () => {
    setShowProfilePopup((prev) => !prev);
  };

  const ProfilePopup = () => (
    <div className="profile-popup">
      <h2 className="profile-heading">Profile</h2>
      <FiBell className="bell-icon" />
      <div className="profile-header">
        <div className="avatar-placeholder">👤</div>
        <div>
          <p>Hello,</p>
          <p className="profile-id">1234-5678-9101</p>
        </div>
      </div>
      <div className="section">
        <div className="section-header">
          <p className="section-title-upcoming">Upcoming achievements</p>
          <p className="more-word">More</p>
        </div>

        <div className="empty-achievements"></div>
      </div>
      <div className="section">
        <p className="section-title-info">Account information</p>
        <div className="info-card">
          <p> 1234-5678-9101</p>
          <p>
            <strong>Profile ID</strong>
          </p>
          <p>malithkeerthisinghe200@gmail.com</p>
          <p>
            <strong>Email</strong> 
          </p>
          <p>LK</p>
          <p>
            <strong>Country</strong>
          </p>
        </div>
      </div>
      <button onClick={() => setShowProfilePopup(false)}>Close</button>
    </div>
  );

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-item">
          <span role="img" aria-label="home">
            🏠
          </span>
        </div>
        <div className="sidebar-item">
          <span role="img" aria-label="plus">
            ➕
          </span>
        </div>
        <div className="sidebar-item">
          <span role="img" aria-label="arrow-up">
            ⬆️
          </span>
        </div>
        <div className="sidebar-item">
          <span role="img" aria-label="dollar">
            💵
          </span>
        </div>
        <div className="sidebar-item" onClick={handleUserIconClick}>
          <span role="img" aria-label="user">
            👤
          </span>
        </div>
        <div className="sidebar-item">
          <span role="img" aria-label="gear">
            ⚙️
          </span>
        </div>
      </div>
      {showProfilePopup && createPortal(<ProfilePopup />, document.body)}
    </>
  );
};

export default LeftSidebar;
