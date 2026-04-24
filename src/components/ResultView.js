import React, { useState, useEffect } from "react";
import axios from "axios";
import { generateLabReportPDF, downloadLabReportHTML } from "../utils/reportGenerator";

function ResultView() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/results/view")
      .then(res => {
        console.log('API Response:', res.data);
        setResults(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('API Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const verifyResult = async (id) => {
    await axios.put(`http://localhost:8080/results/${id}/verify`);
    alert("Result verified!");
  };

  const downloadReport = (result) => {
    // Open print dialog with formatted report
    generateLabReportPDF(result);
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
    labTitle: {
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
    resultCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #ecf0f1'
    },
    section: {
      marginBottom: '15px',
      lineHeight: '1.6'
    },
    label: {
      fontWeight: 'bold',
      color: '#2c3e50',
      marginRight: '5px',
      minWidth: '120px',
      display: 'inline-block'
    },
    value: {
      color: '#34495e'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold',
      marginLeft: '5px'
    },
    statusPending: {
      backgroundColor: '#f39c12',
      color: 'white'
    },
    statusCompleted: {
      backgroundColor: '#27ae60',
      color: 'white'
    },
    buttonGroup: {
      marginTop: '15px',
      display: 'flex',
      gap: '10px'
    },
    button: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '14px',
      transition: 'all 0.3s'
    },
    verifyButton: {
      backgroundColor: '#3498db',
      color: 'white'
    },
    downloadButton: {
      backgroundColor: '#27ae60',
      color: 'white'
    },
    loading: {
      textAlign: 'center',
      padding: '40px',
      fontSize: '18px',
      color: '#2c3e50'
    },
    error: {
      backgroundColor: '#e74c3c',
      color: 'white',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '20px'
    },
    noResults: {
      textAlign: 'center',
      padding: '40px',
      color: '#7f8c8d',
      fontSize: '16px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.labTitle}>🏥 RAYAN DIAGNOSTIC LAB</h1>
        <p style={styles.subtitle}>Laboratory Test Results</p>
      </div>

      {loading && <div style={styles.loading}>⏳ Loading results...</div>}
      {error && <div style={styles.error}>❌ Error: {error}</div>}
      {!Array.isArray(results) && <div style={styles.error}>⚠️ Results is not an array: {JSON.stringify(results)}</div>}
      
      {Array.isArray(results) && results.length === 0 && !loading && <div style={styles.noResults}>No results available</div>}

      {Array.isArray(results) && results.map(r => (
        <div key={r.id} style={styles.resultCard}>
          <div style={styles.section}>
            <span style={styles.label}>👤 Patient:</span>
            <span style={styles.value}>
              {r.patient?.name} | Age: {r.patient?.age} | {r.patient?.address} | {r.patient?.contact}
            </span>
          </div>

          <div style={styles.section}>
            <span style={styles.label}>👨‍⚕️ Examined By:</span>
            <span style={styles.value}>{r.patient?.examinedBy}</span>
          </div>

          <div style={styles.section}>
            <span style={styles.label}>🧪 Test:</span>
            <span style={styles.value}>
              {r.test?.testName} ({r.test?.sampleType})
            </span>
          </div>

          <div style={styles.section}>
            <span style={styles.label}>📊 Result:</span>
            <span style={styles.value}>
              {r.resultRange}
            </span>
          </div>

          <div style={styles.section}>
            <span style={styles.label}>📝 Remark:</span>
            <span style={styles.value}>
              {r.remark || 'No remarks'}
            </span>
          </div>

          <div style={styles.section}>
            <span style={styles.label}>Status:</span>
            <span style={{
              ...styles.statusBadge,
              ...(r.status === 'pending' ? styles.statusPending : styles.statusCompleted)
            }}>
              {r.status?.toUpperCase()}
            </span>
          </div>

          <div style={styles.buttonGroup}>
            <button
              onClick={() => verifyResult(r.id)}
              style={{ ...styles.button, ...styles.verifyButton }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
            >
              ✓ Verify Result
            </button>
            <button
              onClick={() => downloadReport(r)}
              style={{ ...styles.button, ...styles.downloadButton }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#229954'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
            >
              📥 Download Report
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultView;
