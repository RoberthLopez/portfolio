import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_13: THREE.Mesh;
    Object_13_1: THREE.Mesh;
  };
  materials: {
    JAVASCRIPT: THREE.MeshStandardMaterial;
    BORDAS_CROMADO: THREE.MeshStandardMaterial;
  };
};

// type ContextType = Record<
//   string,
//   React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
// >;

export default function JavascriptModel({
  z,
  index,
  speed = 1,
}: {
  z: number;
  index: number;
  speed: number;
}) {
  const { nodes, materials } = useGLTF(
    "/javascript-transformed.glb"
  ) as GLTFResult;
  const ref = useRef<THREE.Group>(null);
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2), // rand value between -1 and 1
    y: THREE.MathUtils.randFloatSpread(height * 2),
    rX: Math.random() * Math.PI,
    rY: THREE.MathUtils.randFloat(8, 12),
    rZ: Math.random() * Math.PI,
  });

  const [click, setClick] = useState(false);
  const [scale, setScale] = useState(3); // Initial scale

  useFrame((state, dt) => {
    // ref.current!.rotation.set(
    //   (data.rX += 0.001),
    //   (data.rY += 0.004),
    //   (data.rZ += 0.005)
    // );
    // ref.current!.position.set(data.x * viewport.width, (data.y += 0.04), z);
    // if (data.y > height / 1.5) {
    //   data.y = -height / 1.5;
    // }
    // Make the X position responsive, slowly scroll objects up at the Y, distribute it along the Z
    // dt is the delta, the time between this frame and the previous, we can use it to be independent of the screens refresh rate
    // We cap dt at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
    if (dt < 0.1)
      ref.current!.position.set(
        index === 0 ? 0 : data.x * width,
        (data.y += dt * speed),
        -z
      );
    // Rotate the object around
    ref.current!.rotation.set(
      (data.rX += dt / data.rY),
      Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
      (data.rZ += dt / data.rY)
    );

    // Update scale gradually over 0.5 seconds
    const targetScale = click ? 5 : 3; // Define your target scale
    const scaleDelta = (targetScale - scale) / 0.5; // Calculate scale delta for 4 seconds
    setScale((prevScale) => prevScale + scaleDelta * dt);
    ref.current!.scale.set(scale, scale, scale);

    // If they're too far up, set them back to the bottom
    if (data.y > height * (index === 0 ? 4 : 1))
      data.y = -(height * (index === 0 ? 4 : 1));
  });
  return (
    <group
      ref={ref}
      scale={[scale, scale, scale]}
      onClick={() => setClick(!click)}
    >
      <mesh
        geometry={nodes.Object_13.geometry}
        material={materials.JAVASCRIPT}
      />
      <mesh
        geometry={nodes.Object_13_1.geometry}
        material={materials.BORDAS_CROMADO}
      />
    </group>
  );
}
