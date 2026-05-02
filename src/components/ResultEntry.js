import React, { useState, useEffect } from "react";
import axios from "axios";

function ResultEntry() {

  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");

  const [tests, setTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [values, setValues] = useState({});
  const [remark, setRemark] = useState("");

  // ================= LOAD PATIENTS =================
  useEffect(() => {
    axios.get("http://localhost:8080/patients")
      .then(res => setPatients(res.data))
      .catch(err => console.error(err));
  }, []);

  // ================= LOAD TESTS =================
  useEffect(() => {
    axios.get("http://localhost:8080/tests")
      .then(res => setTests(res.data))
      .catch(err => console.error(err));
  }, []);

  // ================= ADD TEST =================
  const addTest = (testId) => {
    const test = tests.find(t => t.id == testId);
    if (!test) return;

    if (selectedTests.find(t => t.id === test.id)) return;

    setSelectedTests([...selectedTests, test]);

    const newValues = {};
    test.parameters.forEach(p => {
      newValues[p.paramId] = "";
    });

    setValues(prev => ({ ...prev, ...newValues }));
  };

  // ================= REMOVE TEST =================
  const removeTest = (testId) => {
    setSelectedTests(selectedTests.filter(t => t.id !== testId));
  };

  // ================= HANDLE VALUE =================
  const handleValueChange = (paramId, value) => {
    setValues({
      ...values,
      [paramId]: value
    });
  };

  // ================= SUBMIT =================
  const submitResult = async () => {
    if (!selectedPatientId) {
      alert("❌ Please select patient");
      return;
    }

    try {
      const payload = {
        patientId: selectedPatientId,   // ✅ FIXED
        remark,
        tests: selectedTests.map(test => ({
          testId: test.id,
          parameters: test.parameters.map(p => ({
            paramId: p.paramId,
            value: values[p.paramId] || ""
          }))
        }))
      };

      await axios.post("http://localhost:8080/results/entry", payload);

      alert("✅ Result Saved!");

      // RESET
      setSelectedPatientId("");
      setSelectedTests([]);
      setValues({});
      setRemark("");

    } catch (err) {
      console.error(err);
      alert("❌ Error saving result");
    }
  };

  // ================= UI =================
  const styles = {
    container: { padding: "30px", background: "#f5f5f5", minHeight: "100vh" },
    form: {
      background: "white",
      padding: "30px",
      maxWidth: "800px",
      margin: "auto",
      borderRadius: "8px"
    },
    input: { width: "100%", padding: "10px", marginBottom: "15px" },
    label: { fontWeight: "bold" },
    button: {
      padding: "12px",
      width: "100%",
      background: "#27ae60",
      color: "white",
      border: "none",
      borderRadius: "5px"
    },
    testBox: {
      border: "1px solid #ccc",
      padding: "15px",
      marginBottom: "15px"
    }
  };

  return (
    <div style={styles.container}>

      <h2 style={{ textAlign: "center" }}>🧾 Result Entry</h2>

      <div style={styles.form}>

        {/* ================= PATIENT SELECT ================= */}
        <label style={styles.label}>Select Patient</label>
        <select
          style={styles.input}
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
        >
          <option value="">-- Select Patient --</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.uniquePatientId})
            </option>
          ))}
        </select>

        {/* ================= ADD TEST ================= */}
        <label style={styles.label}>Add Test</label>
        <select
          style={styles.input}
          onChange={(e) => addTest(e.target.value)}
        >
          <option value="">-- Select Test --</option>
          {tests.map(t => (
            <option key={t.id} value={t.id}>
              {t.testName}
            </option>
          ))}
        </select>

        {/* ================= TESTS ================= */}
        {selectedTests.map(test => (
          <div key={test.id} style={styles.testBox}>

            <h3>{test.testName}</h3>

            {test.parameters.map(p => (
              <div key={p.paramId}>
                <label>{p.paramName} ({p.unit})</label>

                <input
                  style={styles.input}
                  value={values[p.paramId] || ""}
                  onChange={(e) =>
                    handleValueChange(p.paramId, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        ))}

        {/* ================= REMARK ================= */}
        <label style={styles.label}>Remark</label>
        <input
          style={styles.input}
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />

        <button onClick={submitResult} style={styles.button}>
          Save Result
        </button>

      </div>
    </div>
  );
}

export default ResultEntry;
