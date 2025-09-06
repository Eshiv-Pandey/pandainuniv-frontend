import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home";
import Admissions from "./components/YourApplications";
import Results from "./components/Results";
import Forms from "./components/Forms";
import ShowApplications from "./components/ShowApplications";
import AllApplications from "./components/AllApplications";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="d-flex flex-column min-vh-100">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/admissions" element={<Admissions />} />
          <Route path="/home/results" element={<Results />} />
          <Route path="/home/forms" element={<Forms />} />
          <Route path="/home/show" element={<ShowApplications />} />
          <Route path="/home/all" element={<AllApplications />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
