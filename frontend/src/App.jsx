import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import React from "react";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UploadPage from "./pages/UploadPage";
import DashboardPage from "./pages/DashboardPage";
import InvoiceDetailsPage from "./pages/InvoiceDetailsPage";

function PrivateRoute({ children }) {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <PrivateRoute>
                <UploadPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoice/:id"
            element={
              <PrivateRoute>
                <InvoiceDetailsPage />
              </PrivateRoute>
            }
          />

          {/* Catch-all → redirect to dashboard if logged in, else login */}
          <Route
            path="*"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
