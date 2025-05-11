import React, { useState, useEffect } from "react";

const Players = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    position: "",
    age: "",
    team_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await fetch("http://localhost:5000/teams");
      if (!res.ok) throw new Error("Failed to fetch teams");
      const data = await res.json();
      setTeams(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchPlayers = async (teamId) => {
    if (!teamId) return setPlayers([]);
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/players/${teamId}`);
      if (!res.ok) throw new Error("Failed to fetch players");
      const data = await res.json();
      setPlayers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    const { name, position, age, team_id } = form;

    if (!name || !position || !age || !team_id) {
      return alert("All fields are required.");
    }

    if (age <= 0 || isNaN(age)) {
      return alert("Age must be a positive number.");
    }

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, age: parseInt(age) }),
      });

      if (!res.ok) throw new Error("Failed to add player");

      setForm({ ...form, name: "", position: "", age: "" }); // Clear only relevant fields
      fetchPlayers(team_id);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTeamSelect = (e) => {
    const teamId = e.target.value;
    setSelectedTeam(teamId);
    setForm((prev) => ({ ...prev, team_id: teamId }));
    fetchPlayers(teamId);
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[+]?\d+$/.test(value)) {
      setForm({ ...form, age: value });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add Player</h2>
      <form onSubmit={handleAddPlayer} style={styles.form}>
        <select
          value={form.team_id}
          onChange={(e) => setForm({ ...form, team_id: e.target.value })}
          style={styles.select}
          required
        >
          <option value="">Select Team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={styles.input}
          required
        />
        <input
          placeholder="Position"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          style={styles.input}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleAgeChange}
          style={styles.input}
          required
          min="1"
        />
        <button
          type="submit"
          style={{
            ...styles.button,
            backgroundColor: submitting ? "#90cdf4" : "#4299e1",
          }}
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Player"}
        </button>
      </form>

      <h3 style={styles.subtitle}>Players in Team</h3>
      <select
        value={selectedTeam}
        onChange={handleTeamSelect}
        style={styles.select}
      >
        <option value="">Select Team</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>

      {loading ? (
        <p style={styles.message}>Loading players...</p>
      ) : error ? (
        <p style={styles.message}>Error: {error}</p>
      ) : players.length === 0 && selectedTeam ? (
        <p style={styles.message}>No players found for this team.</p>
      ) : (
        <ul style={styles.list}>
          {players.map((player) => (
            <li key={player.id} style={styles.listItem}>
              {player.name} - {player.position} ({player.age} yrs)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "2rem",
    background: "#ffffff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    borderRadius: "8px",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
    color: "#2d3748",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: "1.4rem",
    marginTop: "2rem",
    color: "#2d3748",
    fontWeight: "500",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "2rem",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    color: "#4a5568",
    width: "100%",
  },
  select: {
    padding: "0.75rem",
    fontSize: "1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    color: "#4a5568",
    width: "100%",
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#4299e1",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "150px",
    alignSelf: "flex-start",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    marginTop: "1rem",
  },
  listItem: {
    padding: "0.75rem",
    borderBottom: "1px solid #edf2f7",
    marginBottom: "0.5rem",
    color: "#4a5568",
  },
  message: {
    color: "#718096",
    fontStyle: "italic",
    marginTop: "1rem",
  },
};

export default Players;
