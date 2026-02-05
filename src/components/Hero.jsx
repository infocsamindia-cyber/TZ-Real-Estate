import React, { useState, useEffect } from 'react';

const Hero = () => {
  // Screen size check karne ke liye state (Mobile responsive logic)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    section: {
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      padding: isMobile ? '40px 20px' : '60px 20px',
    },
    logo: {
      width: isMobile ? '150px' : '220px', // Mobile par chota logo
      marginBottom: '20px',
      transition: '0.3s'
    },
    title: {
      fontSize: isMobile ? '1.8rem' : '2.8rem', // Mobile par chota font
      fontWeight: 'bold',
      color: '#1a1a1a',
      margin: '10px 0',
      textTransform: 'uppercase',
    },
    line: {
      width: '60px',
      height: '4px',
      backgroundColor: '#cc0000',
      margin: '10px auto',
    }
  };

  return (
    <section style={styles.section}>
      <img src="/logo.png" alt="TZ Real Estate" style={styles.logo} />
      <h1 style={styles.title}>TZ Real Estate Company</h1>
      <div style={styles.line}></div>
      <p style={{color: '#666', fontSize: isMobile ? '1rem' : '1.2rem'}}>
        Islamabad's Trusted Property Consultants
      </p>
    </section>
  );
};

export default Hero;