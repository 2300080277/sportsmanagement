import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isAdmin = localStorage.getItem('isAdmin');
  console.log("isAdmin:", isAdmin); // Debugging line to check the value of isAdmin
  
  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        {/* Logo/Brand */}
        <Link to="/" style={styles.logoLink}>
          <h1 style={styles.logo}>Sports Management</h1>
        </Link>
        
        {/* Main Navigation */}
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/about" style={styles.link}>About</Link>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/teams" style={styles.link}>Teams</Link>
          <Link to="/players" style={styles.link}>Players</Link>
          <Link to="/schedule" style={styles.scheduleLink}>Schedule</Link>
          
          {/* Conditional Admin Link (if logged in as admin) */}
          {isAdmin === 'true' && (
            <Link to="/dashboard-admin" style={styles.link}>Admin</Link>
          )}
        </div>
        
        {/* Auth Links */}
        <div style={styles.authLinks}>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/signup" style={styles.signupLink}>Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#1a365d',
    color: 'white',
    padding: '1rem 2rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoLink: {
    textDecoration: 'none',
  },
  logo: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
  },
  links: {
    display: 'flex',
    gap: '2rem',
  },
  link: {
    color: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white for regular links
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    ':hover': {
      color: 'white', // Full white on hover
    },
  },
  scheduleLink: {
    color: 'white', // Solid white for Schedule
    textDecoration: 'none',
    fontWeight: '600', // Slightly bolder
    fontSize: '1rem',
    position: 'relative',
    transition: 'all 0.3s ease',
    ':hover': {
      color: 'white',
    },
    // Optional: Add a subtle underline effect
    '::after': {
      content: '""',
      position: 'absolute',
      bottom: '-2px',
      left: 0,
      width: '100%',
      height: '2px',
      backgroundColor: 'white',
    }
  },
  authLinks: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  signupLink: {
    backgroundColor: '#4299e1',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#3182ce',
    },
  },
};

export default Navbar;
