import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ColorPalette from "./Colors/ColorPalette";
import LandingPage from "./modules/landing/LandingPage";
import LoginPage from "./modules/auth/LoginPage";
import DatePicker from "./globals/components/atoms/DatePicker";
import TimePicker from "./globals/components/atoms/TimePicker";
import Select from "./globals/components/atoms/Select";
import Badge from "./globals/components/atoms/Badge";
import TimeRangeSelector from "./globals/components/molecules/TimeRangeSelector";
import FilterGroup from "./globals/components/molecules/FilterGroup";
import LaptopCard from "./globals/components/molecules/LaptopCard";
import LaptopReservationPage from "./modules/reservation/LaptopReservationPage";

import "./styles.css";

function App() {
  return (
    <Router>
      <LaptopReservationPage/>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
