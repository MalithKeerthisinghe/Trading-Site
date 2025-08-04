import './App.css';
import LoginScreen from './pages/LoginScreen.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import Profile from "./components/Profile";
import TradeHistory from "./components/TradeHistory";
import Analytics from "./components/Analytics";
import Security from "./components/Security";


function App() {
  return (
    <Router>
      <div className="homepage-layout">
        <LeftSidebar />
        <Routes>
          <Route path="/" element={<LoginScreen />} /> {/* Default route */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/trade-history" element={<TradeHistory />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/security" element={<Security />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
