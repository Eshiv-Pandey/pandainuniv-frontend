import React, { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL; // ✅ Use environment variable

function YourApplications() {
  const [name, setName] = useState("");
  const [applications, setApplications] = useState([]);

  const handleSearch = async () => {
    if (!name.trim()) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/applications?name=${name}`);
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      alert("Failed to fetch applications. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Your Applications</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleSearch}>
          Search
        </button>
      </div>

      <ul className="list-group">
        {applications.length > 0 ? (
          applications.map((app) => (
            <li key={app._id} className="list-group-item">
              <strong>{app.name}</strong> — {app.position} ({app.email})
            </li>
          ))
        ) : (
          <li className="list-group-item">No applications found.</li>
        )}
      </ul>
    </div>
  );
}

export default YourApplications;
