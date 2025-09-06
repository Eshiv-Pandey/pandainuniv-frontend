export default function Home() {
  return (
    <div className="row home">
      <div className="blue text-center py-5">
        <h1 className="mt-3">Share Your University Admission Results Now.</h1>
        <h2>Real Results. Real People. Real Grad Journeys.</h2>
        <br />
        <br />

        <h2>Your univ Journey,</h2>
        <h4>Now Less of a Mystery.</h4>
        <br />
        <a href="/home/forms">
          <button className="btn btn-primary submit-home" type="button">
            Submit Your Results
          </button>
        </a>
      </div>
    </div>
  );
}
