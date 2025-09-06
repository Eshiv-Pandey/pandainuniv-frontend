import "./Navbar.css"; 

export default function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg sticky-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">PandaInUniv</a>
    <img src="https://www.pandainuniv.com/logo.png" alt="Panda Logo" class="nav-img"/>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/home">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/home/forms">Submit Your Results</a>
        </li>
        
        <li class="nav-item">
          <a class="nav-link " aria-disabled="true">Blog</a>
        </li>
        <li class="nav-item">
        <a class="nav-link " href="#">Forms</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/home/all">All Applications</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}

