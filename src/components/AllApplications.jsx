import { useEffect, useState } from "react";
import axios from "axios";

export default function AllApplications() {
  const [all, setAll] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/applications/all`)
      .then((res) => setAll(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, [API_URL]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Applications</h2>
      <div className="row">
        {all.map((app) => (
          <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4" key={app._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{app.University}</h5>
                <p className="card-text">{app.Program}</p>
                <p>
                  <strong>Course:</strong> {app.Degree} <br />
                  <strong>Season:</strong> {app.Season}
                </p>
                <span className="badge bg-primary">{app.Status}</span>
              </div>
              <div className="card-footer text-muted">
                Added by: {app.user?.username || "Unknown"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
