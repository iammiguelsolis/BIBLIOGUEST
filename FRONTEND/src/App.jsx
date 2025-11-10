import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ColorPalette from "./Colors/ColorPalette";
import LandingPage from "./modules/landing/LandingPage";
import LoginPage from "./modules/auth/LoginPage";
import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
