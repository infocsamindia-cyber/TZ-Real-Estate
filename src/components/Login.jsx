import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      alert("⚠️ Access Denied: Unauthorized Personnel Only.");
    }
  };

  const styles = {
    // Background with dark gradient
    wrapper: {
      height: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '15px',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    },
    // Glassmorphism card effect
    card: {
      width: '100%',
      maxWidth: '380px',
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)', // For Safari support
      borderRadius: '24px',
      padding: '40px 25px',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      textAlign: 'center'
    },
    title: {
      color: '#ffffff',
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '8px',
      letterSpacing: '1px'
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '14px',
      marginBottom: '30px'
    },
    inputGroup: {
      marginBottom: '15px',
      textAlign: 'left'
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      color: '#ffffff',
      fontSize: '16px',
      outline: 'none',
      boxSizing: 'border-box',
      transition: '0.3s'
    },
    btn: {
      width: '100%',
      padding: '16px',
      marginTop: '10px',
      backgroundColor: '#cc0000', // TZ Red accent
      color: '#fff',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '16px',
      boxShadow: '0 4px 15px rgba(204, 0, 0, 0.4)',
      transition: 'transform 0.2s active'
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <img 
          src="/logo.png" 
          alt="TZ Logo" 
          style={{ width: '80px', marginBottom: '20px', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.2))' }} 
        />
        <h2 style={styles.title}>TZ Admin</h2>
        <p style={styles.subtitle}>Enter credentials to access control panel</p>
        
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <input 
              type="email" 
              placeholder="Admin Email" 
              style={styles.input} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div style={styles.inputGroup}>
            <input 
              type="password" 
              placeholder="Password" 
              style={styles.input} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button 
            type="submit" 
            style={styles.btn}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            SECURE LOGIN
          </button>
        </form>
        
        <p style={{ marginTop: '25px', color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
          &copy; 2026 TZ Real Estate Company
        </p>
      </div>
    </div>
  );
};

export default Login;