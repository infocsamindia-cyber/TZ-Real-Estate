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
    // Is spacer ko exact header ki height ke barabar rakha hai
    spacer: {
      height: isMobile ? '64px' : '80px', // Isse page ka content header ke niche se shuru hoga bina extra gap ke
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
      background: 'linear-gradient(45deg, #cc0000, #10284e)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '1px',
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
      {/* Page ka content yahan se shuru ho raha hai */}
      <div style={styles.spacer}></div>
    </>
  );
};

export default Navbar;