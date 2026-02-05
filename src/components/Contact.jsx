import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus(''), 5000);
    }, 2000);
  };

  // --- ASLI GOOGLE MAPS LINK FOR GULBERG GREENS ---
  const mapSearchUrl = "https://www.google.com/maps/search/Gulberg+Greens+Block+B+Islamabad";

  const styles = {
    container: { padding: '80px 5%', backgroundColor: '#f4f4f4', fontFamily: "'Poppins', sans-serif" },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto' },
    formCard: { backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' },
    infoCard: { backgroundColor: '#10284e', color: '#fff', padding: '40px 30px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
    input: { width: '100%', padding: '12px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px', fontFamily: "'Poppins', sans-serif" },
    submitBtn: { 
      width: '100%', padding: '15px', backgroundColor: status === 'success' ? '#28a745' : '#cc0000', 
      color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '5px', transition: '0.3s', textTransform: 'uppercase'
    },
    infoLink: { color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px', transition: '0.3s' },
    icon: { color: '#25D366', fontSize: '20px', width: '25px' }
  };

  return (
    <section style={styles.container} id="contact">
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h2 style={{ color: '#10284e', fontSize: '2.5rem', fontWeight: 'bold' }}>Get In Touch</h2>
        <div style={{ width: '70px', height: '4px', background: '#cc0000', margin: '15px auto' }}></div>
      </div>

      <div style={styles.grid}>
        {/* Form Section */}
        <div style={styles.formCard}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <i className="fas fa-check-circle" style={{ fontSize: '50px', color: '#28a745', marginBottom: '20px' }}></i>
              <h3 style={{ color: '#10284e' }}>Inquiry Sent!</h3>
              <p>We will get back to you shortly.</p>
            </div>
          ) : (
            <>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Make An Inquiry</h3>
              <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Full Name" style={styles.input} required value={formData.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email Address" style={styles.input} required value={formData.email} onChange={handleChange} />
                <input type="text" name="phone" placeholder="Phone Number" style={styles.input} required value={formData.phone} onChange={handleChange} />
                <textarea name="message" placeholder="How can we help you?" style={{ ...styles.input, minHeight: '120px' }} required value={formData.message} onChange={handleChange}></textarea>
                <button type="submit" style={styles.submitBtn} disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Info Section */}
        <div style={styles.infoCard}>
          <h3 style={{ marginBottom: '30px', fontSize: '1.8rem' }}>Office Information</h3>
          
          {/* LOCATION LINK FIXED HERE */}
          <a href={mapSearchUrl} target="_blank" rel="noopener noreferrer" style={styles.infoLink}>
            <i className="fas fa-map-marker-alt" style={styles.icon}></i>
            <span>Gulberg Greens Block B, Islamabad, Pakistan</span>
          </a>

          <a href="tel:+923169477919" style={styles.infoLink}>
            <i className="fas fa-phone-alt" style={styles.icon}></i>
            <span>+92 3169477919</span>
          </a>

          <a href="mailto:tzrealestatecompany@gmail.com" style={styles.infoLink}>
            <i className="fas fa-envelope" style={styles.icon}></i>
            <span>tzrealestatecompany@gmail.com</span>
          </a>

          <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <p style={{ fontSize: '14px', color: '#bbb' }}>Available 24/7 for your real estate needs.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;