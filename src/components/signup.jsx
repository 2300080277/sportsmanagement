import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signupImg from "./signup-bg.jpg"; // Make sure the image path is correct

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const msg = await response.text();
        console.log("Signup success:", msg);
        alert("✅ Signup successful! Please log in.");
        navigate("/login");
      } else {
        const errorText = await response.text();
        console.error("Signup failed:", response.status, errorText);
        alert("❌ Signup failed: " + errorText);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("🚨 Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.card}>
        <div style={styles.imageContainer}>
          <img src={signupImg} alt="Signup Visual" style={styles.image} />
        </div>
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Create Your Account</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              name="name"
              placeholder="Full Name"
              style={styles.input}
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              placeholder="Email"
              style={styles.input}
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              placeholder="Password"
              type="password"
              style={styles.input}
              value={form.password}
              onChange={handleChange}
              required
            />
            <button type="submit" style={styles.button}>Sign Up</button>
          </form>
          <p style={styles.loginText}>
            <span style={{ color: "#000" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#5a67d8" }}>Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  outerContainer: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
    padding: "1rem",
  },
  card: {
    display: "flex",
    width: "95%",
    maxWidth: "1000px",
    height: "80vh",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "#e0e0e0",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  formContainer: {
    flex: 1,
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
    color: "#1a365d",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    width: "75%",
    padding: "15px",
    marginBottom: "1rem",
    borderRadius: "4px",
    border: "1.5px solid #000",
    backgroundColor: "#fff",
    color: "#000",
    alignSelf: "center",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#4299e1",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.9rem",
    width: "120px",
    alignSelf: "center",
  },
  loginText: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    textAlign: "center",
  },
};

export default Signup;
