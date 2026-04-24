// Professional Lab Report PDF Generator
export const generateLabReportPDF = (result) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Lab Report - ${result.patient?.name}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Arial', sans-serif;
          background: white;
          line-height: 1.6;
          color: #333;
        }
        
        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px;
          background: white;
        }
        
        /* Header */
        .header {
          text-align: center;
          border-bottom: 3px solid #2c3e50;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        
        .lab-name {
          font-size: 28px;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 5px;
        }
        
        .lab-tagline {
          font-size: 12px;
          color: #7f8c8d;
          margin-bottom: 15px;
        }
        
        .report-title {
          font-size: 18px;
          font-weight: bold;
          color: #34495e;
        }
        
        /* Section Styling */
        .section {
          margin-bottom: 30px;
          page-break-inside: avoid;
        }
        
        .section-title {
          font-size: 14px;
          font-weight: bold;
          background-color: #ecf0f1;
          padding: 10px 15px;
          margin-bottom: 15px;
          border-left: 4px solid #3498db;
          color: #2c3e50;
        }
        
        .row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #ecf0f1;
        }
        
        .row-item {
          flex: 1;
        }
        
        .label {
          font-weight: bold;
          color: #2c3e50;
          font-size: 13px;
          display: inline-block;
          width: 35%;
        }
        
        .value {
          color: #34495e;
          font-size: 13px;
        }
        
        /* Patient Info Table */
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 15px;
        }
        
        .info-box {
          padding: 10px;
          border: 1px solid #ecf0f1;
          border-radius: 4px;
        }
        
        .info-box-title {
          font-size: 11px;
          font-weight: bold;
          color: #7f8c8d;
          margin-bottom: 5px;
          text-transform: uppercase;
        }
        
        .info-box-value {
          font-size: 13px;
          color: #2c3e50;
          font-weight: 500;
        }
        
        /* Test Result Table */
        .result-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        
        .result-table th {
          background-color: #34495e;
          color: white;
          padding: 12px;
          text-align: left;
          font-size: 12px;
          font-weight: bold;
        }
        
        .result-table td {
          padding: 12px;
          border-bottom: 1px solid #ecf0f1;
          font-size: 13px;
        }
        
        .result-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        
        /* Status Badge */
        .status-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .status-pending {
          background-color: #f39c12;
          color: white;
        }
        
        .status-completed {
          background-color: #27ae60;
          color: white;
        }
        
        /* Footer */
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ecf0f1;
          text-align: center;
          font-size: 11px;
          color: #7f8c8d;
        }
        
        .footer-text {
          margin-bottom: 8px;
        }
        
        .footer-contact {
          font-size: 10px;
          color: #95a5a6;
        }
        
        /* Verified Stamp */
        .verified-stamp {
          text-align: right;
          margin-bottom: 20px;
          font-size: 12px;
          color: #27ae60;
          font-weight: bold;
        }
        
        /* Print Styles */
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .container {
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="lab-name">🏥 RAYAN DIAGNOSTIC LAB</div>
          <div class="lab-tagline">Professional Laboratory Services</div>
          <div class="report-title">LABORATORY TEST REPORT</div>
        </div>
        
        <!-- Verified Stamp -->
        <div class="verified-stamp">
          ✓ VERIFIED REPORT
        </div>
        
        <!-- Patient Information Section -->
        <div class="section">
          <div class="section-title">📋 PATIENT INFORMATION</div>
          <div class="info-grid">
            <div class="info-box">
              <div class="info-box-title">Patient Name</div>
              <div class="info-box-value">${result.patient?.name || 'N/A'}</div>
            </div>
            <div class="info-box">
              <div class="info-box-title">Age</div>
              <div class="info-box-value">${result.patient?.age || 'N/A'} years</div>
            </div>
            <div class="info-box">
              <div class="info-box-title">Contact</div>
              <div class="info-box-value">${result.patient?.contact || 'N/A'}</div>
            </div>
            <div class="info-box">
              <div class="info-box-title">Address</div>
              <div class="info-box-value">${result.patient?.address || 'N/A'}</div>
            </div>
          </div>
        </div>
        
        <!-- Examined By Section -->
        <div class="section">
          <div class="section-title">👨‍⚕️ EXAMINED BY</div>
          <div class="row">
            <div class="row-item">
              <span class="label">Physician/Technician:</span>
              <span class="value">${result.patient?.examinedBy || 'N/A'}</span>
            </div>
          </div>
        </div>
        
        <!-- Test Information Section -->
        <div class="section">
          <div class="section-title">🧪 TEST INFORMATION</div>
          <table class="result-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Sample Type</th>
                <th>Normal Range</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${result.test?.testName || 'N/A'}</td>
                <td>${result.test?.sampleType || 'N/A'}</td>
                <td>${result.normalRange || 'N/A'}</td>
                <td>${result.resultRange || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Remark Section -->
        <div class="section">
          <div class="section-title">📝 REMARKS</div>
          <div class="row">
            <div class="row-item">
              <span class="label">Remarks:</span>
              <span class="value">${result.remark || 'No remarks'}</span>
            </div>
          </div>
        </div>
        
        <!-- Result Status Section -->
        <div class="section">
          <div class="section-title">📊 RESULT STATUS</div>
          <div class="row">
            <div class="row-item">
              <span class="label">Status:</span>
              <span class="status-badge ${result.status === 'pending' ? 'status-pending' : 'status-completed'}">
                ${result.status?.toUpperCase() || 'N/A'}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div class="footer-text">This is a digitally generated report from RAYAN DIAGNOSTIC LAB.</div>
          <div class="footer-text">Report ID: ${result.id || 'N/A'}</div>
          <div class="footer-contact">For inquiries, contact: support@rayanlabs.com | Phone: +91-XXXX-XXXX</div>
          <div class="footer-contact">Generated on: ${new Date().toLocaleDateString('en-IN')} at ${new Date().toLocaleTimeString('en-IN')}</div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Create a blob from the HTML content
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);
  
  // Open in new window for printing
  const printWindow = window.open(url, '_blank');
  
  // Set up print functionality
  printWindow.onload = function() {
    printWindow.print();
    // Close window after print dialog
    printWindow.onafterprint = function() {
      printWindow.close();
      window.URL.revokeObjectURL(url);
    };
  };
};

