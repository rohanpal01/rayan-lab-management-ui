import React, { useState, useEffect } from "react";
import axios from "axios";

function ResultEntry() {

  const [patientName, setPatientName] = useState("");
  const [tests, setTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [values, setValues] = useState({});
  const [remark, setRemark] = useState("");

  // Load tests
  useEffect(() => {
    axios.get("http://localhost:8080/tests")
      .then(res => setTests(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add test
  const addTest = (testId) => {
    const test = tests.find(t => t.id == testId);
    if (!test) return;

    // prevent duplicate
    if (selectedTests.find(t => t.id === test.id)) return;

    setSelectedTests([...selectedTests, test]);

    // initialize parameter values
    const newValues = {};
    test.parameters.forEach(p => {
      newValues[p.paramId] = "";
    });

    setValues(prev => ({ ...prev, ...newValues }));
  };

  // Remove test
  const removeTest = (testId) => {
    setSelectedTests(selectedTests.filter(t => t.id !== testId));
  };

  // Handle value change
  const handleValueChange = (paramId, value) => {
    setValues({
      ...values,
      [paramId]: value
    });
  };

  // Submit
  const submitResult = async () => {
    try {

      const payload = {
        patientName,
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

      // Reset
      setPatientName("");
      setSelectedTests([]);
      setValues({});
      setRemark("");

    } catch (err) {
      console.error(err);
      alert("❌ Error saving result");
    }
  };

  // Styles
  const styles = {
    container: {
      padding: '30px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      fontFamily: 'Arial'
    },
    form: {
      backgroundColor: 'white',
      padding: '30px',
      maxWidth: '800px',
      margin: '0 auto',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px'
    },
    label: {
      fontWeight: 'bold'
    },
    testBox: {
      border: '1px solid #ccc',
      padding: '15px',
      marginBottom: '15px',
      borderRadius: '6px',
      backgroundColor: '#fafafa'
    },
    paramBox: {
      marginBottom: '10px'
    },
    button: {
      marginTop: '20px',
      padding: '12px',
      width: '100%',
      backgroundColor: '#27ae60',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px'
    },
    removeBtn: {
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      cursor: 'pointer',
      marginBottom: '10px'
    }
  };

  return (
    <div style={styles.container}>

      <h2 style={{ textAlign: "center" }}>🧾 Result Entry</h2>

      <div style={styles.form}>

        {/* Patient */}
        <label style={styles.label}>Patient Name</label>
        <input
          style={styles.input}
          value={patientName}
          onChange={e => setPatientName(e.target.value)}
        />

        {/* Add Test */}
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

        {/* Selected Tests */}
        {selectedTests.map(test => (
          <div key={test.id} style={styles.testBox}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>{test.testName}</h3>
              <button
                style={styles.removeBtn}
                onClick={() => removeTest(test.id)}
              >
                Remove
              </button>
            </div>

            {/* Parameters */}
            {test.parameters.map(p => (
              <div key={p.paramId} style={styles.paramBox}>

                <label>
                  {p.paramName} ({p.unit})
                </label>

                <input
                  style={styles.input}
                  value={values[p.paramId] || ""}
                  onChange={(e) => handleValueChange(p.paramId, e.target.value)}
                />

                <small style={{ color: "gray" }}>
                  Ref: {p.refMin} - {p.refMax}
                </small>

              </div>
            ))}

          </div>
        ))}

        <label style={styles.label}>Remark</label>
        <input
        style={styles.input}
        placeholder="Enter remark"
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
        />

        {/* Submit */}
        <button onClick={submitResult} style={styles.button}>
          Save Result
        </button>

      </div>
    </div>
  );
}

export default ResultEntry;