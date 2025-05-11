// src/components/Footer.jsx
import React from "react";
const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.footerText}>
        © {new Date().getFullYear()} Sports Management System. All rights reserved.
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#1a365d',
    color: 'white',
    textAlign: 'center',
  },
  footerText: {
    margin: 0,
    fontSize: '1rem',
  },
};

export default Footer;
