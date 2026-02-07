import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

// --- WhatsApp Widget Component ---
const WhatsAppWidget = () => {
  const [showText, setShowText] = useState(false);
  useEffect(() => {
    const showTimer = setTimeout(() => setShowText(true), 2000);
    const hideTimer = setTimeout(() => setShowText(false), 9000);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, []);
  const whatsappLink = "https://wa.me/923169477919?text=Hello! I visited your website.";
  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', zIndex: 3000 }}>
      <div style={{ backgroundColor: '#fff', color: '#333', padding: '8px 15px', borderRadius: '15px 15px 0 15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', marginBottom: '8px', fontSize: '12px', fontWeight: '600', opacity: showText ? 1 : 0, visibility: showText ? 'visible' : 'hidden', transform: showText ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.5s ease', border: '1px solid #25D366', pointerEvents: 'none' }}>Help? 👋</div>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{ width: '50px', height: '50px', backgroundColor: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '25px', boxShadow: '0 5px 20px rgba(0,0,0,0.3)', textDecoration: 'none' }}><i className="fab fa-whatsapp"></i></a>
    </div>
  );
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body, html { width: 100%; overflow-x: hidden; font-family: 'Poppins', sans-serif; background-color: #f4f4f4; scroll-behavior: smooth; }
  
  @keyframes textShine {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  @keyframes neonGlow {
    0%, 100% { filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.2)); }
    50% { filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.4)); }
  }

  @keyframes mobileZoom {
    0% { transform: scale(0.8); opacity: 0; filter: blur(10px); }
    100% { transform: scale(1); opacity: 1; filter: blur(0); }
  }

  @keyframes slideReveal {
    0% { width: 0; }
    100% { width: 100%; }
  }
`;

const LayoutHandler = ({ children }) => {
  const location = useLocation();
  const hideLayout = location.pathname === '/admin' || location.pathname === '/login';
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
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
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setLoading(false), 700);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100dvh',
        backgroundColor: '#fff', zIndex: 9999, display: 'flex', justifyContent: 'center',
        alignItems: 'center', overflow: 'hidden',
        transform: isExiting ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.6s cubic-bezier(0.77, 0, 0.175, 1)'
      }}>
        <style>{globalStyles}</style>
        
        <div style={{ textAlign: 'center', padding: '0 20px' }}>
          {/* TZ with Black/Grey Shine Effect */}
          <h1 style={{
            fontSize: '28vw',
            fontWeight: '900',
            fontFamily: "'Montserrat', sans-serif",
            margin: 0, 
            lineHeight: 0.8,
            animation: 'mobileZoom 1s ease forwards, neonGlow 2s infinite ease-in-out',
            background: 'linear-gradient(to right, #000000 20%, #444444 40%, #444444 60%, #000000 80%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animationName: 'mobileZoom, textShine, neonGlow',
            animationDuration: '1s, 3s, 2s',
            animationIterationCount: '1, infinite, infinite'
          }}>
            TZ
          </h1>

          {/* Animated Line with Black Glow */}
          <div style={{ 
            width: '80px', height: '4px', backgroundColor: '#eee', 
            margin: '30px auto', position: 'relative', overflow: 'hidden', borderRadius: '2px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, height: '100%', 
              backgroundColor: '#000000', animation: 'slideReveal 1.5s ease-in-out forwards'
            }}></div>
          </div>

          <p style={{
            fontSize: '11px', letterSpacing: '7px', color: '#000000',
            textTransform: 'uppercase', fontWeight: '900', opacity: 0.8
          }}>
            TZ COMPANY
          </p>
        </div>

        <div style={{
          position: 'absolute', width: '150%', height: '150%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 50%)',
          zIndex: -1
        }}></div>
      </div>
    );
  }

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
                <section id="about" style={{ padding: '60px 8%', backgroundColor: '#fff', textAlign: 'center' }}>
                  <h2 style={{ color: '#000000', fontSize: '24px', fontWeight: '800', marginBottom: '15px' }}>ABOUT TZ ESTATE</h2>
                  <p style={{ color: '#333', fontSize: '15px', lineHeight: '1.6' }}>
                    Led by <strong>Muhammad Tahir</strong>, TZ Real Estate provides premium property solutions in Gulberg Greens, DHA, and Bahria Town.
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