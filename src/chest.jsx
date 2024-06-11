import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import {MeshWobbleMaterial, OrbitControls, useHelper, Box, Text} from "@react-three/drei"

export function Chest(props) {
  const { nodes, materials } = useGLTF("/chest.gltf");
  return (
    <group dispose={null}>
      <group position={position}>
        <Box args={[4, 5, .5]} position={[8,0,0]}>
              <meshStandardMaterial color = {"red"} opacity={0.1} transparent/>
        </Box>
        <Box args={[4, 5, .5]} position={[-8,0,0]}>
              <meshStandardMaterial color = {"red"} opacity={0.1} transparent/>
        </Box>
        <Box args={[4, 5, .5]} position={[0,-8,0]}>
              <meshStandardMaterial color = {"red"} opacity={0.1} transparent/>
        </Box>
        <Box args={[4, 5, .5]} position={[0,8,0]}>
              <meshStandardMaterial color = {"red"} opacity={0.1} transparent/>
        </Box>
        <group
          position={[0, 0, 0]}
          rotation={[0, 4.39, 0]}
          scale={[0.014+.1, .1+0.014, 0.014+.1]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder001_1.geometry}
            material={materials["Material.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder001_2.geometry}
            material={materials.Material_0}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/chest.gltf");

export default Chest;