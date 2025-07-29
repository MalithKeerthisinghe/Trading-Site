import './FinancesPopup.css'; // Create this CSS file for styling

const FinancesPopup = ({ onClose }) => {
  return (
    <div className="finances-popup-overlay">
      <div className="finances-popup-content">
        <div className="finances-popup-header">
          <h2>Finances</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="finances-popup-body">
          <button className="finances-button withdraw-button">Withdraw</button>
          <button className="finances-button deposit-button">Deposit</button>
          <p className="finances-description">
            Easily deposit, trade, and withdraw using various payment options.
          </p>
          <button className="view-history-button">View payment history</button>
        </div>
      </div>
    </div>
  );
};

export default FinancesPopup;