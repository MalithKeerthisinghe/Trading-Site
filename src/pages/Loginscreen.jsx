import './LoginScreen.css'; // Import the CSS file

// Assuming stocks.png is in your src/assets folder
// For the purpose of this standalone component, we'll use a placeholder URL
// In a real React app, you would import it like:
// import bgImage from '../assets/stocks.png';
const bgImage = 'https://placehold.co/1920x1080/000000/FFFFFF?text=Stocks+Background'; // Placeholder for demonstration

const LoginScreen = () => {
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
          <span className="top-nav-left-text">Login screen</span>
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
          <button className="top-nav-button login">Log In</button>
          <button className="top-nav-button register">Register</button>
        </div>
      </div>

      {/* Centered Content Area */}
      <div className="main-content-area">
        {/* Content Card */}
        <div className="content-card">
          <div className="content-text-section">
            <h2 className="welcome-title">Welcome to TradeWise</h2>
            <p className="description-text">
              TradeWise is a platform for trading stocks, options, and crypto. Sign up to get started.
            </p>
            <div className="action-buttons-group">
              <button className="action-button signup">
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
      </div>
    </div>
  );
};

export default LoginScreen;
