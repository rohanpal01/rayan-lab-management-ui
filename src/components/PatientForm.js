import React, { useState } from "react";
import axios from "axios";

function PatientForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [examinedBy, setExaminedBy] = useState("");

  const createUniqueId = (patient) => {
  let name = patient.name || "";
  let mobile = patient.contact || "";

  // Clean name (remove spaces, uppercase)
  name = name.replace(/\s+/g, "").toUpperCase();

  // Take first 4 chars, pad if needed
  let namePart = name.substring(0, 4);
  if (namePart.length < 4) {
    namePart = namePart.padEnd(4, "X");
  }

  // Take first 4 digits of mobile
  let mobilePart = mobile.substring(0, 4);
  if (mobilePart.length < 4) {
    mobilePart = mobilePart.padEnd(4, "0");
  }

  return `PAT-${namePart}${mobilePart}-${Math.floor(Math.random() * 100)}`;
};

  const handleSubmit = async () => {
    const patientData = {
      name,
      age,
      gender,
      contact,
      address,
      examinedBy,
    };

    await axios.post("http://localhost:8080/patients", {
      ...patientData,
      uniquePatientId: createUniqueId(patientData),
    });
    alert("Patient registered!");
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
      transition: 'border-color 0.3s',
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
      transition: 'background-color 0.3s',
      marginTop: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🏥 RAYAN DIAGNOSTIC LAB</h1>
        <p style={styles.subtitle}>Register Patient</p>
      </div>
      
      <div style={styles.formContainer}>
        <div style={styles.formGroup}>
          <label style={styles.label}>👤 Patient Name</label>
          <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} style={styles.input} onFocus={(e) => e.target.style.borderColor = '#3498db'} onBlur={(e) => e.target.style.borderColor = '#ecf0f1'} />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>📅 Age</label>
          <input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} style={styles.input} onFocus={(e) => e.target.style.borderColor = '#3498db'} onBlur={(e) => e.target.style.borderColor = '#ecf0f1'} />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>⚧️ Gender</label>
          <input placeholder="Gender" value={gender} onChange={e => setGender(e.target.value)} style={styles.input} onFocus={(e) => e.target.style.borderColor = '#3498db'} onBlur={(e) => e.target.style.borderColor = '#ecf0f1'} />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>📞 Contact</label>
          <input placeholder="Contact Number" value={contact} onChange={e => setContact(e.target.value)} style={styles.input} onFocus={(e) => e.target.style.borderColor = '#3498db'} onBlur={(e) => e.target.style.borderColor = '#ecf0f1'} />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>📍 Address</label>
          <input placeholder="Full Address" value={address} onChange={e => setAddress(e.target.value)} style={styles.input} onFocus={(e) => e.target.style.borderColor = '#3498db'} onBlur={(e) => e.target.style.borderColor = '#ecf0f1'} />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>👨‍⚕️ Examined By</label>
          <input placeholder="Doctor/Technician Name" value={examinedBy} onChange={e => setExaminedBy(e.target.value)} style={styles.input} onFocus={(e) => e.target.style.borderColor = '#3498db'} onBlur={(e) => e.target.style.borderColor = '#ecf0f1'} />
        </div>
        
        <button onClick={handleSubmit} style={styles.button} onMouseOver={(e) => e.target.style.backgroundColor = '#229954'} onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}>✓ Register Patient</button>
      </div>
    </div>
  );
}

export default PatientForm;