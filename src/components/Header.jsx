import { ChevronDown, Clock, DollarSign, PieChart, Wallet } from 'lucide-react'; // Importing icons from lucide-react
import { useState } from 'react';
import './Header.css'; // Import the external CSS file

function App({ onFinancesClick }) {
  const [balance] = useState('0.00');
  const [dealDuration] = useState('00:00');
  const [currencyPair, setCurrencyPair] = useState('ETH/USD');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      {/* Left section: Balance and Insufficient Balance */}
      <div className="header-section">
        <div className="info-block">
          <Wallet className="icon" />
          <span className="text-small-medium">Balance: ${balance}</span>
        </div>
        <button className="button-base button-insufficient">
          Insufficient Balance
        </button>
      </div>

      {/* Middle section: Deal Duration and Currency Pair */}
      <div className="header-section">
        <div className="info-block">
          <Clock className="icon" />
          <span className="text-small-medium">Deal Duration: {dealDuration}</span>
        </div>

        {/* Currency Pair Dropdown */}
        <div className="dropdown-container">
          <button
            onClick={toggleDropdown}
            className="button-base button-primary"
          >
            <DollarSign className="icon" />
            <span className="text-small-medium">{currencyPair}</span>
            <ChevronDown className={`dropdown-icon ${isDropdownOpen ? 'rotate' : ''}`} />
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <ul className="py-1">
                <li
                  className="dropdown-item"
                  onClick={() => { setCurrencyPair('BTC/USD'); setIsDropdownOpen(false); }}
                >
                  BTC/USD
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => { setCurrencyPair('ETH/USD'); setIsDropdownOpen(false); }}
                >
                  ETH/USD
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => { setCurrencyPair('LTC/USD'); setIsDropdownOpen(false); }}
                >
                  LTC/USD
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right section: Finances button */}
      <div className="header-section">
        <button className="button-base button-primary" onClick={onFinancesClick}>
          <PieChart className="icon" />
          <span className="text-small-medium">Finances</span>
        </button>
      </div>
    </header>
  );
}

export default App;
