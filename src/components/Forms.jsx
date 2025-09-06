import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import "./Forms.css"; // Import the new CSS
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Forms() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    University: "",
    Program: "",
    Degree: "",
    Season: "",
    Status: "",
    Date: "",
    GPA: "",
    General_GRE: "",
    Verbal_GRE: "",
    Aw_GRE: "",
    University_Other: "",
    Program_Other: "",
  });

  const [universities, setUniversities] = useState([]);
  const [programsByUniversity, setProgramsByUniversity] = useState({});
  const [useOtherUniversity, setUseOtherUniversity] = useState(false);
  const [useOtherProgram, setUseOtherProgram] = useState(false);

  const [uniSuggestions, setUniSuggestions] = useState([]);
  const [progSuggestions, setProgSuggestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/universities`);
        setUniversities(res.data.universities || []);
        setProgramsByUniversity(res.data.programsByUniversity || {});
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load university data.");
      }
    })();
  }, []);

  const getSuggestions = (value, source) => {
    const inputValue = value.trim().toLowerCase();
    return inputValue.length === 0
      ? source
      : source.filter((item) => item.toLowerCase().includes(inputValue));
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div className="react-autosuggest__suggestion">{suggestion}</div>
  );

  const handleUniChange = (e, { newValue }) => {
    setFormData({ ...formData, University: newValue, Program: "" });
  };

  const handleProgChange = (e, { newValue }) => {
    setFormData({ ...formData, Program: newValue });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (useOtherUniversity && formData.University_Other) {
        payload.University = formData.University_Other;
      }
      if (useOtherProgram && formData.Program_Other) {
        payload.Program = formData.Program_Other;
      }

      await axios.post(`${API_BASE_URL}/api/applications/submit`, payload);
      alert("Application submitted successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to submit application");
    }
  };

  const availablePrograms = formData.University
    ? programsByUniversity[formData.University] || []
    : [];

  const autosuggestTheme = {
    container: "position-relative",
    suggestionsContainer: "react-autosuggest__suggestions-container",
    suggestionsList: "react-autosuggest__suggestions-list",
    suggestion: "react-autosuggest__suggestion",
    suggestionHighlighted: "react-autosuggest__suggestion--highlighted",
  };

  return (
    <div className="row">
      <div className="container mt-5 col-10 col-md-8 col-lg-6">
        <h2 className="mb-3">Submit Your Application</h2>

        {error && <div className="alert alert-warning">{error}</div>}

        <form onSubmit={onSubmit} className="row g-3">
          {/* Name & Email */}
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          {/* University */}
          <div className="col-md-12">
            <label className="form-label">University</label>
            {!useOtherUniversity ? (
              <Autosuggest
                suggestions={uniSuggestions}
                onSuggestionsFetchRequested={({ value }) =>
                  setUniSuggestions(getSuggestions(value, universities))
                }
                onSuggestionsClearRequested={() => setUniSuggestions([])}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                  value: formData.University,
                  onChange: handleUniChange,
                  className: "form-control",
                  placeholder: "Type to search...",
                  required: true,
                }}
                theme={autosuggestTheme}
              />
            ) : (
              <input
                type="text"
                className="form-control"
                placeholder="Enter your university"
                value={formData.University_Other}
                onChange={(e) =>
                  setFormData({ ...formData, University_Other: e.target.value })
                }
                required
              />
            )}
            <div className="form-check mt-2">
              <input
                type="checkbox"
                className="form-check-input"
                checked={useOtherUniversity}
                onChange={(e) => {
                  setUseOtherUniversity(e.target.checked);
                  setFormData({
                    ...formData,
                    University: "",
                    University_Other: "",
                    Program: "",
                    Program_Other: "",
                  });
                  setUseOtherProgram(false);
                }}
              />
              <label className="form-check-label">
                My university is not listed
              </label>
            </div>
          </div>

          {/* Program */}
          <div className="col-md-12">
            <label className="form-label">Program</label>
            {!useOtherProgram ? (
              <Autosuggest
                suggestions={progSuggestions}
                onSuggestionsFetchRequested={({ value }) =>
                  setProgSuggestions(getSuggestions(value, availablePrograms))
                }
                onSuggestionsClearRequested={() => setProgSuggestions([])}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                  value: formData.Program,
                  onChange: handleProgChange,
                  className: "form-control",
                  placeholder: "Type to search...",
                  required: true,
                }}
                theme={autosuggestTheme}
              />
            ) : (
              <input
                type="text"
                className="form-control"
                placeholder="Enter your program"
                value={formData.Program_Other}
                onChange={(e) =>
                  setFormData({ ...formData, Program_Other: e.target.value })
                }
                required
              />
            )}
            <div className="form-check mt-2">
              <input
                type="checkbox"
                className="form-check-input"
                checked={useOtherProgram}
                onChange={(e) => {
                  setUseOtherProgram(e.target.checked);
                  setFormData({ ...formData, Program: "", Program_Other: "" });
                }}
              />
              <label className="form-check-label">
                My program is not listed
              </label>
            </div>
          </div>

          {/* Degree, Season, Status, Date */}
          <div className="col-md-6">
            <label className="form-label">Degree</label>
            <input
              type="text"
              className="form-control"
              value={formData.Degree}
              onChange={(e) =>
                setFormData({ ...formData, Degree: e.target.value })
              }
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Season</label>
            <select
              className="form-control"
              value={formData.Season}
              onChange={(e) =>
                setFormData({ ...formData, Season: e.target.value })
              }
              required
            >
              <option value="">Select Season</option>
              <option value="Fall">Fall</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Winter">Winter</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={formData.Status}
              onChange={(e) =>
                setFormData({ ...formData, Status: e.target.value })
              }
              required
            >
              <option value="">Select Status</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Waitlisted">Waitlisted</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Date</label><br/>
            <DatePicker
              selected={formData.Date ? new Date(formData.Date) : null}
              onChange={(date) =>
                setFormData({ ...formData, Date: date.toISOString().split("T")[0] })
              }
              className="form-control"
              placeholderText="Select a date"
              dateFormat="yyyy-MM-dd"
              required
            />
          </div>


          {/* Scores */}
          <div className="col-md-4">
            <label className="form-label">GPA</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4.0"
              className="form-control"
              value={formData.GPA}
              onChange={(e) =>
                setFormData({ ...formData, GPA: e.target.value })
              }
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">GRE General</label>
            <input
              type="number"
              min="260"
              max="340"
              className="form-control"
              value={formData.General_GRE}
              onChange={(e) =>
                setFormData({ ...formData, General_GRE: e.target.value })
              }
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">GRE Verbal</label>
            <input
              type="number"
              min="130"
              max="170"
              className="form-control"
              value={formData.Verbal_GRE}
              onChange={(e) =>
                setFormData({ ...formData, Verbal_GRE: e.target.value })
              }
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label mt-2">GRE AW</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="6"
              className="form-control"
              value={formData.Aw_GRE}
              onChange={(e) =>
                setFormData({ ...formData, Aw_GRE: e.target.value })
              }
              required
            />
          </div>

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
