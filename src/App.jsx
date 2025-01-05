import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home/Home";
import "./styles/global.css";
import { AuthProvider } from "./contexts/AuthContext";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Profile from "./pages/Profile/Profile";
import Combat from "./pages/Combat/Combat";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', width: '100%' }}>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/combat" element={<Combat />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </MainLayout>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App; 