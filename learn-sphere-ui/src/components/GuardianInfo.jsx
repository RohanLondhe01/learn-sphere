import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure CSS is imported

export const GuardianInfo = () => {
  const [formData, setFormData] = useState({
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    guardianAddress: "",
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("guardian_draft");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Logic for the Save Draft button
  const handleSave = () => {
    localStorage.setItem("guardian_draft", JSON.stringify(formData));
    toast.info("Draft saved to local storage");
  };

  // Logic for the Submit button
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validation Check
    if (!formData.guardianName || !formData.guardianPhone) {
      toast.error("Please fill in Name and Phone before submitting.");
      return;
    }

    // 2. Sync with Local Storage (Final Save)
    localStorage.setItem("guardian_submitted_data", JSON.stringify(formData));
    
    // 3. Success Message
    toast.success("Saved successfully!"); 
    
    console.log("Final Data Submitted:", formData);
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box"
  };

  const btnBase = {
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
    flex: 1
  };

  return (
    <div style={{ marginBottom: "2rem", maxWidth: "500px" }}>
      {/* Container for the toasts to appear */}
      <ToastContainer position="top-right" autoClose={3000} />
      
      <h3 style={{ marginBottom: "1rem", color: "#4f46e5" }}>Guardian Information</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="guardianName"
          type="text"
          placeholder="Guardian Name"
          value={formData.guardianName}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="guardianPhone"
          type="text"
          placeholder="Guardian Phone"
          value={formData.guardianPhone}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="guardianEmail"
          type="email"
          placeholder="Guardian Email"
          value={formData.guardianEmail}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="guardianAddress"
          placeholder="Guardian Address"
          value={formData.guardianAddress}
          onChange={handleChange}
          style={{ ...inputStyle, height: "70px", resize: "none" }}
        />

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button 
            type="button" 
            onClick={handleSave}
            style={{ ...btnBase, backgroundColor: "#e0e7ff", color: "#4338ca" }}
          >
            Save Draft
          </button>
          
          <button 
            type="submit" 
            style={{ ...btnBase, backgroundColor: "#4f46e5", color: "white" }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};