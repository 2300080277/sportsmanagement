import React, { useState, useEffect } from "react";
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [userRole, setUserRole] = useState(null); // Store user's role
  const navigate = useNavigate(); // Use navigate for redirection

  // Check for login status on component mount
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setIsLoggedIn(true);
      setUserRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserRole(null);
    setEmail("");
    setPassword("");
    // Redirect to the home page or login page after logout
    navigate('/'); // Redirect to home
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (response.ok) {
        const message = await response.text();
        localStorage.setItem('role', role);
        setIsLoggedIn(true);
        setUserRole(role);
        alert("✅ Login Successful: " + message);

        if (role === 'admin') {
          navigate('/dashboard-admin'); // Redirect to admin dashboard if admin
        } else {
          navigate('/dashboard'); // Redirect to user dashboard if user
        }
      } else {
        const errorText = await response.text();
        alert("❌ Login Failed: " + errorText);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("🚨 Something went wrong while logging in.");
    }
  };

  if (isLoggedIn) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.loginBox}>
          <h1 style={styles.title}>You are logged in as {userRole}</h1>
          <button style={styles.loginButton} onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>Welcome Back!</h1>
        <p style={styles.subtitle}>
          Enter your email and password below.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              style={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              style={styles.input}
              placeholder="Enter your password"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Login As</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={styles.dropdown}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <p style={styles.forgotLink}>
            <a href="/forgot" style={styles.link}>
              Forgot your email or password?
            </a>
          </p>

          <button type="submit" style={styles.loginButton}>
            Log In
          </button>
        </form>

        <p style={styles.signupText}>
          Don't have an account?{" "}
          <a href="/signup" style={styles.link}>
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  loginBox: {
    width: "100%",
    maxWidth: "350px",
    marginBottom: "40px",
    padding: "25px",
    backgroundColor: "#ffffff",
    boxShadow: "0 10px 25px rgba(11, 9, 9, 0.1)",
    borderRadius: "8px",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    marginTop: "40px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "black",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    fontSize: "14px",
    marginBottom: "6px",
    display: "block",
  },
  input: {
    width: "85%",
    padding: "12px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  dropdown: {
    width: "85%",
    padding: "12px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#ffffff",
    color: "#000000",
    cursor: "pointer",
  },
  forgotLink: {
    fontSize: "14px",
    marginBottom: "15px",
  },
  loginButton: {
    width: "70%",
    padding: "12px",
    backgroundColor: "#4299e1",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: '20px'
  },
  signupText: {
    fontSize: "14px",
    marginTop: "15px",
    color: "#666",
  },
  link: {
    color: "#000",
    textDecoration: "underline",
  },
};

export default Login;
