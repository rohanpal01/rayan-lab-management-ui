import API_BASE_URL from "../config/api";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
 
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
      });
      alert(res.data.message);

      // Redirect based on role
      if (res.data.role === "ROLE_ADMIN") {
        navigate("/admin-dashboard");
      } else if (res.data.role === "ROLE_TECHNICIAN") {
        navigate("/technician-dashboard");
      } else {
        navigate("/reception-dashboard");
      }
    } catch (err) {
      
      if (err.response && err.response.data) {
      alert(err.response.data);
    } else {
        alert("Login failed!");
      }

      console.error(err);
    }
  };

  const handleRegister = async () => {
     if (!role) {
    alert("Please select role");
    return;
  }
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, {
      username,
      password,
      role // 👈 NEW
    });

    alert(res.data);

     // ✅ Switch back to login after registration
    setIsRegisterMode(false);

  } catch (err) {
    alert(err.response?.data || "Registration failed");
  }
};

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif'
    },
    loginBox: {
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center'
    },
    header: {
      marginBottom: '30px'
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
      margin: '0'
    },
    formGroup: {
      marginBottom: '20px',
      textAlign: 'left'
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
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '10px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <div style={styles.header}>
          <h1 style={styles.title}>🏥 RAYAN DIAGNOSTIC LAB</h1>
          <p style={styles.subtitle}>Lab Management System</p>
        </div>
      
        
        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = '#3498db'}
            onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
          />
        </div>
        
        <div style={styles.formGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = '#3498db'}
            onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
          />
        </div>

        <div style={styles.formGroup}>
          {isRegisterMode && (
         <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        >
        <option value="">Select Role</option>
        <option value="ADMIN">Admin</option>
        <option value="TECHNICIAN">Technician</option>
        <option value="RECEPTION">Reception</option>
       </select>
          )}
       </div>
        
       <button onClick={isRegisterMode ? handleRegister : handleLogin}
       style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}>
         {isRegisterMode ? "Register" : "Login"}
       </button>
       {/* Toggle button */}
<button
  onClick={() => setIsRegisterMode(!isRegisterMode)}
  style={{ marginTop: "10px", background: "none", border: "none", color: "blue", cursor: "pointer" }}
>
  {isRegisterMode ? "Already have an account? Login" : "New user? Register"}
</button>
      </div>
    </div>
  );
}

export default Login;
