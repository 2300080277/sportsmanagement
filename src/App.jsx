import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Teams from './components/teams';
import Players from './components/Players';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import Schedule from './components/Schedule';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';

// Admin management components (create these files if not already made)
import ManageTeams from './components/admin/ManageTeams';
import ManagePlayers from './components/admin/ManagePlayers';
import ManageSchedule from './components/admin/ManageSchedule';

const App = () => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 120px)' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/players" element={<Players />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute allowedRole="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/manage-teams"
            element={
              <PrivateRoute allowedRole="admin">
                <ManageTeams />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/manage-players"
            element={
              <PrivateRoute allowedRole="admin">
                <ManagePlayers />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/schedule"
            element={
              <PrivateRoute allowedRole="admin">
                <ManageSchedule />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
