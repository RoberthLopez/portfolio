import "./TopLeft.css";

export default function TopLeft({
  handlePortfolio,
}: {
  handlePortfolio: () => void;
}) {
  return (
    <div className="top-left" onClick={() => handlePortfolio()}>
      <p>Portfolio</p>
    </div>
  );
}
