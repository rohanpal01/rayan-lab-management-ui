import React, { useEffect, useState } from "react";
import axios from "axios";

function ResultView() {

  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // ================= FETCH DATA =================
  useEffect(() => {
    axios.get("http://localhost:8080/results/view")
      .then(res => {
        // ✅ Latest first
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReports(sorted);
      })
      .catch(err => console.error(err));
  }, []);

  // ================= VERIFY =================
  const verifyResult = async (id) => {
    await axios.put(`http://localhost:8080/results/${id}/verify`);
    alert("Result verified!");
  };

  // ================= DOWNLOAD =================
  const downloadPDF = async (id, prePrinted = false) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/results/${id}/report?prePrinted=${prePrinted}`,
        { responseType: "blob" }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

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

  // ================= SEARCH FILTER =================
  const filteredReports = reports.filter(report =>
    report.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ================= PAGINATION =================
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentReports = filteredReports.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  // ================= STYLES =================
  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh"
    },
    card: {
      border: "1px solid #ccc",
      padding: "15px",
      marginBottom: "20px",
      background: "#fff",
      borderRadius: "6px"
    },
    button: {
      padding: "8px 12px",
      marginRight: "10px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    },
    verify: {
      backgroundColor: "#3498db",
      color: "#fff"
    },
    download: {
      backgroundColor: "#27ae60",
      color: "#fff"
    },
    preprint: {
      backgroundColor: "#e67e22",
      color: "#fff"
    }
  };

  return (
    <div style={styles.container}>

      <h2>🧾 Reports</h2>

      {/* ================= SEARCH ================= */}
      <input
        type="text"
        placeholder="🔍 Search by patient name..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      {/* ================= LIST ================= */}
      {currentReports.map(report => (

        <div key={report.id} style={styles.card}>

          <div>
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

          {/* ================= TESTS ================= */}
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
                      <td>{p.parameter?.refMin} - {p.parameter?.refMax}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: "10px" }}>
                <b>Status:</b>
                <span style={{
                  color: result.status === "Verified" ? "green" : "orange",
                  marginLeft: "5px"
                }}>
                  {result.status}
                </span>

                <button
                  onClick={() => verifyResult(result.id)}
                  style={{ ...styles.button, ...styles.verify }}
                >
                  ✓ Verify Result
                </button>
              </div>

            </div>
          ))}

          {/* ================= BUTTONS ================= */}
          <div style={{ marginTop: "15px" }}>

            <button
              onClick={() => downloadPDF(report.id, false)}
              style={{ ...styles.button, ...styles.download }}
            >
              📥 Download Report
            </button>

            <button
              onClick={() => downloadPDF(report.id, true)}
              style={{ ...styles.button, ...styles.preprint }}
            >
              🖨️ Print (Pre-Printed)
            </button>

          </div>

        </div>
      ))}

      {/* ================= PAGINATION ================= */}
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              margin: "5px",
              padding: "8px 12px",
              backgroundColor: currentPage === page ? "#3498db" : "#ddd",
              color: currentPage === page ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            {page}
          </button>
        ))}
      </div>

    </div>
  );
}

export default ResultView;
