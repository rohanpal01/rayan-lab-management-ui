import React, { useState } from "react";
import axios from "axios";

function ResultEntry() {
  const [patientName, setPatientName] = useState("");
  const [testName, setTestName] = useState("");
  const [normalRange, setNormalRange] = useState("");
  const [resultRange, setResultRange] = useState("");
  const [remark, setRemark] = useState("");

  const addResult = async () => {
    await axios.post("http://localhost:8080/results/entry", {
      patientName,
      testName,
      normalRange,
      resultRange,
      remark,
    });
    alert("Result added!");
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
      margin: '0 auto',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    formGroup: {
      marginBottom: '20px'
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
      width: '100%',
      padding: '12px',
      backgroundColor: '#27ae60',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🏥 RAYAN DIAGNOSTIC LAB</h1>
        <p style={styles.subtitle}>Enter Test Result</p>
      </div>
      
      <div style={styles.formContainer}>
        <div style={styles.formGroup}>
          <label style={styles.label}>👤 Patient Name</label>
          <input placeholder="Patient Name" value={patientName} onChange={e => setPatientName(e.target.value)} style={styles.input} onFocus={(e) => e.target.style.borderColor = '#3498db'} onBlur={(e) => e.target.style.borderColor = '#ecf0f1'} />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>🧪 Test Name</label>
          <input placeholder="Test Name" value={testName} onChange={e => setTestName(e.target.value)} style={styles.input} onFocus={(e) => e.target.style.borderColor = '#3498db'} onBlur={(e) => e.target.style.borderColor = '#ecf0f1'} />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>📊 Normal Range</label>
          <input placeholder="Normal Range" value={normalRange} onChange={e => setNormalRange(e.target.value)} style={styles.input} onFocus={(e) => e.target.style.borderColor = '#3498db'} onBlur={(e) => e.target.style.borderColor = '#ecf0f1'} />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>📈 Result Range</label>
          <input placeholder="Result Range" value={resultRange} onChange={e => setResultRange(e.target.value)} style={styles.input} onFocus={(e) => e.target.style.borderColor = '#3498db'} onBlur={(e) => e.target.style.borderColor = '#ecf0f1'} />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>📝 Remark</label>
          <input placeholder="Remark" value={remark} onChange={e => setRemark(e.target.value)} style={styles.input} onFocus={(e) => e.target.style.borderColor = '#3498db'} onBlur={(e) => e.target.style.borderColor = '#ecf0f1'} />
        </div>
        
        <button onClick={addResult} style={styles.button} onMouseOver={(e) => e.target.style.backgroundColor = '#229954'} onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}>✓ Submit Result</button>
      </div>
    </div>
  );
}

export default ResultEntry;
