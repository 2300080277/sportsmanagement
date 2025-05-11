import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiCalendar, FiHome, FiLogOut } from 'react-icons/fi';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md px-6 py-8 flex flex-col">
        <h2 className="text-2xl font-bold text-blue-600 mb-8 text-center">Admin Panel</h2>
        <nav className="flex-1 space-y-4">
          <Link to="/admin/dashboard" className="flex items-center text-gray-700 hover:text-blue-600 hover:scale-105 transition-all duration-300">
            <FiHome className="mr-2" /> Dashboard
          </Link>
          <Link to="/admin/manage-teams" className="flex items-center text-gray-700 hover:text-blue-600 hover:scale-105 transition-all duration-300">
            <FiUsers className="mr-2" /> Manage Teams
          </Link>
          <Link to="/admin/manage-players" className="flex items-center text-gray-700 hover:text-blue-600 hover:scale-105 transition-all duration-300">
            <FiUsers className="mr-2" /> Manage Players
          </Link>
          <Link to="/admin/schedule" className="flex items-center text-gray-700 hover:text-blue-600 hover:scale-105 transition-all duration-300">
            <FiCalendar className="mr-2" /> Match Schedule
          </Link>
        </nav>
        <div className="mt-8">
          <Link to="/" className="flex items-center text-red-600 hover:text-red-800 hover:scale-105 transition-all duration-300">
            <FiLogOut className="mr-2" /> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome Admin</h1>
          <span className="text-sm text-gray-500">Today: {new Date().toLocaleDateString()}</span>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <h3 className="text-lg font-semibold mb-2">Total Teams</h3>
            <p className="text-3xl text-blue-600 font-bold">12</p>
          </div>
          <div className="bg-white p-6 rounded shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <h3 className="text-lg font-semibold mb-2">Registered Players</h3>
            <p className="text-3xl text-green-600 font-bold">58</p>
          </div>
          <div className="bg-white p-6 rounded shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <h3 className="text-lg font-semibold mb-2">Upcoming Matches</h3>
            <p className="text-3xl text-orange-600 font-bold">3</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
