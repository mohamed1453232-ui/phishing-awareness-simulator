import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import AwarenessPage from "./pages/AwarenessPage";
import DashboardPage from "./pages/DashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/awareness" element={<AwarenessPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
