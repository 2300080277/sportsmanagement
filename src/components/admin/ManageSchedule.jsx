import React, { useState } from 'react';

const ManageSchedule = () => {
  const [schedule, setSchedule] = useState([
    { id: 1, team1: 'Warriors', team2: 'Strikers', date: '2025-05-15', time: '16:00', location: 'Home Stadium' },
    { id: 2, team1: 'Lions', team2: 'Tigers', date: '2025-05-20', time: '19:00', location: 'Away Arena' }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newMatch, setNewMatch] = useState({ team1: '', team2: '', date: '', time: '', location: '' });

  const handleAddMatch = (e) => {
    e.preventDefault();
    if (!newMatch.team1 || !newMatch.team2 || !newMatch.date || !newMatch.time || !newMatch.location) return;

    const newId = schedule.length ? schedule[schedule.length - 1].id + 1 : 1;
    setSchedule([...schedule, { ...newMatch, id: newId }]);
    setNewMatch({ team1: '', team2: '', date: '', time: '', location: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setSchedule(schedule.filter(match => match.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Schedule</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + Add Match
        </button>
      </div>

      {/* Schedule Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="p-4">#</th>
              <th className="p-4">Team 1</th>
              <th className="p-4">Team 2</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Location</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((match, index) => (
              <tr key={match.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{match.team1}</td>
                <td className="p-4">{match.team2}</td>
                <td className="p-4">{match.date}</td>
                <td className="p-4">{match.time}</td>
                <td className="p-4">{match.location}</td>
                <td className="p-4 space-x-2">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button
                    onClick={() => handleDelete(match.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Match Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Match</h3>
            <form onSubmit={handleAddMatch}>
              <div className="mb-3">
                <label className="block text-sm mb-1">Team 1</label>
                <input
                  type="text"
                  value={newMatch.team1}
                  onChange={(e) => setNewMatch({ ...newMatch, team1: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm mb-1">Team 2</label>
                <input
                  type="text"
                  value={newMatch.team2}
                  onChange={(e) => setNewMatch({ ...newMatch, team2: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm mb-1">Date</label>
                <input
                  type="date"
                  value={newMatch.date}
                  onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm mb-1">Time</label>
                <input
                  type="time"
                  value={newMatch.time}
                  onChange={(e) => setNewMatch({ ...newMatch, time: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Location</label>
                <input
                  type="text"
                  value={newMatch.location}
                  onChange={(e) => setNewMatch({ ...newMatch, location: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                  Add Match
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSchedule;