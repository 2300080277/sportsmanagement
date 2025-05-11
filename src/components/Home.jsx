import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      {/* Overlay */}
      <div style={styles.overlay}></div>

      {/* Main Content */}
      <div style={styles.hero}>
        <h1 style={styles.mainTitle}>Sports Management</h1>
        <h2 style={styles.heroTitle}>Welcome to Sports Management</h2>
        <p style={styles.heroText}>
          Streamline your sports organization with our comprehensive tools
        </p>
        
          
        </div>
      </div>
    
  );
};

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100vw',
    backgroundImage: "url('/sports-tools.jpg')", // Correct path from public folder
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    fontFamily: 'Arial, sans-serif',
    padding: '2rem',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 0,
  },
  hero: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '800px',
    width: '100%',
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  mainTitle: {
    fontSize: '4.5rem', // Increased size for the main header
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: '0.5rem',
  },
  heroTitle: {
    fontSize: '2.5rem', // Slightly larger than before
    fontWeight: '600',
    color: '#000000', // Changed to black
    marginBottom: '1rem',
  },
  heroText: {
    fontSize: '1.2rem',
    color: '#4a5568',
    marginBottom: '2rem',
  },
  
  
};

export default Home;
