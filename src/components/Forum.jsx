import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL; // ✅ Read from .env

export default function Forum() {
  const [formData, setFormData] = useState({
    username: "", email: "", University: "", Program: "",
    Degree: "", Season: "", Status: "", Date: "",
    GPA: "", General_GRE: "", Verbal_GRE: "", Aw_GRE: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/applications/submit`, formData); // ✅ Dynamic URL
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="row">
      <div className="container mt-5 col-8 offset-2">
        <h2 className="mb-3">Submit Your Application</h2>
        <form onSubmit={handleSubmit} className="row g-3">
          {Object.keys(formData).map((field) => (
            <div className="col-md-6" key={field}>
            <input
              type={field === "Date" ? "date" : "text"}
              name={field}
              value={formData[field] || ""} // ✅ Prevent undefined
              onChange={handleChange}
              placeholder={field.replace("_", " ")}
              className="form-control"
            />
          </div>
          
          ))}
          <div className="col-12">
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
