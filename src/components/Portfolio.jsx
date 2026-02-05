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
    wrapper: { padding: '60px 0', backgroundColor: '#f4f4f4', minHeight: '100vh' },
    innerContainer: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
    sectionTitle: { textAlign: 'center', color: '#10284e', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' },
    underline: { width: '80px', height: '4px', background: '#cc0000', margin: '0 auto 40px auto' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' },
    card: (isSold) => ({
      backgroundColor: '#fff',
      borderRadius: '5px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      position: 'relative',
      opacity: isSold ? 0.9 : 1,
      overflow: 'hidden',
      transition: 'transform 0.3s'
    }),
    // FIXED: Image container height ab auto hai taaki image ke hisab se adjust ho
    imageContainer: { width: '100%', position: 'relative', backgroundColor: '#eee' },
    propertyImage: { width: '100%', height: 'auto', display: 'block', objectFit: 'contain' },
    priceBadge: {
      position: 'absolute', top: '10px', left: '10px', backgroundColor: '#cc0000', color: '#fff',
      padding: '5px 15px', borderRadius: '3px', fontWeight: 'bold', fontSize: '18px', zIndex: 10
    },
    content: { padding: '20px' },
    detailsGrid: { 
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', 
      margin: '15px 0', padding: '15px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee',
      fontSize: '14px', color: '#666'
    },
    waBtn: {
      display: 'block', textAlign: 'center', backgroundColor: '#10284e', color: '#fff',
      padding: '12px', borderRadius: '3px', textDecoration: 'none', fontWeight: 'bold', marginTop: '15px'
    }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '100px'}}>Loading TZ Properties...</div>;

  return (
    <div style={styles.wrapper}>
      <div style={styles.innerContainer}>
        <h2 style={styles.sectionTitle}>Latest Listings</h2>
        <div style={styles.underline}></div>
        
        <div style={styles.grid}>
          {properties.map((p) => (
            <div key={p.id} style={styles.card(p.status === 'Sold Out')} className="listing-card">
              <div style={styles.imageContainer}>
                <div style={styles.priceBadge}>PKR {p.price}</div>
                
                {/* SLIDER ADDED HERE */}
                {p.images && p.images.length > 0 ? (
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    style={{ "--swiper-navigation-size": "20px", "--swiper-theme-color": "#cc0000" }}
                  >
                    {p.images.map((img, idx) => (
                      <SwiperSlide key={idx}>
                        <img src={img} alt={`${p.title}-${idx}`} style={styles.propertyImage} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <img src='https://via.placeholder.com/400x300' alt="placeholder" style={styles.propertyImage} />
                )}
              </div>

              <div style={styles.content}>
                <h4 style={{ color: '#10284e', margin: '0 0 5px 0' }}>{p.isPinned && "📌 "} {p.title}</h4>
                <p style={{ color: '#888', fontSize: '14px' }}><i className="fas fa-map-marker-alt"></i> {p.location}</p>

                <div style={styles.detailsGrid}>
                  <span><i className="fas fa-th-large"></i> Sqft: {p.sqft || 'N/A'}</span>
                  <span><i className="fas fa-car"></i> Garage: {p.garage || '0'}</span>
                  <span><i className="fas fa-bed"></i> Bedrooms: {p.bedrooms || '0'}</span>
                  <span><i className="fas fa-bath"></i> Bathrooms: {p.bathrooms || '0'}</span>
                </div>

                <p style={{ fontSize: '13px', color: '#444' }}><i className="fas fa-user"></i> Muhammad Tahir</p>
                <p style={{ fontSize: '12px', color: '#aaa' }}><i className="fas fa-clock"></i> {p.timestamp?.toDate().toLocaleDateString()}</p>

                <a 
                  href={`https://wa.me/923169477919?text=Interested in: ${p.title}`}
                  target="_blank" rel="noreferrer" style={styles.waBtn}
                >
                  Inquiry Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;