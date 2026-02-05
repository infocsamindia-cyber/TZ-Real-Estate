import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; 
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

// Map & Leaflet imports
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Marker Icon Fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// --- SEARCH FIELD (MOBILE RESPONSIVE) ---
const SearchField = ({ setMarkerPos, setFormData, mapType, setMapType, mapRef }) => {
  const [queryText, setQueryText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (text) => {
    const searchTerm = typeof text === 'string' ? text : queryText;
    if (!searchTerm) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}&limit=1`);
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newPos = [parseFloat(lat), parseFloat(lon)];
        setMarkerPos(newPos);
        setFormData(prev => ({ ...prev, location: display_name, mapUrl: `https://www.google.com/maps?q=${lat},${lon}` }));
        
        if (mapRef.current) {
            mapRef.current.setView(newPos, 16);
        }
        setShowDropdown(false);
      }
    } catch (err) { console.error(err); }
  };

  const fetchSuggestions = async (text) => {
    setQueryText(text);
    if (text.length < 3) { setSuggestions([]); return; }
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${text}&limit=5`);
    const data = await res.json();
    setSuggestions(data);
    setShowDropdown(true);
  };

  return (
    <div ref={dropdownRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '15px', width: '100%' }}>
      <div style={{ display: 'flex', gap: '5px', width: '100%', maxWidth: '500px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            placeholder="Search for area..."
            value={queryText}
            onChange={(e) => fetchSuggestions(e.target.value)}
            onKeyDown={(e) => { if(e.key === 'Enter') handleSearch(); }}
            style={{ 
              width: '100%', 
              padding: '12px 45px 12px 10px', 
              borderRadius: '8px', 
              border: '1px solid #ddd', 
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              boxSizing: 'border-box',
              fontSize: '14px'
            }}
          />
          <button 
            type="button" 
            onClick={() => handleSearch()} 
            style={{ 
              position: 'absolute', 
              right: '5px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              background: '#10284e', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '6px', 
              padding: '8px 12px', 
              cursor: 'pointer' 
            }}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>

        <button 
          type="button" 
          onClick={() => setMapType(mapType === 'default' ? 'satellite' : 'default')} 
          style={{ padding: '0 10px', background: '#fff', color: '#333', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
        >
          {mapType === 'default' ? '🛰️ SAT' : '🗺️ MAP'}
        </button>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <ul style={{ 
            width: '100%', 
            maxWidth: '500px', 
            background: '#fff', 
            listStyle: 'none', 
            padding: '0', 
            margin: '5px 0 0', 
            borderRadius: '8px', 
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)', 
            maxHeight: '150px', 
            overflowY: 'auto',
            zIndex: 1001 
        }}>
          {suggestions.map((item, i) => (
            <li key={i} onClick={() => { setQueryText(item.display_name); handleSearch(item.display_name); }} style={{ padding: '12px', cursor: 'pointer', borderBottom: '1px solid #eee', fontSize: '13px' }}>{item.display_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [properties, setProperties] = useState([]);
  const [mapType, setMapType] = useState('default');
  const [formData, setFormData] = useState({ 
    title: '', price: '', location: '', mapUrl: '',
    bedrooms: '', bathrooms: '', sqft: '', garage: '0' 
  });
  
  const [imgLinks, setImgLinks] = useState(Array(10).fill(''));
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [markerPos, setMarkerPos] = useState([33.6844, 73.0479]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') navigate('/login');
    const q = query(collection(db, "properties"), orderBy("timestamp", "desc"));
    return onSnapshot(q, (snapshot) => {
      setProperties(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, [navigate]);

  const handleLogout = () => { localStorage.removeItem('isAdmin'); navigate('/login'); };

  const handleImgChange = (index, value) => {
    const newLinks = [...imgLinks];
    newLinks[index] = value;
    setImgLinks(newLinks);
  };

  function LocationPicker() {
    useMapEvents({
      async click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPos([lat, lng]);
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          const data = await res.json();
          setFormData(prev => ({ 
            ...prev, 
            location: data.display_name, 
            mapUrl: `https://www.google.com/maps?q=${lat},${lng}` 
          }));
        } catch (err) { console.error(err); }
      },
    });
    return <Marker position={markerPos} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const imagesArray = imgLinks.map(link => link.trim()).filter(link => link !== "" && link.startsWith('http'));
    if (imagesArray.length === 0) { alert("Image Link is required!"); setUploading(false); return; }

    try {
      const payload = { ...formData, images: imagesArray, timestamp: serverTimestamp() };
      if (editId) {
        await updateDoc(doc(db, "properties", editId), payload);
        alert("Updated!");
      } else {
        await addDoc(collection(db, "properties"), { ...payload, status: 'Available', isPinned: false });
        alert("Published!");
      }
      resetForm();
    } catch (err) { alert(err.message); }
    setUploading(false);
  };

  const resetForm = () => {
    setFormData({ title: '', price: '', location: '', mapUrl: '', bedrooms: '', bathrooms: '', sqft: '', garage: '0' });
    setImgLinks(Array(10).fill(''));
    setEditId(null);
  };

  const startEdit = (p) => {
    setEditId(p.id);
    setFormData({ ...p, mapUrl: p.mapUrl || '' });
    const newLinks = Array(10).fill('');
    (p.images || []).forEach((url, i) => { if(i < 10) newLinks[i] = url; });
    setImgLinks(newLinks);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const styles = {
    wrapper: { backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '15px 10px', fontFamily: "'Poppins', sans-serif" },
    topNav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1000px', margin: '0 auto 20px' },
    card: { backgroundColor: '#fff', padding: '15px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '1000px', margin: '0 auto 30px' },
    gridRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', marginBottom: '15px' },
    input: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
    btnSubmit: { width: '100%', padding: '15px', border: 'none', borderRadius: '8px', backgroundColor: '#10284e', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
    logoutBtn: { backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' },
    listCard: { backgroundColor: '#fff', borderRadius: '10px', padding: '15px', marginBottom: '12px', borderLeft: '6px solid #cc0000', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
    actionBtn: { border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.topNav}>
        <div>
          <h4 style={{ color: '#10284e', margin: 0 }}>TZ Management</h4>
          <p style={{fontSize: '10px', color: '#666'}}>Admin Portal | By Ayan Ansari</p>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </div>

      <div style={styles.card}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#333' }}>
          <i className={editId ? "fas fa-edit" : "fas fa-plus-circle"}></i> {editId ? ' Edit Property' : ' Create New'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.gridRow}>
            <input style={styles.input} placeholder="Property Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
            <input style={styles.input} placeholder="Price" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
          </div>
          
          <div style={{marginBottom: '15px'}}>
            <input style={styles.input} placeholder="Location (Auto-filled)" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required />
          </div>

          <div style={styles.gridRow}>
            <input style={styles.input} type="number" placeholder="Beds" value={formData.bedrooms} onChange={e => setFormData({ ...formData, bedrooms: e.target.value })} />
            <input style={styles.input} type="number" placeholder="Baths" value={formData.bathrooms} onChange={e => setFormData({ ...formData, bathrooms: e.target.value })} />
            <input style={styles.input} placeholder="Sqft Area" value={formData.sqft} onChange={e => setFormData({ ...formData, sqft: e.target.value })} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>Images (Max 10):</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
              {imgLinks.map((link, index) => (
                <input key={index} style={{...styles.input, padding: '8px'}} placeholder={`Link ${index + 1}`} value={link} onChange={(e) => handleImgChange(index, e.target.value)} />
              ))}
            </div>
          </div>

          {/* SEARCH BAR CENTERED ABOVE MAP */}
          <SearchField 
            setMarkerPos={setMarkerPos} 
            setFormData={setFormData} 
            mapType={mapType} 
            setMapType={setMapType} 
            mapRef={mapRef}
          />

          <div style={{ height: '250px', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px', border: '1px solid #ddd' }}>
            <MapContainer 
                center={markerPos} 
                zoom={12} 
                style={{ height: '100%', width: '100%' }} 
                zoomControl={true}
                whenCreated={(mapInstance) => { mapRef.current = mapInstance }}
            >
              <TileLayer 
                url={mapType === 'default' 
                  ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                  : "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                } 
              />
              <LocationPicker />
            </MapContainer>
          </div>

          <button type="submit" style={styles.btnSubmit} disabled={uploading}>
            {uploading ? 'SAVING...' : editId ? '💾 UPDATE' : '🚀 PUBLISH'}
          </button>
        </form>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {properties.map(p => (
          <div key={p.id} style={styles.listCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
               <div style={{flex: '1'}}>
                 <h5 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>{p.title}</h5>
                 <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>{p.location}</p>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                 <button onClick={() => startEdit(p)} style={{...styles.actionBtn, background: '#e7f1ff', color: '#0056b3'}}>Edit</button>
                 <button onClick={() => { if(window.confirm('Delete?')) deleteDoc(doc(db, "properties", p.id)) }} style={{...styles.actionBtn, background: '#f8d7da', color: '#721c24'}}>Del</button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;