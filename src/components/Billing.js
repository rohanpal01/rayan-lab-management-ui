import React, { useState, useEffect } from "react";
import axios from "axios";

function Billing() {
  const [invoices, setInvoices] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [testId, setTestId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/billing/invoices").then(res => setInvoices(res.data));
  }, []);

  const createInvoice = async () => {
    await axios.post("http://localhost:8080/billing/invoice", {
      patientId,
      testId,
      amount
    });
    alert("Invoice created!");
  };

  const markPaid = async (id) => {
    await axios.put(`http://localhost:8080/billing/invoice/${id}/pay`);
    alert("Invoice marked as paid!");
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
      padding: '10px 20px',
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
    invoiceGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    invoiceCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      borderLeft: '4px solid #27ae60'
    },
    invoiceId: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '10px'
    },
    invoiceDetail: {
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
      marginBottom: '10px'
    },
    statusUnpaid: {
      backgroundColor: '#f39c12',
      color: 'white'
    },
    statusPaid: {
      backgroundColor: '#27ae60',
      color: 'white'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🏥 RAYAN DIAGNOSTIC LAB</h1>
        <p style={styles.subtitle}>Billing & Finance</p>
      </div>

      <div style={styles.formContainer}>
        <h2 style={{ color: '#2c3e50', marginTop: 0 }}>Create Invoice</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>👤 Patient ID</label>
          <input placeholder="Patient ID" value={patientId} onChange={e => setPatientId(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>🧪 Test ID</label>
          <input placeholder="Test ID" value={testId} onChange={e => setTestId(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>💰 Amount (₹)</label>
          <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} style={styles.input} />
        </div>
        <button onClick={createInvoice} style={{...styles.button, ...styles.submitButton}} onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'} onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}>✓ Create Invoice</button>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <h2 style={{ color: '#2c3e50' }}>Recent Invoices</h2>
      </div>
      <div style={styles.invoiceGrid}>
        {invoices.map(inv => (
          <div key={inv.id} style={styles.invoiceCard}>
            <div style={styles.invoiceId}>Invoice #{inv.id}</div>
            <div style={styles.invoiceDetail}><strong>Patient ID:</strong> {inv.patientId}</div>
            <div style={styles.invoiceDetail}><strong>Test ID:</strong> {inv.testId}</div>
            <div style={styles.invoiceDetail}><strong>Amount:</strong> ₹{inv.amount}</div>
            <span style={{...styles.statusBadge, ...(inv.status === 'unpaid' ? styles.statusUnpaid : styles.statusPaid)}}>
              {inv.status?.toUpperCase()}
            </span>
            {inv.status === "unpaid" && (
              <div>
                <button onClick={() => markPaid(inv.id)} style={styles.button} onMouseOver={(e) => e.target.style.backgroundColor = '#229954'} onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}>✓ Mark Paid</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Billing;
