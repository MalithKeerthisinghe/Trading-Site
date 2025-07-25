import React, { useState } from 'react';
import './App.css'; // Import the CSS file

// Main App component
const App = () => {
  const [investmentAmount, setInvestmentAmount] = useState(2); // Initial investment amount
  const [balance, setBalance] = useState(3.5); // Initial balance
  const [selectedTimeframe, setSelectedTimeframe] = useState('1H'); // Default timeframe
  const [marketSentiment] = useState({ sell: 71, buy: 29 }); // Market sentiment percentages

  // Function to handle investment amount changes from input
  const handleInvestmentChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setInvestmentAmount(value);
    }
  };

  // Function to handle predefined investment amount buttons
  const handlePresetAmount = (amount) => {
    setInvestmentAmount(amount);
  };

  // Function to handle timeframe selection
  const handleTimeframeSelect = (timeframe) => {
    setSelectedTimeframe(timeframe);
  };

  // Simulate a buy action (for demonstration)
  const handleBuy = () => {
    console.log(`Buying with ${investmentAmount} USD.`);
    // In a real app, this would trigger an API call and update balance/chart
    // For now, just a console log and a simple balance update
    setBalance(prevBalance => prevBalance + investmentAmount * 0.1); // Simulate a small gain
  };

  // Simulate a sell action (for demonstration)
  const handleSell = () => {
    console.log(`Selling with ${investmentAmount} USD.`);
    // In a real app, this would trigger an API call and update balance/chart
    // For now, just a console log and a simple balance update
    setBalance(prevBalance => prevBalance - investmentAmount * 0.05); // Simulate a small loss
  };

  return (
    <div className="app-container">
      <div className="dashboard-card">

        {/* Left Section: Chart and Price Info */}
        <div className="chart-section">
          <div className="header-row">
            <div>
              <h2 className="eth-usd-title">ETH/USD</h2>
              <p className="eth-usd-price">$2,692.25 <span className="price-change">3.34%</span></p>
            </div>
            <div className="timeframe-buttons">
              {['1H', '4H', '1D', '1W'].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => handleTimeframeSelect(timeframe)}
                  className={`timeframe-button ${selectedTimeframe === timeframe ? 'active' : ''}`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="chart-placeholder">
            {/* This would be where your actual chart library (e.g., Recharts, Chart.js) renders */}
            <img
              src="https://placehold.co/800x400/374151/9CA3AF?text=Cryptocurrency+Chart"
              alt="Chart Placeholder"
              className="chart-image"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x400/374151/9CA3AF?text=Chart+Unavailable'; }}
            />
          </div>

          {/* Time Labels for Chart (Simplified) */}
          <div className="chart-time-labels">
            <span>10:46</span>
            <span>10:48</span>
            <span>10:50</span>
            <span>10:52</span>
            <span>10:54</span>
            <span>10:56</span>
            <span>10:58</span>
            <span>11:00</span>
            <span>11:02</span>
            <span>11:04</span>
            <span>11:06</span>
            <span>11:08</span>
            <span>11:10</span>
            <span>11:12</span>
            <span>11:14</span>
          </div>
        </div>

        {/* Right Section: Control Panel */}
        <div className="control-panel-section">

          {/* Investment Plan */}
          <div className="investment-plan">
            <h3 className="section-title">Investment plan</h3>
            <div className="investment-card">
              <label htmlFor="investment-amount" className="input-label">
                Investment Amount
              </label>
              <div className="input-wrapper">
                <span className="input-currency-symbol">$</span>
                <input
                  type="number"
                  id="investment-amount"
                  className="investment-input"
                  placeholder="0.00"
                  value={investmentAmount}
                  onChange={handleInvestmentChange}
                  min="0"
                />
              </div>
              <div className="preset-amounts">
                {[1, 5, 10, 25, 50, 100].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handlePresetAmount(amount)}
                    className="preset-button"
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Market Sentiment */}
          <div className="market-sentiment">
            <h3 className="section-title">Market Sentiment</h3>
            <div className="sentiment-card">
              <div className="sentiment-labels">
                <span className="sell-label">Sell {marketSentiment.sell}%</span>
                <span className="buy-label">Buy {marketSentiment.buy}%</span>
              </div>
              <div className="sentiment-bar-container">
                <div
                  className="sentiment-bar-sell"
                  style={{ width: `${marketSentiment.sell}%` }}
                ></div>
                <div
                  className="sentiment-bar-buy"
                  style={{ width: `${marketSentiment.buy}%`, marginLeft: `${marketSentiment.sell}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              onClick={handleSell}
              className="action-button sell-button"
            >
              SELL ({marketSentiment.sell}%)
            </button>
            <button
              onClick={handleBuy}
              className="action-button buy-button"
            >
              BUY ({marketSentiment.buy}%)
            </button>
          </div>

          {/* Balance */}
          <div className="balance-section">
            <h3 className="section-title">Balance</h3>
            <p className="balance-amount">${balance.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
