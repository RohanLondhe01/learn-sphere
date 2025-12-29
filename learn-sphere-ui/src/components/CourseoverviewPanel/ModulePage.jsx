// ModulePage.jsx
import React from "react";
import { useParams } from "react-router-dom";

const ModulePage = () => {
  const { courseId, moduleId } = useParams();
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome to Course {courseId}</h2>
      <p className="text-lg">You are in Module {moduleId}</p>
    </div>
  );
};

export default ModulePage;

