import React from 'react';

const Footer = () => {
  const isMobile = window.innerWidth < 768;

  const styles = {
    footer: {
      backgroundColor: '#10284e',
      color: 'white',
      padding: '60px 5% 20px 5%',
      fontFamily: "'Poppins', sans-serif",
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: isMobile ? 'center' : 'left'
    },
    title: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#fff',
      borderLeft: isMobile ? 'none' : '4px solid #cc0000',
      paddingLeft: isMobile ? '0' : '15px'
    },
    link: {
      color: '#bbb',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: isMobile ? 'center' : 'flex-start',
      marginBottom: '15px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: '0.3s'
    },
    // Contact Icons ka Green Color
    contactIcon: {
      color: '#25D366', 
      marginRight: '12px',
      fontSize: '18px'
    },
    socialIcon: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      color: 'white',
      borderRadius: '50%',
      margin: isMobile ? '0 8px' : '0 12px 0 0',
      fontSize: '18px',
      textDecoration: 'none',
      transition: 'transform 0.3s ease',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    },
    bottomBar: {
      marginTop: '50px',
      paddingTop: '20px',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      textAlign: 'center',
      fontSize: '13px',
      color: '#888'
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.grid}>
        
        {/* Column 1: About */}
        <div>
          <h3 style={styles.title}>TZ Real Estate</h3>
          <p style={{ fontSize: '14px', color: '#bbb', lineHeight: '1.6' }}>
            Islamabad's premier real estate agency specializing in luxury properties, 
            plots, and commercial investments in Gulberg Greens and surrounding areas.
          </p>
        </div>

        {/* Column 3: Contact Info (GREEN ICONS & DIRECT LINKS) */}
        <div>
          <h3 style={styles.title}>Contact Info</h3>
          
          <a href="tel:+923169477919" style={styles.link}>
            <i className="fas fa-phone-alt" style={styles.contactIcon}></i> 
            +92 3169477919
          </a>
          
          <a href="https://maps.google.com/?q=Gulberg+Greens+Block+B+Islamabad" 
             target="_blank" rel="noopener noreferrer" style={styles.link}>
            <i className="fas fa-map-marker-alt" style={styles.contactIcon}></i> 
            Gulberg Greens, Islamabad
          </a>


          <a href="mailto:tzrealestatecompany@gmail.com" style={styles.link}>
            <i className="fas fa-envelope" style={styles.contactIcon}></i> 
            tzrealestatecompany@gmail.com
          </a>
        </div>

        {/* Column 4: Follow Us (REAL BRAND COLORS) */}
        <div>
          <h3 style={styles.title}>Follow Us</h3>
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
            
            {/* WhatsApp Channel - Green */}
            <a href="https://whatsapp.com/channel/0029VbC1Yrm9Gv7NUzaGhw1W" target="_blank" rel="noopener noreferrer" 
               style={{...styles.socialIcon, backgroundColor: '#25D366'}}>
              <i className="fab fa-whatsapp"></i>
            </a>

            {/* Facebook - Official Blue */}
            <a href="https://facebook.com/muhammadtahir919" target="_blank" rel="noopener noreferrer" 
               style={{...styles.socialIcon, backgroundColor: '#1877F2'}}>
              <i className="fab fa-facebook-f"></i>
            </a>
            
            {/* YouTube - Official Red */}
            <a href="https://youtube.com/@tzrealestate919" target="_blank" rel="noopener noreferrer" 
               style={{...styles.socialIcon, backgroundColor: '#FF0000'}}>
              <i className="fab fa-youtube"></i>
            </a>
            
            {/* Instagram - Official Gradient */}
            <a href="https://instagram.com/tahirzaman919" target="_blank" rel="noopener noreferrer" 
               style={{...styles.socialIcon, background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)'}}>
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

      </div>

      <div style={styles.bottomBar}>
        <p>© 2026 <b>TZ Real Estate Company</b><div className="BR"></div> Developed & Secured by <b>TZ COMPANY</b>.</p>
      </div>
    </footer>
  );
};

export default Footer;