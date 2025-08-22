import "./Footer.css"
export default function Footer() {
  return (
    <footer className="bg-light text-dark py-3 border-top w-100">
      <div className="container-fluid d-flex justify-content-between align-items-center px-4">
        <span>© 2025 PandainUniv</span>
        <div className="p-2">
          <a href="#" className="text-dark me-3">Terms of Use</a>
          <a href="#" className="text-dark me-3">Contact</a>
          <a href="#" className="text-dark me-3">
          <i class="fa-brands fa-x-twitter"></i> Twitter
          </a>
          <a href="#" className="text-dark">
            <i className="bi bi-reddit" style={{color:"red"}}></i> Reddit
          </a>
        </div>
      </div>
    </footer>
  );
}
