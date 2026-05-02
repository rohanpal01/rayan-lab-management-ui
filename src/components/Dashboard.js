import API_BASE_URL from "../config/api";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [dailyTests, setDailyTests] = useState(0);
  const [weeklyTests, setWeeklyTests] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [quality, setQuality] = useState(0);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/analytics/tests/daily`).then(res => setDailyTests(res.data));
    axios.get(`${API_BASE_URL}/analytics/tests/weekly`).then(res => setWeeklyTests(res.data));
    axios.get(`${API_BASE_URL}/analytics/revenue`).then(res => setRevenue(res.data));
    axios.get(`${API_BASE_URL}/analytics/quality`).then(res => setQuality(res.data));
  }, []);

  const data = {
    labels: ["Daily Tests", "Weekly Tests", "Revenue", "Quality %"],
    datasets: [
      {
        label: "Analytics",
        data: [dailyTests, weeklyTests, revenue, quality],
        backgroundColor: [
          "rgba(75,192,192,0.6)",
          "rgba(153,102,255,0.6)",
          "rgba(255,159,64,0.6)",
          "rgba(54,162,235,0.6)"
        ]
      }
    ]
  };

  const styles = {
    container: {
      padding: '30px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
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
    chartContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '30px',
      marginBottom: '30px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      maxWidth: '1000px',
      margin: '0 auto 30px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      maxWidth: '1000px',
      margin: '0 auto'
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '25px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      textAlign: 'center',
      borderTop: '4px solid #3498db'
    },
    statValue: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#2c3e50',
      margin: '10px 0'
    },
    statLabel: {
      fontSize: '14px',
      color: '#7f8c8d'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🏥 RAYAN DIAGNOSTIC LAB</h1>
        <p style={styles.subtitle}>Analytics Dashboard</p>
      </div>

      <div style={styles.chartContainer}>
        <h2 style={{ color: '#2c3e50', marginTop: 0 }}>📊 Performance Metrics</h2>
        <Bar data={data} />
      </div>

      <div style={styles.statsGrid}>
        <div style={{...styles.statCard, borderTopColor: '#3498db'}}>
          <div style={styles.statLabel}>📅 Daily Tests</div>
          <div style={styles.statValue}>{dailyTests}</div>
        </div>
        <div style={{...styles.statCard, borderTopColor: '#9b59b6'}}>
          <div style={styles.statLabel}>📈 Weekly Tests</div>
          <div style={styles.statValue}>{weeklyTests}</div>
        </div>
        <div style={{...styles.statCard, borderTopColor: '#e74c3c'}}>
          <div style={styles.statLabel}>💰 Revenue</div>
          <div style={styles.statValue}>₹{revenue}</div>
        </div>
        <div style={{...styles.statCard, borderTopColor: '#27ae60'}}>
          <div style={styles.statLabel}>✓ Quality Control</div>
          <div style={styles.statValue}>{quality}%</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
