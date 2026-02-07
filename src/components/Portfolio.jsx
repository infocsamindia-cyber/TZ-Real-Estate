import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

// Swiper Imports for Slider
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Portfolio = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "properties"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const propertyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sortedData = propertyData.sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1));
      setProperties(sortedData);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const styles = {
    wrapper: { padding: '60px 0', backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" },
    innerContainer: { maxWidth: '1200px', margin: '0 auto', padding: '0 15px' },
    // Red/Blue ko Dark Black (#1a1a1a) kiya
    sectionTitle: { textAlign: 'center', color: '#1a1a1a', fontSize: '2rem', fontWeight: '800', marginBottom: '5px', textTransform: 'uppercase' },
    underline: { width: '50px', height: '4px', background: '#333333', margin: '0 auto 40px auto', borderRadius: '2px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' },
    
    card: {
      backgroundColor: '#fff',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid #eee',
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent'
    },
    
    imageContainer: { width: '100%', position: 'relative', backgroundColor: '#f0f0f0', overflow: 'hidden' },
    propertyImage: { width: '100%', display: 'block', objectFit: 'cover' },
    
    priceBadge: {
      position: 'absolute', top: '15px', left: '15px', 
      backgroundColor: 'rgba(26, 26, 26, 0.9)', // Light Black with transparency
      backdropFilter: 'blur(8px)',
      color: '#fff', padding: '6px 15px', borderRadius: '10px', 
      fontWeight: '800', fontSize: '16px', zIndex: 10,
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    },

    content: { padding: '20px' },
    detailsGrid: { 
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', 
      margin: '15px 0', padding: '15px 0', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0',
      fontSize: '13px', color: '#333' // Darker text for readability
    },
    
    actionArea: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '15px' },
    waBtn: {
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
      backgroundColor: '#25D366', color: '#fff', padding: '12px', borderRadius: '10px', 
      textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', transition: '0.3s'
    },
    callBtn: {
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
      backgroundColor: '#1a1a1a', color: '#fff', padding: '12px', borderRadius: '10px', 
      textDecoration: 'none', fontWeight: 'bold', fontSize: '14px'
    },
    mapLink: {
        display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#333333', 
        fontSize: '12px', fontWeight: '600', textDecoration: 'none', marginTop: '5px'
    }
  };

  // Loading text change kiya: TZ COMPANY
  if (loading) return <div style={{textAlign: 'center', padding: '100px', fontWeight: 'bold'}}>TZ COMPANY IS LOADING...</div>;

  return (
    <div style={styles.wrapper}>
      <style>{`
        /* Border color and shadow changed to black theme */
        .listing-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); border-color: #33333333; }
        .listing-card:active { transform: scale(0.98); }
        .swiper-button-next, .swiper-button-prev { background: rgba(255,255,255,0.8); width: 30px !important; height: 30px !important; border-radius: 50%; color: #000 !important; }
        .swiper-button-next:after, .swiper-button-prev:after { fontSize: 12px !important; fontWeight: bold; }
        
        /* Mobile height */
        .res-swiper, .res-img { height: 250px !important; }

        /* Tablet & PC height */
        @media (min-width: 768px) {
          .res-swiper, .res-img { height: 350px !important; }
        }
        @media (min-width: 1024px) {
          .res-swiper, .res-img { height: 400px !important; }
        }
      `}</style>

      <div style={styles.innerContainer}>
        <h2 style={styles.sectionTitle}>Exclusive Properties</h2>
        <div style={styles.underline}></div>
        
        <div style={styles.grid}>
          {properties.map((p) => (
            <div key={p.id} style={styles.card} className="listing-card">
              <div style={styles.imageContainer}>
                <div style={styles.priceBadge}>PKR {p.price}</div>
                
                {p.images && p.images.length > 0 ? (
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    className="res-swiper" 
                  >
                    {p.images.map((img, idx) => (
                      <SwiperSlide key={idx}>
                        <img src={img} alt={p.title} style={styles.propertyImage} className="res-img" loading="lazy" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <img src='https://via.placeholder.com/400x300' alt="placeholder" style={styles.propertyImage} className="res-img" />
                )}
              </div>

              <div style={styles.content}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <h4 style={{ color: '#1a1a1a', margin: '0', fontSize: '1.1rem', fontWeight: '700' }}>
                        {p.isPinned && "⭐ "} {p.title}
                    </h4>
                    {p.status === 'Sold Out' && <span style={{fontSize: '10px', background: '#333', padding: '2px 8px', borderRadius: '4px', color: '#fff'}}>SOLD</span>}
                </div>

                <a href={p.mapUrl || "#"} target="_blank" rel="noreferrer" style={styles.mapLink}>
                    <i className="fas fa-map-marker-alt"></i> {p.location.substring(0, 30)}...
                </a>

                <div style={styles.detailsGrid}>
                  {/* Icons ko Dark Black (#1a1a1a) kiya */}
                  <span><i className="fas fa-vector-square" style={{color: '#1a1a1a'}}></i> {p.sqft || 'N/A'} Sqft</span>
                  <span><i className="fas fa-car" style={{color: '#1a1a1a'}}></i> {p.garage || '0'} Garage</span>
                  <span><i className="fas fa-bed" style={{color: '#1a1a1a'}}></i> {p.bedrooms || '0'} Beds</span>
                  <span><i className="fas fa-bath" style={{color: '#1a1a1a'}}></i> {p.bathrooms || '0'} Baths</span>
                </div>

                <div style={styles.actionArea}>
                    <a href="tel:+923169477919" style={styles.callBtn}>
                        <i className="fas fa-phone-alt"></i> Call
                    </a>
                    <a 
                      href={`https://wa.me/923169477919?text=Assalam o Alaikum, I'm interested in: ${p.title}. Location: ${p.location}`}
                      target="_blank" rel="noreferrer" style={styles.waBtn}
                    >
                      <i className="fab fa-whatsapp"></i> WhatsApp
                    </a>
                </div>
                
                <p style={{ fontSize: '11px', color: '#777', marginTop: '15px', textAlign: 'center' }}>
                    Listed on {p.timestamp?.toDate().toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;