import API_BASE_URL from "../config/api";
import React, { useState, useEffect } from "react";
import axios from "axios";

function TestCatalog() {
  const [tests, setTests] = useState([]);
  const [testName, setTestName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [parameters, setParameters] = useState([
  { paramName: "", unit: "", refMin: "", refMax: "", method: "" }
]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/tests`).then(res => setTests(res.data));
  }, []);

  const addTest = async () => {
    try {
      await axios.post(`${API_BASE_URL}/tests`, {
        testName,
        category,
        price: parseFloat(price),
        parameters // Convert to number for backend
      });
      alert("Test added!");
      // Refresh the tests list
      const res = await axios.get(`${API_BASE_URL}/tests`);
      setTests(res.data);
      // Clear form
      setTestName("");
      setCategory("");
      setPrice("");
    } catch (error) {
      alert("Failed to add test: " + error.message);
    }
  };

  const handleParamChange = (index, field, value) => {
  const updated = [...parameters];
  updated[index][field] = value;
  setParameters(updated);
};

const addParameter = () => {
  setParameters([
    ...parameters,
    { paramName: "", unit: "", refMin: "", refMax: "", method: "" }
  ]);
};

const removeParam = (index) => {
  const updated = parameters.filter((_, i) => i !== index);
  setParameters(updated);
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
      width: '100%',
      padding: '12px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '20px'
    },
    testGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    testCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      borderLeft: '4px solid #3498db'
    },
    testName: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '10px'
    },
    testDetail: {
      fontSize: '14px',
      color: '#7f8c8d',
      marginBottom: '8px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🏥 RAYAN DIAGNOSTIC LAB</h1>
        <p style={styles.subtitle}>Test Catalog Management</p>
      </div>

      <div style={styles.formContainer}>
        <h2 style={{ color: '#2c3e50', marginTop: 0 }}>Add New Test</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>🧪 Test Name</label>
          <input placeholder="Test Name" value={testName} onChange={e => setTestName(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>🧬 Category</label>
          <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>💰 Price (₹)</label>
          <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} style={styles.input} />
        </div>
        <h3 style={{ marginTop: '20px' }}>Parameters</h3>

  {parameters.map((p, index) => (
    <div key={index} style={{ marginBottom: '10px' }}>
      <input placeholder="Param Name"
        value={p.paramName}
        onChange={e => handleParamChange(index, "paramName", e.target.value)} />

      <input placeholder="Unit"
        value={p.unit}
        onChange={e => handleParamChange(index, "unit", e.target.value)} />

      <input placeholder="Ref Min"
        value={p.refMin}
        onChange={e => handleParamChange(index, "refMin", e.target.value)} />

      <input placeholder="Ref Max"
        value={p.refMax}
        onChange={e => handleParamChange(index, "refMax", e.target.value)} />

      <input placeholder="Method"
        value={p.method}
        onChange={e => handleParamChange(index, "method", e.target.value)} />

        {/* ✅ REMOVE BUTTON MUST BE HERE */}
    <button type="button" onClick={() => removeParam(index)}>
      ❌
    </button>
    </div>
  ))}

  <button type="button" onClick={addParameter}>
    + Add Parameter
  </button>
        <button onClick={addTest} style={styles.button} onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'} onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}>+ Add Test</button>
      </div>
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <h2 style={{ color: '#2c3e50' }}>Available Tests</h2>
      </div>
      <div style={styles.testGrid}>
        {tests.map(t => (
          <div key={t.id} style={styles.testCard}>
            <div style={styles.testName}>{t.testName}</div>
            <div style={styles.testDetail}><strong>Category:</strong> {t.category}</div>
            <div style={styles.testDetail}><strong>Price:</strong> ₹{t.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestCatalog;
