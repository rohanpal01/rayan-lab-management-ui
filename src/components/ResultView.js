import React, { useEffect, useState } from "react";
import axios from "axios";
import { generateLabReportPDF, downloadLabReportHTML } from "../utils/reportGenerator";

function ResultView() {

  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/results/view")
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, []);

  const verifyResult = async (id) => {
    await axios.put(`http://localhost:8080/results/${id}/verify`);
    alert("Result verified!");
  };

  const downloadPDF = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/results/${id}/report`,
      { responseType: "blob" } // VERY IMPORTANT
    );

     const blob = new Blob([res.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    // ✅ FIX: correct header access
    const contentDisposition = res.headers["content-disposition"];

    let fileName = "report.pdf";

    if (contentDisposition && contentDisposition.includes("filename=")) {
      fileName = contentDisposition
        .split("filename=")[1]
        .replace(/"/g, "")
        .trim();
    }

    link.setAttribute("download", fileName);

    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error(err);
  }
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
    labTitle: {
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
    resultCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #ecf0f1'
    },
    section: {
      marginBottom: '15px',
      lineHeight: '1.6'
    },
    label: {
      fontWeight: 'bold',
      color: '#2c3e50',
      marginRight: '5px',
      minWidth: '120px',
      display: 'inline-block'
    },
    value: {
      color: '#34495e'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold',
      marginLeft: '5px'
    },
    statusPending: {
      backgroundColor: '#f39c12',
      color: 'white'
    },
    statusCompleted: {
      backgroundColor: '#27ae60',
      color: 'white'
    },
    buttonGroup: {
      marginTop: '15px',
      display: 'flex',
      gap: '10px'
    },
    button: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '14px',
      transition: 'all 0.3s'
    },
    verifyButton: {
      backgroundColor: '#3498db',
      color: 'white'
    },
    downloadButton: {
      backgroundColor: '#27ae60',
      color: 'white'
    },
    loading: {
      textAlign: 'center',
      padding: '40px',
      fontSize: '18px',
      color: '#2c3e50'
    },
    error: {
      backgroundColor: '#e74c3c',
      color: 'white',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '20px'
    },
    noResults: {
      textAlign: 'center',
      padding: '40px',
      color: '#7f8c8d',
      fontSize: '16px'
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>🧾 Reports</h2>

      {reports.map(report => (

        <div key={report.id} style={{
          border: "1px solid #ccc",
          padding: "15px",
          marginBottom: "20px"
        }}>

          <div style={{ marginBottom: "10px" }}>
            <b>Patient:</b> {report.patient?.name} | 
               Age: {report.patient?.age} | 
               {report.patient?.address} | 
               {report.patient?.phone}
          </div>

          <div>
            <b>Examined By:</b> {report.examinedBy || "N/A"}
          </div>

          <div>
             <b>Date:</b> {new Date(report.createdAt).toLocaleString()}
          </div>

          <div>
            <b>Status:</b> 
            <span style={{
              color: report.status === "COMPLETED" ? "green" : "orange",
              marginLeft: "5px"
             }}>
            {report.status}
            </span>
          </div>

          {report.results.map(result => (

            <div key={result.id} style={{ marginTop: "15px" }}>

              <h4>{result.test?.testName}</h4>

              <table border="1" width="100%">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                    <th>Unit</th>
                    <th>Reference</th>
                  </tr>
                </thead>

                <tbody>
                  {result.parameters.map(p => (
                    <tr key={p.id}>
                      <td>{p.parameter?.paramName}</td>
                      <td>{p.value}</td>
                      <td>{p.parameter?.unit}</td>
                      <td>
                        {p.parameter?.refMin} - {p.parameter?.refMax}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
            <b>Status:</b> 
            <span style={{
              color: result.status === "Verified" ? "green" : "orange",
              marginLeft: "5px"
             }}>
            {result.status}
            </span>
             <button
              onClick={() => verifyResult(result.id)}
              style={{ ...styles.button, ...styles.verifyButton }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
            >
              ✓ Verify Result
            </button>
          </div>

            </div>
          ))}


           <div>
             <button onClick={() => downloadPDF(report.id)}
              style={{ ...styles.button, ...styles.downloadButton }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#13b469'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#32b478'}>
              📥 Download Report
            </button>
          </div>

         

        </div>
      ))}

    </div>
  );
}

export default ResultView;