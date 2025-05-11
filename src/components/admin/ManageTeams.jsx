import React, { useState } from 'react';

const ManageTeams = () => {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Warriors', coach: 'John Doe' },
    { id: 2, name: 'Strikers', coach: 'Jane Smith' }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: '', coach: '' });

  const handleAddTeam = (e) => {
    e.preventDefault();
    if (!newTeam.name || !newTeam.coach) return;

    const newId = teams.length ? teams[teams.length - 1].id + 1 : 1;
    setTeams([...teams, { ...newTeam, id: newId }]);
    setNewTeam({ name: '', coach: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setTeams(teams.filter(team => team.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Teams</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Team
        </button>
      </div>

      {/* Team Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="p-4">#</th>
              <th className="p-4">Team Name</th>
              <th className="p-4">Coach</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={team.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{team.name}</td>
                <td className="p-4">{team.coach}</td>
                <td className="p-4 space-x-2">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button
                    onClick={() => handleDelete(team.id)}
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

      {/* Add Team Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Team</h3>
            <form onSubmit={handleAddTeam}>
              <div className="mb-3">
                <label className="block text-sm mb-1">Team Name</label>
                <input
                  type="text"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Coach Name</label>
                <input
                  type="text"
                  value={newTeam.coach}
                  onChange={(e) => setNewTeam({ ...newTeam, coach: e.target.value })}
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
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTeams;
