import { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import FinancesPopup from '../components/FinancesPopup';
import Header from "../components/Header";
import './HomePage.css'; // Import the CSS 


// Initial chart data for different timeframes
const initialChartData = {
  '1H': Array.from({ length: 15 }, (_, i) => ({
    time: new Date(Date.now() - (14 - i) * 2 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    price: 50000 + (Math.random() - 0.5) * 1000,
  })),
  '4H': Array.from({ length: 8 }, (_, i) => ({
    time: new Date(Date.now() - (7 - i) * 30 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    price: 50000 + (Math.random() - 0.5) * 1000,
  })),
  '1D': Array.from({ length: 6 }, (_, i) => ({
    time: new Date(Date.now() - (5 - i) * 4 * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    price: 50000 + (Math.random() - 0.5) * 1000,
  })),
  '1W': Array.from({ length: 7 }, (_, i) => ({
    time: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
    price: 50000 + (Math.random() - 0.5) * 1000,
  })),
};

// Function to get the next time based on timeframe
const getNextTime = (lastTime, timeframe) => {
  const lastDate = new Date();
  if (timeframe === '1W') {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentIndex = days.indexOf(lastTime);
    return days[(currentIndex + 1) % 7];
  } else {
    const [hours, minutes] = lastTime.split(':').map(Number);
    lastDate.setHours(hours, minutes, 0, 0);

    if (timeframe === '1H') {
      lastDate.setMinutes(lastDate.getMinutes() + 2);
    } else if (timeframe === '4H') {
      lastDate.setMinutes(lastDate.getMinutes() + 30);
    } else if (timeframe === '1D') {
      lastDate.setHours(lastDate.getHours() + 4);
    }

    return lastDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  }
};

// Main App component
const HomePage = () => {
  const [investmentAmount, setInvestmentAmount] = useState(2); // Initial investment amount
  const [balance, setBalance] = useState(3.5); // Initial balance
  const [selectedTimeframe, setSelectedTimeframe] = useState('1H'); // Default timeframe
  const [marketSentiment] = useState({ sell: 71, buy: 29 }); // Market sentiment percentages
  const [chartData, setChartData] = useState(initialChartData); // Dynamic chart data
  const [showFinancesPopup, setShowFinancesPopup] = useState(false); // State for popup visibility

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

    const openFinancesPopup = () => {
    setShowFinancesPopup(true);
  };

  // Function to close the finances popup
  const closeFinancesPopup = () => {
    setShowFinancesPopup(false);
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
    }, 1000); // Update every 1 second for smooth scrolling

    return () => clearInterval(interval); // Cleanup on unmount
  }, [selectedTimeframe]);

  // Compute dynamic Y-axis domain
  const getYDomain = () => {
    const prices = chartData[selectedTimeframe].map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const padding = (maxPrice - minPrice) * 0.1; // 10% padding
    return [minPrice - padding, maxPrice + padding];
  };

  return (
    <>
       <Header onFinancesClick={openFinancesPopup} />
      <h1 className="page-title">Trading Dashboard</h1>
      
      {/* The app-container now directly holds the chart and control panel sections */}
      <div className="app-container">
        {/* Left Section: Chart and Price Info */}
        <div className="chart-section">
          <div className="header-row">
            <div>
              <h2 className="eth-usd-title">ETH/USD</h2>
              <p className="eth-usd-price">
                ${chartData[selectedTimeframe][chartData[selectedTimeframe].length - 1].price.toFixed(2)}{' '}
                <span className="price-change">3.34%</span>
              </p>
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
                data={chartData[selectedTimeframe]}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis
                  dataKey="time"
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  interval={Math.floor(chartData[selectedTimeframe].length / 5)} // Adjust tick density
                />
                <YAxis
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  domain={getYDomain()}
                  tickFormatter={(value) => `$${value.toFixed(0)}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#374151',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#E5E7EB',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false} // No dots on historical points
                  activeDot={{
                    r: 6, // Size of the dot
                    fill: '#10B981', // Match line color
                    stroke: '#fff', // White border for visibility
                    strokeWidth: 2,
                  }}
                  animationDuration={1000} // Smooth transition for new points
                  isAnimationActive={true}
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
                  style={{ width: `${marketSentiment.buy}%` }}
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
      {showFinancesPopup && <FinancesPopup onClose={closeFinancesPopup} />}
    </>
  );
};

export default HomePage;
