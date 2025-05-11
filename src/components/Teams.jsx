import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaPlus, 
  FaUsers,
  FaTimes
} from 'react-icons/fa';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: '',
    sport: 'basketball',
    coach: '',
  });

  // Mock data with sport-specific background images
  const mockTeams = [
    {
      id: 1,
      name: "Thunderbolts",
      sport: "basketball",
      players: Array(12).fill({}),
      coach: "Coach Johnson",
    },
    {
      id: 2,
      name: "Strikers FC",
      sport: "soccer",
      players: Array(18).fill({}),
      coach: "Coach Martinez",
    },
    {
      id: 3,
      name: "Diamond Kings",
      sport: "baseball",
      players: Array(15).fill({}),
      coach: "Coach Williams",
    },
    {
      id: 4,
      name: "Ice Breakers",
      sport: "hockey",
      players: Array(20).fill({}),
      coach: "Coach O'Reilly",
    }
  ];

  // Sport to image mapping
  const sportImages = {
    basketball: '/basketball.jpg',
    soccer: '/soccer.jpg',
    baseball: '/baseball.jpg',
    hockey: '/hockey.jpg'
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setTeams(mockTeams);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || team.sport === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAddTeam = (e) => {
    e.preventDefault();
    const newTeamWithId = {
      ...newTeam,
      id: teams.length + 1,
      players: [],
    };
    
    setTeams([...teams, newTeamWithId]);
    setShowModal(false);
    setNewTeam({
      name: '',
      sport: 'basketball',
      coach: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Styles
  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: '80vh',
    },
    header: {
      marginBottom: '30px',
    },
    title: {
      fontSize: '28px',
      color: '#1a365d',
      marginBottom: '15px',
    },
    controls: {
      display: 'flex',
      gap: '15px',
      marginTop: '20px',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    searchContainer: {
      position: 'relative',
      flex: 1,
      minWidth: '250px',
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#718096',
    },
    searchInput: {
      width: '100%',
      padding: '10px 15px 10px 40px',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      fontSize: '16px',
    },
    filterDropdown: {
      padding: '10px 15px',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      backgroundColor: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      minWidth: '180px',
    },
    addButton: {
      backgroundColor: '#4299e1',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '6px',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px',
      marginTop: '30px',
    },
    teamCard: (sport) => ({
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      textDecoration: 'none',
      color: 'white',
      border: '1px solid #e2e8f0',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${sportImages[sport]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      }
    }),
    teamInfo: {
      position: 'relative',
      zIndex: 1,
    },
    teamName: {
      fontSize: '22px',
      fontWeight: '600',
      margin: '0 0 10px 0',
      color: 'white',
      textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
    },
    teamSport: {
      color: 'rgba(255,255,255,0.9)',
      margin: '0 0 10px 0',
      fontSize: '16px',
      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
    },
    teamMeta: {
      color: 'rgba(255,255,255,0.9)',
      fontSize: '14px',
      margin: '0',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '8px',
      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      color: '#4a5568',
    },
    spinner: {
      border: '4px solid rgba(0, 0, 0, 0.1)',
      borderLeftColor: '#4299e1',
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      animation: 'spin 1s linear infinite',
      marginBottom: '16px',
    },
    noResults: {
      textAlign: 'center',
      padding: '40px 20px',
      backgroundColor: '#f7fafc',
      borderRadius: '8px',
      border: '1px dashed #cbd5e0',
      marginTop: '20px',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      width: '90%',
      maxWidth: '500px',
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    modalTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1a365d',
      margin: 0,
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#7f8c8d',
      padding: '4px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    formLabel: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500',
      color: '#4a5568',
    },
    formInput: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
    },
    formSelect: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
    },
    submitButton: {
      backgroundColor: '#4299e1',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: '500',
      width: '100%',
      fontSize: '16px',
      marginTop: '10px',
    },
  };

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <div style={styles.spinner}></div>
        <p>Loading teams...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Team Management</h2>
        <div style={styles.controls}>
          <div style={styles.searchContainer}>
            <FaSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search teams..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            style={styles.filterDropdown}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Sports</option>
            <option value="basketball">Basketball</option>
            <option value="soccer">Soccer</option>
            <option value="baseball">Baseball</option>
            <option value="hockey">Hockey</option>
          </select>
          
          <button 
            style={styles.addButton}
            onClick={() => setShowModal(true)}
          >
            <FaPlus /> Add Team
          </button>
        </div>
      </div>

      {filteredTeams.length === 0 ? (
        <div style={styles.noResults}>
          <p>No teams found matching your criteria.</p>
          <button 
            style={styles.addButton}
            onClick={() => setShowModal(true)}
          >
            <FaPlus /> Create a new team
          </button>
        </div>
      ) : (
        <div style={styles.teamGrid}>
          {filteredTeams.map(team => (
            <Link
              to={`/teams/${team.id}`}
              style={styles.teamCard(team.sport)}
              key={team.id}
            >
              <div style={styles.teamInfo}>
                <h3 style={styles.teamName}>{team.name}</h3>
                <p style={styles.teamSport}>
                  {team.sport.charAt(0).toUpperCase() + team.sport.slice(1)}
                </p>
                <p style={styles.teamMeta}>
                  <span>{team.players.length} players</span>
                  <span> • </span>
                  <span>{team.coach || 'No coach assigned'}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Add New Team</h3>
              <button 
                style={styles.closeButton}
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleAddTeam}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Team Name</label>
                <input
                  type="text"
                  name="name"
                  value={newTeam.name}
                  onChange={handleInputChange}
                  required
                  style={styles.formInput}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Sport</label>
                <select
                  name="sport"
                  value={newTeam.sport}
                  onChange={handleInputChange}
                  required
                  style={styles.formSelect}
                >
                  <option value="basketball">Basketball</option>
                  <option value="soccer">Soccer</option>
                  <option value="baseball">Baseball</option>
                  <option value="hockey">Hockey</option>
                  <option value="hockey">Cricket</option>
                  <option value="hockey">Badminton</option>
                  <option value="hockey">ice skating</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Coach</label>
                <input
                  type="text"
                  name="coach"
                  value={newTeam.coach}
                  onChange={handleInputChange}
                  required
                  style={styles.formInput}
                />
              </div>
              <button type="submit" style={styles.submitButton}>
                Create Team
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;