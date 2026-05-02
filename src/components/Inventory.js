import API_BASE_URL from "../config/api";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Inventory() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [threshold, setThreshold] = useState("");

  useEffect(() => {
    axios.get(`${API_BASE_URL}/inventory`).then(res => setItems(res.data));
  }, []);

  const addItem = async () => {
    await axios.post(`${API_BASE_URL}/inventory`, {
      itemName,
      category,
      quantity,
      threshold
    });
    alert("Item added!");
  };

  const checkLowStock = async () => {
    const res = await axios.get(`${API_BASE_URL}/inventory/low-stock`);
    alert("Low stock items: " + res.data.map(i => i.itemName).join(", "));
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
    buttonGroup: {
      display: 'flex',
      gap: '10px',
      marginTop: '20px'
    },
    button: {
      flex: 1,
      padding: '12px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer'
    },
    checkButton: {
      backgroundColor: '#e74c3c'
    },
    itemGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    itemCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      borderLeft: '4px solid #9b59b6'
    },
    itemName: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '10px'
    },
    itemDetail: {
      fontSize: '14px',
      color: '#7f8c8d',
      marginBottom: '8px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🏥 RAYAN DIAGNOSTIC LAB</h1>
        <p style={styles.subtitle}>Inventory Management</p>
      </div>

      <div style={styles.formContainer}>
        <h2 style={{ color: '#2c3e50', marginTop: 0 }}>Add Inventory Item</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>📦 Item Name</label>
          <input placeholder="Item Name" value={itemName} onChange={e => setItemName(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>🏷️ Category</label>
          <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>📊 Quantity</label>
          <input placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>⚠️ Threshold</label>
          <input placeholder="Threshold" value={threshold} onChange={e => setThreshold(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.buttonGroup}>
          <button onClick={addItem} style={styles.button} onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'} onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}>+ Add Item</button>
          <button onClick={checkLowStock} style={{...styles.button, ...styles.checkButton}} onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'} onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}>⚠️ Check Low Stock</button>
        </div>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <h2 style={{ color: '#2c3e50' }}>Current Inventory</h2>
      </div>
      <div style={styles.itemGrid}>
        {items.map(i => (
          <div key={i.id} style={styles.itemCard}>
            <div style={styles.itemName}>{i.itemName}</div>
            <div style={styles.itemDetail}><strong>Category:</strong> {i.category}</div>
            <div style={styles.itemDetail}><strong>Quantity:</strong> {i.quantity}</div>
            <div style={styles.itemDetail}><strong>Threshold:</strong> {i.threshold}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;
