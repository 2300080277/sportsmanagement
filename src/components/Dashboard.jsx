import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#1a365d", "#2b6cb0", "#4299e1", "#63b3ed"];

const Dashboard = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [positionData, setPositionData] = useState([]);

  const fetchData = async () => {
    const teamRes = await fetch("http://localhost:5000/teams");
    const playerRes = await fetch("http://localhost:5000/players");
    const teamData = await teamRes.json();
    const playerData = await playerRes.json();

    setTeams(teamData);
    setPlayers(playerData);

    const positionCounts = {};
    playerData.forEach(p => {
      positionCounts[p.position] = (positionCounts[p.position] || 0) + 1;
    });

    const formattedData = Object.entries(positionCounts).map(([position, count]) => ({
      name: position,
      value: count,
    }));
    setPositionData(formattedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>
      <div style={styles.grid}>
        <div style={styles.card}>
          <h2>Total Teams</h2>
          <p style={styles.number}>{teams.length}</p>
        </div>
        <div style={styles.card}>
          <h2>Total Players</h2>
          <p style={styles.number}>{players.length}</p>
        </div>
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Player Distribution by Position</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={positionData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {positionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={styles.recentBox}>
        <h3 style={styles.recentTitle}>Recently Added Players</h3>
        <ul style={styles.recentList}>
          {players.slice(-5).reverse().map((p) => (
            <li key={p.id} style={styles.listItem}>
              {p.name} - {p.position} ({p.age} yrs)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1100px",
    margin: "0 auto",
    color: "#1a202c",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  card: {
    background: "#edf2f7",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    textAlign: "center",
  },
  number: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#2b6cb0",
  },
  chartCard: {
    background: "#f7fafc",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  chartTitle: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  recentBox: {
    marginTop: "2rem",
    background: "#f7fafc",
    padding: "1rem",
    borderRadius: "8px",
  },
  recentTitle: {
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
    color: "#2d3748",
  },
  recentList: {
    listStyle: "none",
    paddingLeft: 0,
  },
  listItem: {
    padding: "0.5rem 0",
    borderBottom: "1px solid #e2e8f0",
  },
};

export default Dashboard;
