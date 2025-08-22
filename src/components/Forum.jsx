import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Forum() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    university: "",
    program: "",
    degree: "",
    season: "",
    status: "",
    date: "",
    gpa: "",
    general_gre: "",
    verbal_gre: "",
    aw_gre: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/applications/submit`, formData);
      alert("Application submitted successfully!");
      setFormData({
        username: "",
        email: "",
        university: "",
        program: "",
        degree: "",
        season: "",
        status: "",
        date: "",
        gpa: "",
        general_gre: "",
        verbal_gre: "",
        aw_gre: ""
      });
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
                type={field === "date" ? "date" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.replace(/_/g, " ")}
                className="form-control"
              />
            </div>
          ))}
          <div className="col-12">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
