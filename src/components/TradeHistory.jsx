import React from "react";

const TradeHistory = () => {
  const trades = [
    { date: "2025-08-01", symbol: "BTC", type: "Buy", amount: "0.5 BTC" },
    { date: "2025-07-15", symbol: "ETH", type: "Sell", amount: "2 ETH" },
  ];

  return (
    <div className="profile-popup">
      <h2 className="profile-heading">Trade History</h2>
      <ul className="trade-list">
        {trades.map((trade, index) => (
          <li key={index} className="trade-item">
            <strong>{trade.symbol}</strong> - {trade.type} - {trade.amount} on {trade.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TradeHistory;
