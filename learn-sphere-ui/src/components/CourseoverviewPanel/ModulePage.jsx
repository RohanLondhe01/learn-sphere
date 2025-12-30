import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import ProgressBar from "./ProgressBar.jsx"; 

const ModulePage = () => {
  const { moduleId } = useParams();
  const location = useLocation();
  const currentCourse = location.state?.courseData;

  
//   const [progress,setProgress] = useState(() =>{
//   const saved = localStorage.getItem(`course_${courseID}_progress`);
//   return saved ? parseInt(saved) : (location.state?.courseData?.progress || 0);
// });
//   const currentCourse = location.state?.courseData;
//   useEffect(() => {
//     localStorage.setItem(`course_${courseId}_progress`, progress);
//   }, [progress, courseId]);

//   const handleComplete = () => {
//     if (progress < 100) {
//       setProgress(prev => Math.min(prev + 25, 100)); // Increase by 25% each click
//     }
//   };
  return (
    <div style={{ padding: '30px' }}>
      <Link to="/dashboard">← Back</Link>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <h1>{currentCourse?.title || "Course Content"}</h1>
        
        {/* 2. Pass the progress from the suitcase to the ProgressBar */}
        <div style={{ width: '150px' }}>
          <ProgressBar percentage={currentCourse?.progress || 0} />
        </div>
      </div>

      <div style={{ marginTop: '30px', height: '400px', background: '#b4d8e3ff', borderRadius: '12px' }}>
        <h2 style={{ margin: 0 }}>Video Content for Module {moduleId}</h2>
        {/* Video Placeholder */}
      </div>
    </div>
  );
};
export default ModulePage;