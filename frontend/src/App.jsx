import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Analyze from './pages/Analyze';
import Report from './pages/Report';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className={`min-h-screen bg-surface ${isHomePage ? '' : 'py-12'}`}>
      <div className={isHomePage ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-surface selection:bg-primary/30 selection:text-white">
          <Toaster 
            position="top-right" 
            toastOptions={{
              duration: 4000,
              style: {
                borderRadius: '16px',
                background: '#171f33',
                color: '#DAE2FD',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
              },
            }} 
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout><Dashboard /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/analyze"
              element={
                <ProtectedRoute>
                  <Layout><Analyze /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/report"
              element={
                <ProtectedRoute>
                  <Layout><Report /></Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
