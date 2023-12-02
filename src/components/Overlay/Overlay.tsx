// import { useState } from "react";
import CenterTitle from "../CenterTitle/CenterTitle";
import Download from "../Download/Download";
// import TopLeft from "../TopLeft/TopLeft";
import Links from "../Links/Links";
// import BackButton from "../BackButton/BackButton";

export default function Overlay() {
  // const [showPortfolio, setShowPortfolio] = useState(false);

  // const handlePortfolio = () => {
  //   setShowPortfolio(!showPortfolio);
  // };
  return (
    <>
      <CenterTitle />
      <Download />
      <Links />
    </>
  );

  // return showPortfolio ? (
  //   <BackButton handlePortfolio={handlePortfolio} />
  // ) : (
  //   <>
  //     <CenterTitle />
  //     <Download />
  //     <TopLeft handlePortfolio={handlePortfolio} />
  //     <Links />
  //   </>
  // );
}
