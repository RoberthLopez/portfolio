import { Suspense } from "react";
import BackgroundCanvas from "./components/BackgroundCanvas";
import Overlay from "./components/Overlay/Overlay";
import Transition from "./components/Transition/Transition";
import Links from "./components/Links/Links";
import Download from "./components/Download/Download";

export default function App() {
  return (
    <>
      <Suspense fallback={null}>
        <BackgroundCanvas />
        <Transition />
      </Suspense>
      <Overlay />
      <Download />
      <Links />
    </>
  );
}
