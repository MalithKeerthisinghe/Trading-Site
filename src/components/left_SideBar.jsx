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
  FiFilter,
  FiLock,
  FiArrowRight,
  FiChevronRight
} from "react-icons/fi";

import messageImg from "../assets/images/message.png";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  const handleUserIconClick = () => {
    setShowProfilePopup((prev) => !prev);
    setActiveSection("profile"); // Reset to profile section when reopening
  };

  const ProfilePopup = () => {
    const renderContent = () => {
      switch (activeSection) {
        case "profile":
          return (
            <>
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
                  <p className="section-title-upcoming">
                    Upcoming achievements
                  </p>
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
                        <p className="account-info">
                          malithkeerthisinghe200@gmail.com
                        </p>
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
            </>
          );
        case "trade-history":
          return (
            <>
              <h2 className="profile-heading">Trade History</h2>
              <FiFilter className="filter-icon" />
              <img src={messageImg} alt="message" className="message-img" />
              <p className="empty-message">The list is empty</p>
              <button className="trade-button">T R A D E</button>
            </>
          );
        case "analytics":
          return (
            <>
              <h2 className="profile-heading">Analytics</h2>
              <FiBell className="bell-icon" />
              <img src={messageImg} alt="message" className="message-img" />
              <p className="ana-message">
                Your daily trading volume will be shown here
              </p>
              <button className="trade-button-ana">T R A D E</button>
            </>
          );
        case "security":
          return (
            <>
              <h2 className="profile-heading">Security</h2>
              <FiShield className="bell-icon" />

              <div className="section">
                <div className="section-header">
                  <p className="section-title-upcoming">Account</p>
                </div>

                {/* Password */}
                <div className="info-card-security">
                  <div className="info-item">
                    <div className="info-left">
                      <FiLock className="info-icon-security" />
                      <div>
                        <p className="account-info-heading-security">
                          Password
                        </p>
                        <p className="account-info-security">
                          Last changed: 2025-06-10
                        </p>
                      </div>
                      
                      
                      
                    </div>
                    <FiChevronRight className="arrow-icon-security" />
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="info-card-security authentication-card">
                  <div className="info-item">
                    <div className="info-left">
                      <FiShield className="info-icon-security" />
                      <div>
                        <p className="account-info-heading-security">
                          Two-Factor Authentication
                        </p>
                        <p className="account-info-security">Enabled</p>
                      </div>
                      
                      
                      
                    </div>
                    <FiChevronRight className="arrow-icon-security" />
                  </div>
                </div>
              </div>
            </>
          );
        default:
          return null;
      }
    };

    return (
      <div className="profile-popup">
        {renderContent()}
        {/* Bottom Navigation */}
        <div className="bottom-navigation">
          <Link
            to="/profile"
            className={`nav-item ${
              activeSection === "profile" ? "active" : ""
            }`}
            onClick={() => setActiveSection("profile")}
          >
            <FiUser className="nav-icon" />
            <span className="nav-label">Profile</span>
          </Link>
          <Link
            to="/trade-history"
            className={`nav-item ${
              activeSection === "trade-history" ? "active" : ""
            }`}
            onClick={() => setActiveSection("trade-history")}
          >
            <FiTrendingUp className="nav-icon" />
            <span className="nav-label">Trade</span>
          </Link>
          <Link
            to="/analytics"
            className={`nav-item ${
              activeSection === "analytics" ? "active" : ""
            }`}
            onClick={() => setActiveSection("analytics")}
          >
            <FiBarChart2 className="nav-icon" />
            <span className="nav-label">Analytics</span>
          </Link>
          <Link
            to="/security"
            className={`nav-item ${
              activeSection === "security" ? "active" : ""
            }`}
            onClick={() => setActiveSection("security")}
          >
            <FiShield className="nav-icon" />
            <span className="nav-label">Security</span>
          </Link>
        </div>
      </div>
    );
  };

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
