export default function Portfolio({
  handlePortfolio,
}: {
  handlePortfolio: () => void;
}) {
  return <div onClick={() => handlePortfolio()}>Portfolio</div>;
}
