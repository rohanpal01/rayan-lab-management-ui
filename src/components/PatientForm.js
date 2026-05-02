import React, { useState } from "react";
import axios from "axios";

function PatientForm() {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [examinedBy, setExaminedBy] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ================= UNIQUE ID =================
  const createUniqueId = (patient) => {
    let name = patient.name || "";
    let mobile = patient.contact || "";

    name = name.replace(/\s+/g, "").toUpperCase();

    let namePart = name.substring(0, 4);
    if (namePart.length < 4) {
      namePart = namePart.padEnd(4, "X");
    }

    let mobilePart = mobile.substring(0, 4);
    if (mobilePart.length < 4) {
      mobilePart = mobilePart.padEnd(4, "0");
    }

    return `PAT-${namePart}${mobilePart}`;
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {

    setErrorMsg("");
    setSuccessMsg("");

    // 🔴 BASIC VALIDATION
    if (!name || !contact) {
      setErrorMsg("Name and Contact are required");
      return;
    }

    const patientData = {
      name,
      age,
      gender,
      contact,
      address,
      examinedBy,
    };

    try {
      await axios.post("http://localhost:8080/patients", {
        ...patientData,
        uniquePatientId: createUniqueId(patientData),
      });

      // ✅ SUCCESS
      setSuccessMsg("Patient registered successfully!");

      // RESET FORM
      setName("");
      setAge("");
      setGender("");
      setContact("");
      setAddress("");
      setExaminedBy("");

    } catch (err) {

      // ✅ BACKEND ERROR MESSAGE
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMsg(err.response.data.error);
      } else {
        setErrorMsg("Something went wrong");
      }

      console.error(err);
    }
  };

  // ================= STYLES =================
  const styles = {
    container: {
      padding: '30px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      fontFamily: 'Arial'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
      borderBottom: '3px solid #2c3e50'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#2c3e50'
    },
    formContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '30px',
      maxWidth: '600px',
      margin: '0 auto',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '2px solid #ecf0f1',
      borderRadius: '5px',
      marginBottom: '15px'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#27ae60',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer'
    },
    error: {
      color: "red",
      marginBottom: "15px",
      fontWeight: "bold"
    },
    success: {
      color: "green",
      marginBottom: "15px",
      fontWeight: "bold"
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <h1 style={styles.title}>🏥 RAYAN DIAGNOSTIC LAB</h1>
        <p>Register Patient</p>
      </div>

      <div style={styles.formContainer}>

        {/* ✅ ERROR MESSAGE */}
        {errorMsg && <div style={styles.error}>❌ {errorMsg}</div>}

        {/* ✅ SUCCESS MESSAGE */}
        {successMsg && <div style={styles.success}>✅ {successMsg}</div>}

        <input
          placeholder="Patient Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Age"
          value={age}
          onChange={e => setAge(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Gender"
          value={gender}
          onChange={e => setGender(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Contact Number"
          value={contact}
          onChange={e => setContact(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Examined By"
          value={examinedBy}
          onChange={e => setExaminedBy(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSubmit} style={styles.button}>
          Register Patient
        </button>

      </div>
    </div>
  );
}

export default PatientForm;