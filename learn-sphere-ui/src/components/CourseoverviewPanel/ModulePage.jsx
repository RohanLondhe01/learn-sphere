import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import ProgressBar from "./ProgressBar.jsx"; 

const ModulePage = () => {
  const { moduleId } = useParams();
  const location = useLocation();
  
  const currentCourse = location.state?.courseData;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <Link to="/dashboard" style={{ color: '#3b82f6', textDecoration: 'none' }}>
        ← Back to Dashboard
      </Link>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '20px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px'
      }}>
        <div>
          <h1 style={{ margin: 0 }}>{currentCourse?.title || "Course"}</h1>
          <p style={{ color: '#666' }}>Current: Module {moduleId}</p>
        </div>

        {currentCourse && (
          <ProgressBar percentage={currentCourse.progress} />
        )}
      </div>

      <div style={{ 
        marginTop: '30px', 
        height: '300px', 
        border: '2px dashed #ccc', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: '12px',
        color: '#999'
      }}>
        Video Player Area for Module {moduleId}
      </div>
    </div>
  );
};

export default ModulePage;