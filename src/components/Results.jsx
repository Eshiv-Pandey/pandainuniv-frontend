import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const [univ, setUniv] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/home/show?Univ=${univ}`);
  };

  return (
    <div className="container mt-5">
      <h2>Search University Applications</h2>
      <div className="d-flex">
        <input
          type="text"
          value={univ}
          onChange={(e) => setUniv(e.target.value)}
          placeholder="Enter University Name"
          className="form-control"
        />
        <button className="btn btn-primary ms-2" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
