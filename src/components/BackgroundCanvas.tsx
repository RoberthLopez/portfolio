import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import JavascriptModel from "./Models/JavascriptModel";
// import ReactModel from "./components/Models/ReactModel";

export default function BackgroundCanvas({
  count = 100,
  depth = 80,
  easing = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2)),
}) {
  return (
    <Canvas
      // style={{ height: "100vh" }}
      // gl={{ alpha: false }}}
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ near: 0.01, far: depth + 15, fov: 30 }}
    >
      <color attach="background" args={["#ffbf40"]} />
      {/* <ambientLight intensity={1} /> */}
      <spotLight
        position={[10, 20, 10]}
        intensity={0.5}
        penumbra={1}
        color="orange"
      />

      <Environment preset="sunset" />
      {Array.from({ length: count }, (_, i) => (
        <JavascriptModel
          key={i}
          index={i}
          z={Math.round(easing(i / count) * depth)}
          speed={1}
        />
      ))}
      {/* {Array.from({ length: count }, (_, i) => (
          <JavascriptModel key={i} z={-(i / count) * depth - 20} />
        ))} */}
      {/* {Array.from({ length: count }, (_, i) =>
          i % 2 == 0 ? (
            <JavascriptModel key={i} z={-(i / count) * depth - 20} />
          ) : (
            <ReactModel key={i} z={-(i / count) * depth - 20} />
          )
        )} */}
      <EffectComposer multisampling={0}>
        <DepthOfField
          target={[0, 0, 60]}
          focalLength={0.4}
          bokehScale={14}
          height={700}
        />
      </EffectComposer>
    </Canvas>
  );
}
