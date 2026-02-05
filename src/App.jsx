import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

// --- WhatsApp Widget Component with Auto-Hide ---
const WhatsAppWidget = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // 2 second baad pop-up dikhao
    const showTimer = setTimeout(() => setShowText(true), 2000);

    // 9 second baad chhupa do (2s wait + 7s display = 9s total)
    const hideTimer = setTimeout(() => setShowText(false), 9000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const whatsappLink = "https://wa.me/923169477919?text=Hello! I visited your website and I need some help regarding properties.";

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', zIndex: 3000 }}>
      {/* Pop-up Message */}
      <div style={{
        backgroundColor: '#fff', 
        color: '#333', 
        padding: '10px 20px', 
        borderRadius: '20px 20px 0 20px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)', 
        marginBottom: '10px', 
        fontSize: '14px', 
        fontWeight: '600',
        opacity: showText ? 1 : 0, 
        visibility: showText ? 'visible' : 'hidden', // Fully hide logic
        transform: showText ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s ease', 
        border: '1px solid #25D366',
        pointerEvents: 'none' // Bubble click block na kare
      }}>
        How can I help you? 👋
      </div>

      {/* WhatsApp Icon Button (Persistent) */}
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" 
         style={{ 
           width: '60px', 
           height: '60px', 
           backgroundColor: '#25D366', 
           borderRadius: '50%', 
           display: 'flex', 
           alignItems: 'center', 
           justifyContent: 'center', 
           color: '#fff', 
           fontSize: '30px', 
           boxShadow: '0 5px 20px rgba(0,0,0,0.3)', 
           textDecoration: 'none',
           transition: 'transform 0.3s ease'
         }}
         onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
         onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body, html {
    width: 100%; overflow-x: hidden; font-family: 'Poppins', sans-serif;
    background-color: #f4f4f4; scroll-behavior: smooth;
  }
`;

const LayoutHandler = ({ children }) => {
  const location = useLocation();
  const hideLayout = location.pathname === '/admin' || location.pathname === '/login';
  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
      {!hideLayout && <WhatsAppWidget />}
    </>
  );
};

function App() {
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      <style>{globalStyles}</style>
      
      <Router>
        <LayoutHandler>
          <Routes>
            <Route path="/" element={
              <div style={{ width: '100%' }}>
                <Hero />
                
                {/* About Section */}
                <section id="about" style={{ padding: '80px 10%', backgroundColor: '#fff', textAlign: 'center' }}>
                  <h2 style={{ color: '#cc0000', fontSize: '28px', fontWeight: '800', marginBottom: '20px' }}>
                    ABOUT TZ ESTATE
                  </h2>
                  <p style={{ color: '#10284e', fontSize: '16px', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
                    Led by <strong>Muhammad Tahir</strong>, TZ Real Estate is your premier partner in finding 
                    exclusive properties in Gulberg Greens, DHA, and Bahria Town. We pride ourselves on 
                    transparency, deep market knowledge, and helping our clients make the best 
                    investment decisions.
                  </p>
                </section>

                <div id="listings"><Portfolio /></div>
                <div id="contact"><Contact /></div>
              </div>
            } />

            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </LayoutHandler>
      </Router>
    </>
  );
}

export default App;