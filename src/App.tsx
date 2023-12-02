import { Suspense } from "react";
import BackgroundCanvas from "./components/BackgroundCanvas";
import Overlay from "./components/Overlay/Overlay";
import Transition from "./components/Transition/Transition";

export default function App() {
  return (
    <>
      <Suspense fallback={null}>
        <BackgroundCanvas />
        <Transition />
      </Suspense>
      <Overlay />
    </>
  );
}
