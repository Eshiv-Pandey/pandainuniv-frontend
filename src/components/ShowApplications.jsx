import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL; // ✅ Use environment variable

export default function ShowApplications() {
  const [applications, setApplications] = useState([]);
  const query = new URLSearchParams(useLocation().search);
  const Univ = query.get("Univ");

  useEffect(() => {
    if (Univ) {
      axios.get(`${API_BASE_URL}/api/applications/byuniversity`, {
        params: { Univ }
      })
      .then(res => setApplications(res.data))
      .catch(err => console.error("Error fetching applications:", err));
    }
  }, [Univ]);

  return (
    <div className="container mt-5">
      <h2>Applications for {Univ}</h2>
      <ul className="list-group mt-3">
        {applications.length > 0 ? (
          applications.map(app => (
            <li key={app._id} className="list-group-item">
              <b>{app.University}</b> - {app.Program} ({app.Status}) | GPA: {app.GPA}
            </li>
          ))
        ) : (
          <li className="list-group-item">No applications found for this university.</li>
        )}
      </ul>
    </div>
  );
}
