import "./Download.css";

export default function Download() {
  return (
    <div className="download-cv">
      <a
        href="/lopez-roberth-cv.pdf"
        download="lopez-roberth-cv"
        target="_blank"
        rel="noreferrer"
      >
        <p>Download CV</p>
      </a>
    </div>
  );
}
