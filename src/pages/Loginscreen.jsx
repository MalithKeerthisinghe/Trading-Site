import { useState } from 'react'; // Import useState
import './LoginScreen.css'; // Import the CSS file

// Assuming stocks.png is in your src/assets folder
// For the purpose of this standalone component, we'll use a placeholder URL
// In a real React app, you would import it like:
// import bgImage from '../assets/stocks.png';
const bgImage = 'https://as1.ftcdn.net/v2/jpg/03/10/46/56/1000_F_310465670_Wy4QCEfxYU2ziHjbeZsNAumKhaZzZS1w.jpg'; // Placeholder for demonstration

const LoginScreen = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'

  const handleSignUpClick = () => {
    setShowForm(true);
    setActiveTab('register'); // Default to register when "Sign Up" is clicked
  };

  const handleLoginRegisterToggle = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      className="login-screen-container"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Overall Dark Overlay */}
      <div className="overlay"></div>

      {/* Top Navigation Bar */}
      <div className="top-nav">
        <div className="flex items-center">
          {/* <span className="top-nav-left-text">Login screen</span> Removed as per image */}
          <h1 className="tradewise-logo">
            {/* Custom triangle icon using SVG */}
            <svg
              className="tradewise-logo-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                clipRule="evenodd"
              />
            </svg>
            TradeWise
          </h1>
        </div>
        <div className="top-nav-buttons">
          <button className="top-nav-button login" onClick={() => { setShowForm(true); setActiveTab('login'); }}>Log In</button>
          <button className="top-nav-button register" onClick={() => { setShowForm(true); setActiveTab('register'); }}>Register</button>
        </div>
      </div>

      {/* Centered Content Area */}
      <div className="main-content-area">
        {/* Content Card (Left side) */}
        <div className="content-card">
          <div className="content-text-section">
            <h2 className="welcome-title">Welcome to TradeWise</h2>
            <p className="description-text">
              TradeWise is a platform for trading stocks, options, and crypto. Sign up to get started.
            </p>
            <div className="action-buttons-group">
              <button className="action-button signup" onClick={handleSignUpClick}>
                Sign Up
              </button>
              <button className="action-button kyc">
                Verify KYC
              </button>
              <button className="action-button demo">
                Try Demo Account
              </button>
            </div>
          </div>
        </div>

        {/* Login/Register Form (Right side) - Conditionally rendered */}
        {showForm && (
          <div className="auth-form-container">
            <div className="auth-tabs">
              <button
                className={`auth-tab-button ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => handleLoginRegisterToggle('login')}
              >
                Login
              </button>
              <button
                className={`auth-tab-button ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => handleLoginRegisterToggle('register')}
              >
                Register
              </button>
            </div>

            {activeTab === 'login' ? (
              <div className="auth-form login-form">
                <input type="email" placeholder="Email" className="auth-input" />
                <input type="password" placeholder="Password" className="auth-input" />
                <a href="#" className="forgot-password">Forgot Password ?</a>
                <button className="auth-submit-button login-button">Login</button>
                <div className="social-login-buttons">
                  <button className="social-button facebook">
                    <i className="fab fa-facebook-f"></i> Facebook
                  </button>
                  <button className="social-button google">
                    <i className="fab fa-google"></i> Google
                  </button>
                  <button className="social-button apple">
                    <i className="fab fa-apple"></i> Sign in
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-form register-form">
                <input type="email" placeholder="Email" className="auth-input" />
                <input type="password" placeholder="Password" className="auth-input" />
                <input type="password" placeholder="Confirm Password" className="auth-input" />
                <p className="terms-privacy-text">
                  By creating an account, you agree to our <a href="#">terms and privacy policy</a>.
                </p>
                <button className="auth-submit-button register-button">Open account</button>
                <div className="social-login-buttons">
                  <button className="social-button facebook">
                    <i className="fab fa-facebook-f"></i> Facebook
                  </button>
                  <button className="social-button google">
                    <i className="fab fa-google"></i> Google
                  </button>
                  <button className="social-button apple">
                    <i className="fab fa-apple"></i> Sign in
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;