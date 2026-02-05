import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (id) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const styles = {
    nav: {
      backgroundColor: '#ffffff',
      padding: isMobile ? '12px 10px' : '15px 6%', 
      display: 'flex',
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 2000,
      fontFamily: "'Poppins', sans-serif",
    },
    spacer: {
      height: isMobile ? '64px' : '80px', 
      backgroundColor: 'transparent',
      margin: 0,
      padding: 0
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      gap: '8px',
    },
    logoCircle: {
      height: isMobile ? '38px' : '50px',
      width: isMobile ? '38px' : '50px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2px solid #cc0000',
    },
    logoText: {
      fontWeight: '900',
      fontSize: isMobile ? '18px' : '24px',
      letterSpacing: '1px',
      // --- GLOWING & SHINING LOGO EFFECT ---
      background: 'linear-gradient(to right, #10284e 20%, #cc0000 40%, #cc0000 60%, #10284e 80%)',
      backgroundSize: '200% auto',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'textShine 3s infinite linear, neonPulse 2s infinite ease-in-out',
    },
    menu: {
      display: 'flex',
      flexDirection: 'row',
      gap: isMobile ? '5px' : '15px', 
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    link: {
      textDecoration: 'none',
      color: '#10284e',
      fontWeight: '700',
      fontSize: isMobile ? '10px' : '14px', 
      textTransform: 'uppercase',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      padding: isMobile ? '6px 4px' : '8px 12px',
      borderRadius: '4px',
    }
  };

  return (
    <>
      {/* Keyframes for Glowing and Shining */}
      <style>
        {`
          @keyframes textShine {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          @keyframes neonPulse {
            0%, 100% { filter: drop-shadow(0 0 2px rgba(204, 0, 0, 0.2)); }
            50% { filter: drop-shadow(0 0 8px rgba(204, 0, 0, 0.5)); }
          }
        `}
      </style>

      <nav style={styles.nav}>
        <Link to="/" style={styles.logoContainer} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <img src="/logo.png" alt="TZ Logo" style={styles.logoCircle} onError={(e) => { e.target.src = "https://via.placeholder.com/40"; }} />
          <span style={styles.logoText}>TZ</span>
        </Link>
        
        <ul style={styles.menu}>
          <li><span onClick={() => { navigate('/'); window.scrollTo({top: 0, behavior: 'smooth'}); }} style={styles.link}>Home</span></li>
          <li><span onClick={() => scrollToSection('about')} style={styles.link}>About</span></li>
          <li><span onClick={() => scrollToSection('listings')} style={styles.link}>Properties</span></li>
          <li><span onClick={() => scrollToSection('contact')} style={styles.link}>Contact</span></li>
        </ul>
      </nav>
      <div style={styles.spacer}></div>
    </>
  );
};

export default Navbar;