// Alternative function to download as HTML file that can be converted to PDF
export const downloadLabReportHTML = (result) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Lab Report - ${result.patient?.name}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Arial', sans-serif;
          background: white;
          line-height: 1.6;
          color: #333;
        }
        
        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px;
          background: white;
        }
        
        .header {
          text-align: center;
          border-bottom: 3px solid #2c3e50;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        
        .lab-name {
          font-size: 28px;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 5px;
        }
        
        .lab-tagline {
          font-size: 12px;
          color: #7f8c8d;
          margin-bottom: 15px;
        }
        
        .report-title {
          font-size: 18px;
          font-weight: bold;
          color: #34495e;
        }
        
        .section {
          margin-bottom: 30px;
          page-break-inside: avoid;
        }
        
        .section-title {
          font-size: 14px;
          font-weight: bold;
          background-color: #ecf0f1;
          padding: 10px 15px;
          margin-bottom: 15px;
          border-left: 4px solid #3498db;
          color: #2c3e50;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 15px;
        }
        
        .info-box {
          padding: 10px;
          border: 1px solid #ecf0f1;
          border-radius: 4px;
        }
        
        .info-box-title {
          font-size: 11px;
          font-weight: bold;
          color: #7f8c8d;
          margin-bottom: 5px;
          text-transform: uppercase;
        }
        
        .info-box-value {
          font-size: 13px;
          color: #2c3e50;
          font-weight: 500;
        }
        
        .result-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        
        .result-table th {
          background-color: #34495e;
          color: white;
          padding: 12px;
          text-align: left;
          font-size: 12px;
          font-weight: bold;
        }
        
        .result-table td {
          padding: 12px;
          border-bottom: 1px solid #ecf0f1;
          font-size: 13px;
        }
        
        .result-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        
        .status-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .status-pending {
          background-color: #f39c12;
          color: white;
        }
        
        .status-completed {
          background-color: #27ae60;
          color: white;
        }
        
        .row {
          padding: 10px 0;
          border-bottom: 1px solid #ecf0f1;
        }
        
        .label {
          font-weight: bold;
          color: #2c3e50;
          font-size: 13px;
          display: inline-block;
          width: 35%;
        }
        
        .value {
          color: #34495e;
          font-size: 13px;
        }
        
        .verified-stamp {
          text-align: right;
          margin-bottom: 20px;
          font-size: 12px;
          color: #27ae60;
          font-weight: bold;
        }
        
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ecf0f1;
          text-align: center;
          font-size: 11px;
          color: #7f8c8d;
        }
        
        .footer-text {
          margin-bottom: 8px;
        }
        
        .footer-contact {
          font-size: 10px;
          color: #95a5a6;
        }
        
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="lab-name">🏥 RAYAN DIAGNOSTIC LAB</div>
          <div class="lab-tagline">Professional Laboratory Services</div>
          <div class="report-title">LABORATORY TEST REPORT</div>
        </div>
        
        <div class="verified-stamp">✓ VERIFIED REPORT</div>
        
        <div class="section">
          <div class="section-title">📋 PATIENT INFORMATION</div>
          <div class="info-grid">
            <div class="info-box">
              <div class="info-box-title">Patient Name</div>
              <div class="info-box-value">${result.patient?.name || 'N/A'}</div>
            </div>
            <div class="info-box">
              <div class="info-box-title">Age</div>
              <div class="info-box-value">${result.patient?.age || 'N/A'} years</div>
            </div>
            <div class="info-box">
              <div class="info-box-title">Contact</div>
              <div class="info-box-value">${result.patient?.contact || 'N/A'}</div>
            </div>
            <div class="info-box">
              <div class="info-box-title">Address</div>
              <div class="info-box-value">${result.patient?.address || 'N/A'}</div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">👨‍⚕️ EXAMINED BY</div>
          <div class="row">
            <div class="row-item">
              <span class="label">Physician/Technician:</span>
              <span class="value">${result.patient?.examinedBy || 'N/A'}</span>
            </div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">🧪 TEST INFORMATION</div>
          <table class="result-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Sample Type</th>
                <th>Normal Range</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${result.test?.testName || 'N/A'}</td>
                <td>${result.test?.sampleType || 'N/A'}</td>
                <td>${result.normalRange || 'N/A'}</td>
                <td>${result.resultRange || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="section">
          <div class="section-title">� REMARKS</div>
          <div class="row">
            <div class="row-item">
              <span class="label">Remarks:</span>
              <span class="value">${result.remark || 'No remarks'}</span>
            </div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">�📊 RESULT STATUS</div>
          <div class="row">
            <span class="label">Status:</span>
            <span class="status-badge ${result.status === 'pending' ? 'status-pending' : 'status-completed'}">
              ${result.status?.toUpperCase() || 'N/A'}
            </span>
          </div>
        </div>
        
        <div class="footer">
          <div class="footer-text">This is a digitally generated report from RAYAN DIAGNOSTIC LAB.</div>
          <div class="footer-text">Report ID: ${result.id || 'N/A'}</div>
          <div class="footer-contact">For inquiries, contact: support@rayanlabs.com | Phone: +91-XXXX-XXXX</div>
          <div class="footer-contact">Generated on: ${new Date().toLocaleDateString('en-IN')} at ${new Date().toLocaleTimeString('en-IN')}</div>
        </div>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'application/octet-stream' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Lab_Report_${result.patient?.name || 'Report'}_${new Date().getTime()}.html`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
