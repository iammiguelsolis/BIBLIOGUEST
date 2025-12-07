import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ColorPalette from "./Colors/ColorPalette";
import LandingPage from "./modules/landing/LandingPage";
import LoginPage from "./modules/auth/LoginPage";
import LaptopReservationPage from "./modules/reservation/LaptopReservationPage";

import "./styles.css";
import { MainLayout } from "./globals/layaout/MainLayout";
import LibrosPage from "./modules/libros/page/Libros";
import Cubiculos from "./modules/cubiculos/page/Cubiculos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
        <Route element={<MainLayout />}>
          <Route path="/laptop" element={<LaptopReservationPage />} />
          <Route path="/libro" element={<LibrosPage />} />
          <Route path="/cubiculo" element={<Cubiculos />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
