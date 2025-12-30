import React from 'react';

const ProgressBar = ({ percentage = 0 }) => {
  const cleanPercentage = Math.min(Math.max(percentage, 0), 100);

  const fillStyle = {
    width: `${cleanPercentage}%`,
    height: '100%',
    backgroundColor: cleanPercentage === 100 ? '#10b981' : '#3b82f6',
    transition: 'width 0.5s ease-in-out',
    borderRadius: '10px'
  };

  const containerStyle = {
    width: '100%',
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '10px',
    marginTop: '5px'
  };

  return (
    <div style={{ width: '120px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 'bold' }}>
        <span>{cleanPercentage === 100 ? 'DONE' : 'PROGRESS'}</span>
        <span>{cleanPercentage}%</span>
      </div>
      <div style={containerStyle}>
        <div style={fillStyle}></div>
      </div>
    </div>
  );
};

export default ProgressBar;