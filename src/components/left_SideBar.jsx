import React, { useState } from "react";
import { createPortal } from "react-dom";
import "../Pages/HomePage.css";
import {
  FiBell,
  FiUser,
  FiMail,
  FiGlobe,
  FiCopy,
  FiTrendingUp,
  FiBarChart2,
  FiShield,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";




const LeftSidebar = () => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const location = useLocation();

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
          <div className="info-item">
            <div className="info-left">
              <FiUser className="info-icon" />
              <div>
                <p className="account-info">1234-5678-9101</p>
                <p className="account-info-heading">Profile ID</p>
              </div>
            </div>
            <FiCopy className="copy-icon" />
          </div>

          <div className="info-item">
            <div className="info-left">
              <FiMail className="info-icon" />
              <div>
                <p className="account-info">malithkeerthisinghe200@gmail.com</p>
                <p className="account-info-heading">Email</p>
              </div>
            </div>
            <FiCopy className="copy-icon" />
          </div>

          <div className="info-item">
            <div className="info-left">
              <FiGlobe className="info-icon" />
              <div>
                <p className="account-info">LK</p>
                <p className="account-info-heading">Country</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-navigation">
        <Link
          to="/profile"
          className={`nav-item ${location.pathname === "/profile" ? "active" : ""}`}
        >
          <FiUser className="nav-icon" />
          <span className="nav-label">Profile</span>
        </Link>
        <Link
          to="/trade-history"
          className={`nav-item ${location.pathname === "/trade-history" ? "active" : ""}`}
        >
          <FiTrendingUp className="nav-icon" />
          <span className="nav-label">Trade</span>
        </Link>
        <Link
          to="/analytics"
          className={`nav-item ${location.pathname === "/analytics" ? "active" : ""}`}
        >
          <FiBarChart2 className="nav-icon" />
          <span className="nav-label">Analytics</span>
        </Link>
        <Link
          to="/security"
          className={`nav-item ${location.pathname === "/security" ? "active" : ""}`}
        >
          <FiShield className="nav-icon" />
          <span className="nav-label">Security</span>
        </Link>
      </div>
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
