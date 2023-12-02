import "./BackButton.css";

export default function BackButton({
  handlePortfolio,
}: {
  handlePortfolio: () => void;
}) {
  return (
    <div className="back-button" onClick={() => handlePortfolio()}>
      <p>Back</p>
    </div>
  );
}
