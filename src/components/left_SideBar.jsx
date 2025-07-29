import './HomePage.css'; // Reuse existing styles

const LeftSidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <span role="img" aria-label="home">🏠</span> {/* Home icon */}
      </div>
      <div className="sidebar-item">
        <span role="img" aria-label="plus">➕</span> {/* Plus icon */}
      </div>
      <div className="sidebar-item">
        <span role="img" aria-label="arrow-up">⬆️</span> {/* Arrow up icon */}
      </div>
      <div className="sidebar-item">
        <span role="img" aria-label="dollar">💵</span> {/* Dollar icon */}
      </div>
      <div className="sidebar-item">
        <span role="img" aria-label="user">👤</span> {/* User icon */}
      </div>
      <div className="sidebar-item">
        <span role="img" aria-label="gear">⚙️</span> {/* Gear icon */}
      </div>
    </div>
  );
};

export default LeftSidebar;