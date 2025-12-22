import { useState, useEffect } from 'react';

export const PAcademic = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    setRollNumber(localStorage.getItem('studentRollNumber') || '');
    setCourse(localStorage.getItem('studentCourse') || '');
    setYear(localStorage.getItem('studentYear') || '');
  }, []);

 
  useEffect(() => {
    localStorage.setItem('studentRollNumber', rollNumber);
    localStorage.setItem('studentCourse', course);
    localStorage.setItem('studentYear', year);
  }, [rollNumber, course, year]);


  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px'
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ marginBottom: '1rem', color: '#4f46e5' }}>Academic Information</h3>

      {/* Roll Number (alphanumeric) */}
      <input
        type="text"
        placeholder="Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
        pattern="^[A-Za-z0-9\-_/]+$"
        title="Roll number can include letters, numbers, and - _ /"
        style={inputStyle}
        required
      />

      {}
      <select
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        style={inputStyle}
        required
      >
        <option value="">Select Course</option>
        <option>B.E. Computer Science</option>
        <option>B.Tech Information Technology</option>
        <option>B.E. Electronics</option>
        <option>B.Com</option>
        <option>B.Sc</option>
        <option>Other</option>
      </select>

      {/* Year (numeric; 1 to 5 typically) */}
      <input
        type="number"
        placeholder="Year (e.g., 1–5)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        min={1}
        max={5}
        style={inputStyle}
        required
      />
    </div>
  );
};