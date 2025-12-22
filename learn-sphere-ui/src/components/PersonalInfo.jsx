import { useState, useEffect } from 'react';

export const PersonalInfo = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // 1. Load from localStorage on Initial Mount
  useEffect(() => {
    setName(localStorage.getItem('studentName') || '');
    setDob(localStorage.getItem('studentDob') || '');
    setGender(localStorage.getItem('studentGender') || '');
    setEmail(localStorage.getItem('studentEmail') || '');
    setCountry(localStorage.getItem('studentCountry') || '');
    setPhone(localStorage.getItem('studentPhone') || '');
    setPassword(localStorage.getItem('studentPassword') || '');
  }, []);

  // 2. Auto-save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem('studentName', name);
    localStorage.setItem('studentDob', dob);
    localStorage.setItem('studentGender', gender);
    localStorage.setItem('studentEmail', email);
    localStorage.setItem('studentCountry', country);
    localStorage.setItem('studentPhone', phone);
    localStorage.setItem('studentPassword', password);
  }, [name, dob, gender, email, country, phone, password]);

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    boxSizing: 'border-box' // Added to ensure padding doesn't break width
  };

  return (
    <div style={{ marginBottom: '2rem', maxWidth: '500px' }}>
      <h3 style={{ marginBottom: '0.5rem', color: '#4f46e5' }}>Personal Information</h3>
      <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
        Changes are saved automatically.
      </p>

      <input 
        type="text" placeholder="Full Name" value={name} 
        onChange={(e) => setName(e.target.value)} style={inputStyle} 
      />

      <input 
        type="date" value={dob} 
        onChange={(e) => setDob(e.target.value)} style={inputStyle} 
      />

      <select value={gender} onChange={(e) => setGender(e.target.value)} style={inputStyle}>
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <input 
        type="email" placeholder="Email" value={email} 
        onChange={(e) => setEmail(e.target.value)} style={inputStyle} 
      />

      <select value={country} onChange={(e) => setCountry(e.target.value)} style={inputStyle}>
        <option value="">Select Country</option>
        <option>India</option>
        <option>USA</option>
        <option>UK</option>
        <option>Canada</option>
      </select>

      <input 
        type="tel" placeholder="Phone (10 digits)" value={phone} 
        onChange={(e) => setPhone(e.target.value)} style={inputStyle} 
      />

      <input 
        type="password" placeholder="Password (min 8 characters)" value={password} 
        onChange={(e) => setPassword(e.target.value)} style={inputStyle} 
      />
    </div>
  );
};