import API_BASE_URL from "../config/api";
import React from "react";

function Receipt({ invoice }) {
  const styles = {
    container: {
      padding: '30px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    },
    receiptBox: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '40px',
      maxWidth: '600px',
      margin: '0 auto',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '2px solid #2c3e50'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
      paddingBottom: '20px',
      borderBottom: '3px solid #2c3e50'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#2c3e50',
      margin: '0'
    },
    subtitle: {
      fontSize: '12px',
      color: '#7f8c8d',
      margin: '5px 0 0 0'
    },
    receiptBody: {
      marginBottom: '20px'
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid #ecf0f1'
    },
    label: {
      fontWeight: 'bold',
      color: '#2c3e50',
      fontSize: '14px'
    },
    value: {
      color: '#34495e',
      fontSize: '14px'
    },
    amountRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '15px 0',
      borderTop: '2px solid #2c3e50',
      marginTop: '10px'
    },
    amountLabel: {
      fontWeight: 'bold',
      color: '#2c3e50',
      fontSize: '18px'
    },
    amountValue: {
      fontWeight: 'bold',
      color: '#27ae60',
      fontSize: '18px'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '6px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold',
      backgroundColor: '#27ae60',
      color: 'white'
    },
    footer: {
      textAlign: 'center',
      marginTop: '30px',
      paddingTop: '20px',
      borderTop: '1px solid #ecf0f1',
      fontSize: '12px',
      color: '#7f8c8d'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.receiptBox}>
        <div style={styles.header}>
          <h1 style={styles.title}>🏥 RAYAN DIAGNOSTIC LAB</h1>
          <p style={styles.subtitle}>Receipt / Invoice</p>
        </div>
        
        <div style={styles.receiptBody}>
          <div style={styles.row}>
            <span style={styles.label}>📋 Invoice ID:</span>
            <span style={styles.value}>{invoice?.id || 'N/A'}</span>
          </div>
          
          <div style={styles.row}>
            <span style={styles.label}>👤 Patient ID:</span>
            <span style={styles.value}>{invoice?.patientId || 'N/A'}</span>
          </div>
          
          <div style={styles.row}>
            <span style={styles.label}>🧪 Test ID:</span>
            <span style={styles.value}>{invoice?.testId || 'N/A'}</span>
          </div>
          
          <div style={styles.row}>
            <span style={styles.label}>📅 Date:</span>
            <span style={styles.value}>{invoice?.createdAt || 'N/A'}</span>
          </div>
          
          <div style={styles.row}>
            <span style={styles.label}>Status:</span>
            <span style={styles.statusBadge}>{invoice?.status?.toUpperCase() || 'N/A'}</span>
          </div>
          
          <div style={styles.amountRow}>
            <span style={styles.amountLabel}>💰 Total Amount:</span>
            <span style={styles.amountValue}>₹{invoice?.amount || '0'}</span>
          </div>
        </div>
        
        <div style={styles.footer}>
          <p>Thank you for using RAYAN DIAGNOSTIC LAB</p>
          <p>For inquiries, contact: support@rayanlabs.com</p>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
