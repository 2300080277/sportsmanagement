const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection Pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "80277", // Change this to your MySQL password
  database: "sportsdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// JWT Config
const JWT_SECRET = "your_secure_jwt_secret_key";
const JWT_EXPIRES_IN = "1h";

// DB connection test
pool.getConnection()
  .then((conn) => {
    console.log("✅ Connected to MySQL DB - sportsdb");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });

/**
 * 🧑‍💼 Admin Signup
 */
app.post("/admin/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [existing] = await pool.execute("SELECT * FROM admin WHERE email = ?", [email]);

    if (existing.length > 0) {
      return res.status(409).json({ error: "Admin already exists" });
    }

    const [result] = await pool.execute("INSERT INTO admin (username, email, password) VALUES (?, ?, ?)", [
      username,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: "Admin registered successfully", adminId: result.insertId });
  } catch (err) {
    console.error("Admin signup error:", err);
    res.status(500).json({ error: "Failed to register admin" });
  }
});

/**
 * 🔐 Admin Login
 */
app.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const [admins] = await pool.execute("SELECT * FROM admin WHERE email = ?", [email]);

    if (admins.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const admin = admins[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: "admin" },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: "admin",
      },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

/**
 * 🧑‍🤝‍🧑 Add Multiple Players
 */
app.post("/players", async (req, res) => {
  try {
    const players = req.body.players;

    if (!Array.isArray(players) || players.length === 0) {
      return res.status(400).json({ error: "Players array is required" });
    }

    const invalidPlayers = [];

    for (const player of players) {
      const { name, position, age, team_id } = player;

      // Validate individual player
      if (!name || !position || !age || !team_id || age <= 0) {
        invalidPlayers.push({ player, error: "All fields are required and age must be positive" });
      } else {
        // Insert valid player into the database
        try {
          await pool.execute(
            "INSERT INTO players (name, position, age, team_id) VALUES (?, ?, ?, ?)",
            [name, position, age, team_id]
          );
        } catch (err) {
          console.error("Error inserting player:", err);
          invalidPlayers.push({ player, error: "Failed to add player to the database" });
        }
      }
    }

    if (invalidPlayers.length > 0) {
      return res.status(400).json({
        message: "Some players were not added due to validation errors",
        invalidPlayers
      });
    }

    res.status(201).json({ message: "Players added successfully" });
  } catch (err) {
    console.error("Error adding players:", err);
    res.status(500).json({ error: "Failed to add players" });
  }
});

/**
 * 👥 Get Players by Team
 */
app.get("/players/:teamId", async (req, res) => {
  try {
    const teamId = req.params.teamId;

    if (!teamId) {
      return res.status(400).json({ error: "Team ID is required" });
    }

    const [players] = await pool.execute("SELECT * FROM players WHERE team_id = ?", [teamId]);

    res.status(200).json(players);
  } catch (err) {
    console.error("Error fetching players:", err);
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

/**
 * 👤 User Login
 */
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email?.trim();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const [users] = await pool.execute("SELECT * FROM user WHERE email = ?", [email]);

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: "user" },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: "User login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: "user",
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

/**
 * 🏆 Get All Teams and their Players
 */
app.get("/teams", async (req, res) => {
  try {
    // Query the database to get all teams
    const [teams] = await pool.execute("SELECT * FROM teams");

    // Fetch players for each team
    const teamsWithPlayers = await Promise.all(teams.map(async (team) => {
      const [players] = await pool.execute("SELECT * FROM players WHERE team_id = ?", [team.id]);
      return { ...team, players };
    }));

    // Respond with the list of teams and players
    res.status(200).json(teamsWithPlayers);
  } catch (err) {
    console.error("Error fetching teams:", err);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});

/**
 * ➕ Add a New Team
 */
app.post("/teams", async (req, res) => {
  try {
    const { name, city, coach } = req.body;

    if (!name || !city || !coach) {
      return res.status(400).json({ error: "Name, city, and coach are required" });
    }

    const [result] = await pool.execute("INSERT INTO teams (name, city, coach) VALUES (?, ?, ?)", [
      name,
      city,
      coach,
    ]);

    res.status(201).json({ message: "Team added successfully", teamId: result.insertId });
  } catch (err) {
    console.error("Error adding team:", err);
    res.status(500).json({ error: "Failed to add team" });
  }
});

/**
 * 🌡️ Health Check
 */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", database: "sportsdb" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
