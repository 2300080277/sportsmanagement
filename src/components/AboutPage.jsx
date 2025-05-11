// src/components/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaChartLine, FaCalendarAlt, FaTrophy, FaCogs } from 'react-icons/fa';

const About = () => {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Revolutionizing Sports Management</h1>
          <p style={styles.heroSubtitle}>
            Powering over 500+ teams worldwide with cutting-edge technology
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div style={styles.section}>
        <div style={styles.sectionContent}>
        <h2 style={{ ...styles.sectionTitle, color: '#2b6cb0' }}>Our Vision</h2>
        <p style={{ ...styles.sectionText, color: '#ffffff' }}>
            At SportsPro, we believe every team deserves professional-grade tools regardless of size.
            Our platform bridges the gap between amateur enthusiasm and professional organization.
          </p>
          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>10K+</div>
              <div style={styles.statLabel}>Active Players</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>500+</div>
              <div style={styles.statLabel}>Teams Managed</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>95%</div>
              <div style={styles.statLabel}>User Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ ...styles.section, backgroundColor: '#f8fafc' }}>
        <div style={styles.sectionContent}>
          <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} style={styles.featureCard}>
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureText}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div style={styles.section}>
        <div style={styles.sectionContent}>
        <h2 style={{ ...styles.sectionTitle, color: '#2b6cb0' }}>Meet our team</h2>
        <p style={{ ...styles.sectionText, color: '#ffffff' }}>
            Passionate sports enthusiasts and tech innovators working together to
            transform how teams operate.
          </p>
          <div style={styles.teamGrid}>
            {teamMembers.map((member) => (
              <div key={member.id} style={styles.teamCard}>
                <div style={styles.teamAvatar}></div>
                <h3 style={styles.teamName}>{member.name}</h3>
                <p style={styles.teamRole}>{member.role}</p>
                <p style={styles.teamBio}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ ...styles.section, backgroundColor: '#1a365d', color: 'white' }}>
        <div style={styles.sectionContent}>
          <h2 style={{ ...styles.sectionTitle, color: 'white' }}>Ready to Transform Your Team?</h2>
          <div style={styles.ctaButtons}>
            <Link to="/signup" style={styles.ctaPrimary}>
              Get Started Now
            </Link>
            <Link to="/contact" style={styles.ctaSecondary}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Data
const features = [
  {
    icon: <FaUsers size={32} color="#4299e1" />,
    title: "Team Management",
    description: "Comprehensive tools for roster management, player profiles, and team communication."
  },
  {
    icon: <FaChartLine size={32} color="#4299e1" />,
    title: "Advanced Analytics",
    description: "Real-time performance metrics and customizable reports for data-driven decisions."
  },
  {
    icon: <FaCalendarAlt size={32} color="#4299e1" />,
    title: "Smart Scheduling",
    description: "Automated scheduling that considers player availability and facility constraints."
  },
  {
    icon: <FaTrophy size={32} color="#4299e1" />,
    title: "Competition Tools",
    description: "Tournament brackets, league standings, and match tracking systems."
  },
  {
    icon: <FaCogs size={32} color="#4299e1" />,
    title: "Custom Workflows",
    description: "Tailor the platform to your team's specific needs and processes."
  }
];

const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "CEO & Founder",
    bio: "Former professional athlete with 10+ years in sports technology."
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "Lead Developer",
    bio: "Full-stack developer specializing in sports analytics platforms."
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Head of Design",
    bio: "Creates intuitive interfaces that coaches and players love."
  }
];

// Styles
const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#2d3748",
    lineHeight: 1.6,
  },
  hero: {
    position: 'relative',
    height: '60vh',
    minHeight: '400px',
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/stadium.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#1a365d' // Fallback color
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(26, 54, 93, 0.7)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '800px',
    padding: '0 2rem',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    fontWeight: '300',
    marginBottom: '2rem',
    opacity: 0.9,
  },
  section: {
    padding: '5rem 2rem',
  },
  sectionContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '600',
    color: '#1a365d',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  sectionText: {
    fontSize: '1.1rem',
    maxWidth: '800px',
    margin: '0 auto 3rem',
    textAlign: 'center',
    color: '#4a5568',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '3rem',
    flexWrap: 'wrap',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    minWidth: '200px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1a365d',
    marginBottom: '0.5rem',
  },
  statLabel: {
    fontSize: '1rem',
    color: '#718096',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  featureIcon: {
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  featureTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1a365d',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  featureText: {
    color: '#4a5568',
    textAlign: 'center',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    marginTop: '3rem',
  },
  teamCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',  // Reduced from 2rem
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    textAlign: 'center',
    maxWidth: '240px',  // Optional: Constrain max width
    margin: '0 auto',   // Center the card
  },

  teamAvatar: {
    width: '80px',      // Reduced from 120px
    height: '80px',     // Reduced from 120px
    borderRadius: '50%',
    backgroundColor: '#e2e8f0',
    margin: '0 auto 1rem', // Reduced bottom margin
    backgroundSize: 'cover',
  },

  teamName: {
    fontSize: '1.1rem', // Slightly smaller font
    fontWeight: '600',
    color: '#1a365d',
    marginBottom: '0.3rem', // Tighter spacing
  },

  teamRole: {
    color: '#4299e1',
    fontWeight: '500',
    marginBottom: '0.8rem', // Reduced spacing
    fontSize: '0.9rem',     // Smaller font
  },

  teamBio: {
    color: '#4a5568',
    fontSize: '0.85rem',    // Smaller font
    lineHeight: '1.4',      // Tighter line height
  },
  ctaButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '2rem',
  },
  ctaPrimary: {
    backgroundColor: '#4299e1',
    color: 'white',
    padding: '0.75rem 2rem',
    borderRadius: '4px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  },
  ctaSecondary: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: '0.75rem 2rem',
    borderRadius: '4px',
    fontWeight: '600',
    border: '2px solid white',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  }
};

export default About;