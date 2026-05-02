import API_BASE_URL from "../config/api";
import React from "react";
import { Link } from "react-router-dom";

function TechnicianDashboard() {
  const styles = {
    container: {
      padding: '30px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      borderBottom: '3px solid #2c3e50'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#2c3e50',
      margin: '0 0 5px 0'
    },
    subtitle: {
      fontSize: '14px',
      color: '#7f8c8d',
      margin: '0',
      paddingBottom: '10px'
    },
    menuGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
      maxWidth: '900px',
      margin: '0 auto'
    },
    menuCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '30px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: 'left 4px solid #16a085',
      textAlign: 'center',
      transition: 'all 0.3s',
      cursor: 'pointer'
    },
    icon: {
      fontSize: '40px',
      marginBottom: '10px'
    },
    menuLink: {
      textDecoration: 'none',
      color: '#2c3e50',
      fontSize: '16px',
      fontWeight: 'bold',
      display: 'block'
    }
  };

  const menuItems = [
    { icon: '🧪', label: 'Test Catalog', path: '/tests' },
    { icon: '✍️', label: 'Enter Results', path: '/results/entry' },
    { icon: '📋', label: 'Track Samples', path: '/samples' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🏥 RAYAN DIAGNOSTIC LAB</h1>
        <p style={styles.subtitle}>Technician Dashboard</p>
      </div>
      
      <div style={styles.menuGrid}>
        {menuItems.map((item, idx) => (
          <Link 
            key={idx}
            to={item.path}
            style={styles.menuLink}
          >
            <div 
              style={styles.menuCard}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
                e.currentTarget.style.borderColor = '#117a65';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = '#16a085';
              }}
            >
              <div style={styles.icon}>{item.icon}</div>
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TechnicianDashboard;
