import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './HomePage.css'; // Import the CSS file

// Initial chart data for different timeframes
const initialChartData = {
  '1H': [
    { time: '10:46', price: 50000 },
    { time: '10:48', price: 50150 },
    { time: '10:50', price: 49980 },
    { time: '10:52', price: 50230 },
    { time: '10:54', price: 50100 },
    { time: '10:56', price: 50320 },
    { time: '10:58', price: 50280 },
    { time: '11:00', price: 50400 },
    { time: '11:02', price: 50350 },
    { time: '11:04', price: 50500 },
    { time: '11:06', price: 50420 },
    { time: '11:08', price: 50600 },
    { time: '11:10', price: 50550 },
    { time: '11:12', price: 50700 },
    { time: '11:14', price: 50650 },
  ],
  '4H': [
    { time: '08:00', price: 49800 },
    { time: '08:30', price: 49900 },
    { time: '09:00', price: 50050 },
    { time: '09:30', price: 50120 },
    { time: '10:00', price: 50200 },
    { time: '10:30', price: 50350 },
    { time: '11:00', price: 50400 },
    { time: '11:30', price: 50500 },
  ],
  '1D': [
    { time: '00:00', price: 49500 },
    { time: '04:00', price: 49700 },
    { time: '08:00', price: 49900 },
    { time: '12:00', price: 50100 },
    { time: '16:00', price: 50300 },
    { time: '20:00', price: 50500 },
  ],
  '1W': [
    { time: 'Mon', price: 49000 },
    { time: 'Tue', price: 49200 },
    { time: 'Wed', price: 49500 },
    { time: 'Thu', price: 49800 },
    { time: 'Fri', price: 50000 },
    { time: 'Sat', price: 50300 },
    { time: 'Sun', price: 50600 },
  ],
};

// Function to generate next time label based on timeframe
const getNextTime = (lastTime, timeframe) => {
  if (timeframe === '1W') {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const currentIndex = days.indexOf(lastTime);
    return days[(currentIndex + 1) % 7];
  } else {
    const [hours, minutes] = lastTime.split(':').map(Number);
    let newMinutes = minutes;
    let newHours = hours;

    if (timeframe === '1H' || timeframe === '4H') {
      newMinutes += timeframe === '1H' ? 2 : 30;
      if (newMinutes >= 60) {
        newMinutes -= 60;
        newHours += 1;
      }
    } else if (timeframe === '1D') {
      newHours += 4;
      if (newHours >= 24) {
        newHours -= 24;
      }
    }

    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  }
};

// Main App component
const HomePage = () => {
  const [investmentAmount, setInvestmentAmount] = useState(2); // Initial investment amount
  const [balance, setBalance] = useState(3.5); // Initial balance
  const [selectedTimeframe, setSelectedTimeframe] = useState('1H'); // Default timeframe
  const [marketSentiment] = useState({ sell: 71, buy: 29 }); // Market sentiment percentages
  const [chartData, setChartData] = useState(initialChartData); // Dynamic chart data
  const [animationKey, setAnimationKey] = useState(0); // Key to force re-animation

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
    setAnimationKey(prev => prev + 1); // Reset animation on timeframe change
  };

  // Simulate a buy action (for demonstration)
  const handleBuy = () => {
    console.log(`Buying with ${investmentAmount} USD.`);
    setBalance(prevBalance => prevBalance + investmentAmount * 0.1); // Simulate a small gain
  };

  // Simulate a sell action (for demonstration)
  const handleSell = () => {
    console.log(`Selling with ${investmentAmount} USD.`);
    setBalance(prevBalance => prevBalance - investmentAmount * 0.05); // Simulate a small loss
  };

  // Animation effect to simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prevData => {
        const newData = { ...prevData };
        const currentData = [...newData[selectedTimeframe]];
        const lastPoint = currentData[currentData.length - 1];
        const newPrice = lastPoint.price + (Math.random() - 0.5) * 200; // Random fluctuation ±100
        const newTime = getNextTime(lastPoint.time, selectedTimeframe);

        // Add new data point
        currentData.push({ time: newTime, price: Math.max(40000, Math.min(60000, newPrice)) });

        // Keep only the last 15 points for 1H, 8 for 4H, 6 for 1D, 7 for 1W
        const maxPoints = selectedTimeframe === '1H' ? 15 : selectedTimeframe === '4H' ? 8 : selectedTimeframe === '1D' ? 6 : 7;
        if (currentData.length > maxPoints) {
          currentData.shift();
        }

        newData[selectedTimeframe] = currentData;
        return newData;
      });
      setAnimationKey(prev => prev + 1); // Trigger re-animation
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [selectedTimeframe]);

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

          {/* Chart Implementation */}
          <div className="chart-placeholder">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart 
                key={animationKey} // Force re-render for animation
                data={chartData[selectedTimeframe]} 
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis 
                  dataKey="time" 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  interval={0}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  domain={['auto', 'auto']}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#374151', 
                    border: 'none', 
                    borderRadius: '4px',
                    color: '#E5E7EB'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                  animationDuration={1500} // Longer animation for drawing effect
                  animationBegin={0} // Start animation immediately
                  isAnimationActive={true} // Ensure animation is active
                />
              </LineChart>
            </ResponsiveContainer>
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

export default HomePage;