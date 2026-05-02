import API_BASE_URL from "../config/api";
import React, { useState, useEffect } from "react";
import axios from "axios";

function SampleTracking() {
  const [samples, setSamples] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [testId, setTestId] = useState("");
  const [sampleType, setSampleType] = useState("");

  useEffect(() => {
    axios.get(`${API_BASE_URL}/samples`).then(res => setSamples(res.data));
  }, []);

  const addSample = async () => {
    await axios.post(`${API_BASE_URL}/samples`, {
      patientId,
      testId,
      sampleType
    });
    alert("Sample added!");
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${API_BASE_URL}/samples/${id}/status`, { status });
    alert("Status updated!");
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
    formContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '30px',
      maxWidth: '600px',
      margin: '0 auto 40px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold',
      color: '#2c3e50'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '2px solid #ecf0f1',
      borderRadius: '5px',
      fontSize: '14px',
      boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif'
    },
    button: {
      padding: '10px 16px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginRight: '10px'
    },
    submitButton: {
      width: '100%',
      marginTop: '20px'
    },
    sampleGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    sampleCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      borderLeft: '4px solid #16a085'
    },
    sampleId: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '10px'
    },
    sampleDetail: {
      fontSize: '14px',
      color: '#7f8c8d',
      marginBottom: '8px'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold',
      marginBottom: '10px',
      backgroundColor: '#f39c12',
      color: 'white'
    },
    actionButtons: {
      display: 'flex',
      gap: '10px',
      marginTop: '15px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🏥 RAYAN DIAGNOSTIC LAB</h1>
        <p style={styles.subtitle}>Sample Tracking</p>
      </div>

      <div style={styles.formContainer}>
        <h2 style={{ color: '#2c3e50', marginTop: 0 }}>Add Sample</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>👤 Patient ID</label>
          <input placeholder="Patient ID" value={patientId} onChange={e => setPatientId(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>🧪 Test ID</label>
          <input placeholder="Test ID" value={testId} onChange={e => setTestId(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>🧬 Sample Type</label>
          <input placeholder="Sample Type" value={sampleType} onChange={e => setSampleType(e.target.value)} style={styles.input} />
        </div>
        <button onClick={addSample} style={{...styles.button, ...styles.submitButton}} onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'} onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}>+ Add Sample</button>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <h2 style={{ color: '#2c3e50' }}>Sample List</h2>
      </div>
      <div style={styles.sampleGrid}>
        {samples.map(s => (
          <div key={s.id} style={styles.sampleCard}>
            <div style={styles.sampleId}>Sample #{s.id}</div>
            <div style={styles.sampleDetail}><strong>Patient ID:</strong> {s.patientId}</div>
            <div style={styles.sampleDetail}><strong>Test ID:</strong> {s.testId}</div>
            <div style={styles.sampleDetail}><strong>Sample Type:</strong> {s.sampleType}</div>
            <div style={styles.statusBadge}>{s.status?.toUpperCase()}</div>
            <div style={styles.actionButtons}>
              <button 
                onClick={() => updateStatus(s.id, "processing")} 
                style={{...styles.button, backgroundColor: '#f39c12'}} 
                onMouseOver={(e) => e.target.style.backgroundColor = '#d68910'} 
                onMouseOut={(e) => e.target.style.backgroundColor = '#f39c12'}
              >
                ⏳ Processing
              </button>
              <button 
                onClick={() => updateStatus(s.id, "completed")} 
                style={{...styles.button, backgroundColor: '#27ae60'}} 
                onMouseOver={(e) => e.target.style.backgroundColor = '#229954'} 
                onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
              >
                ✓ Completed
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SampleTracking;
