import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Mesh } from "three/src/objects/Mesh.js";

type GLTFResult = GLTF & {
  nodes: {
    ["react-logo"]: THREE.Mesh;
  };
  materials: {
    skin: THREE.MeshStandardMaterial;
  };
};

// type ContextType = Record<
//   string,
//   React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
// >;

export default function ReactModel({ z }: { z: number }) {
  const { nodes, materials } = useGLTF(
    "/react-logo-v1-transformed.glb"
  ) as GLTFResult;

  const ref = useRef<Mesh>(null);
  const { viewport, camera } = useThree();
  const { height } = viewport.getCurrentViewport(camera, [0, 0, z]);
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(height * 2), // rand value between -1 and 1
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame(() => {
    ref.current!.rotation.set(
      (data.rX += 0.001),
      (data.rY += 0.004),
      (data.rZ += 0.005)
    );
    ref.current!.position.set(data.x * viewport.width, (data.y += 0.01), z);
    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
    }
  });
  return (
    <mesh
      geometry={nodes["react-logo"].geometry}
      material={materials.skin}
      ref={ref}
      scale={0.3}
    />
  );
}
