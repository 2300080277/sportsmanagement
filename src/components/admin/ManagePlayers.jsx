
import React, { useState } from 'react';

const ManagePlayers = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Alice Johnson', position: 'Forward', team: 'Warriors' },
    { id: 2, name: 'Bob Williams', position: 'Guard', team: 'Strikers' }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState({ name: '', position: '', team: '' });

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (!newPlayer.name || !newPlayer.position || !newPlayer.team) return;

    const newId = players.length ? players[players.length - 1].id + 1 : 1;
    setPlayers([...players, { ...newPlayer, id: newId }]);
    setNewPlayer({ name: '', position: '', team: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Players</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Player
        </button>
      </div>

      {/* Player Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="p-4">#</th>
              <th className="p-4">Name</th>
              <th className="p-4">Position</th>
              <th className="p-4">Team</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{player.name}</td>
                <td className="p-4">{player.position}</td>
                <td className="p-4">{player.team}</td>
                <td className="p-4 space-x-2">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button
                    onClick={() => handleDelete(player.id)}
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

      {/* Add Player Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Player</h3>
            <form onSubmit={handleAddPlayer}>
              <div className="mb-3">
                <label className="block text-sm mb-1">Player Name</label>
                <input
                  type="text"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm mb-1">Position</label>
                <input
                  type="text"
                  value={newPlayer.position}
                  onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Team</label>
                <input
                  type="text"
                  value={newPlayer.team}
                  onChange={(e) => setNewPlayer({ ...newPlayer, team: e.target.value })}
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
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
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

export default ManagePlayers;