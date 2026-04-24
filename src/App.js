import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PatientForm from "./components/PatientForm";
import TestCatalog from "./components/TestCatalog";
import SampleTracking from "./components/SampleTracking";
import ResultEntry from "./components/ResultEntry";
import ResultView from "./components/ResultView";
import Billing from "./components/Billing";
import Receipt from "./components/Receipt";
import Inventory from "./components/Inventory";
import AdminDashboard from "./components/AdminDashboard";
import TechnicianDashboard from "./components/TechnicianDashboard";
import ReceptionDashboard from "./components/ReceptionDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<PatientForm />} />
        <Route path="/tests" element={<TestCatalog />} />
        <Route path="/samples" element={<SampleTracking />} />
        <Route path="/results/entry" element={<ResultEntry />} />
        <Route path="/results/view" element={<ResultView />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/technician-dashboard" element={<TechnicianDashboard />} />
        <Route path="/reception-dashboard" element={<ReceptionDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />







      </Routes>
    </Router>
  );
}

export default App;
