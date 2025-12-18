import { useState } from "react";

export const GuardianInfo = () => {
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [guardianAddress, setGuardianAddress] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3 style={{ marginBottom: "1rem", color: "#4f46e5" }}>
        Guardian Information
      </h3>

      <input
        type="text"
        placeholder="Guardian Name"
        value={guardianName}
        onChange={(e) => setGuardianName(e.target.value)}
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="Guardian Phone"
        value={guardianPhone}
        onChange={(e) => setGuardianPhone(e.target.value)}
        style={inputStyle}
      />

      <input
        type="email"
        placeholder="Guardian Email"
        value={guardianEmail}
        onChange={(e) => setGuardianEmail(e.target.value)}
        style={inputStyle}
      />

      <textarea
        placeholder="Guardian Address"
        value={guardianAddress}
        onChange={(e) => setGuardianAddress(e.target.value)}
        style={{ ...inputStyle, height: "70px" }}
      />
    </div>
  );
};
