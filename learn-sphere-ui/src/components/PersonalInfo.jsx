import { useState, useEffect } from 'react';

export const PersonalInfo = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Load from localStorage
  useEffect(() => {
    setName(localStorage.getItem('studentName') || '');
    setDob(localStorage.getItem('studentDob') || '');
    setGender(localStorage.getItem('studentGender') || '');
    setEmail(localStorage.getItem('studentEmail') || '');
    setCountry(localStorage.getItem('studentCountry') || '');
    setPhone(localStorage.getItem('studentPhone') || '');
    setPassword(localStorage.getItem('studentPassword') || '');
  }, []);

  // Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem('studentName', name);
    localStorage.setItem('studentDob', dob);
    localStorage.setItem('studentGender', gender);
    localStorage.setItem('studentEmail', email);
    localStorage.setItem('studentCountry', country);
    localStorage.setItem('studentPhone', phone);
    localStorage.setItem('studentPassword', password);
  }, [name, dob, gender, email, country, phone, password]);

  // Shared input style
  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px'
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ marginBottom: '1rem', color: '#4f46e5' }}>Personal Information</h3>

      {/* Name */}
      <input 
        type="text" 
        placeholder="Full Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        style={inputStyle}
        required 
      />

      {/* Date of Birth */}
      <input 
        type="date" 
        value={dob} 
        onChange={(e) => setDob(e.target.value)} 
        style={inputStyle}
        required 
      />

      {/* Gender Dropdown */}
      <select 
        value={gender} 
        onChange={(e) => setGender(e.target.value)} 
        style={inputStyle}
        required
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      {/* Email */}
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        style={inputStyle}
        required 
      />

      {/* Country Dropdown (before phone) */}
      <select 
        value={country} 
        onChange={(e) => setCountry(e.target.value)} 
        style={inputStyle}
        required
      >
        <option value="">Select Country</option>
        <option>India</option>
        <option>USA</option>
        <option>UK</option>
        <option>Canada</option>
        <option>Australia</option>
      </select>

      {/* Phone (10 digits only) */}
      <input 
        type="tel" 
        placeholder="Phone (10 digits)" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        pattern="\d{10}" 
        title="Phone number must be exactly 10 digits" 
        style={inputStyle}
        required 
      />

      {/* Password */}
      <input 
        type="password" 
        placeholder="Password (min 8 characters)" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        minLength={8} 
        style={inputStyle}
        required 
      />
    </div>
  );
};

