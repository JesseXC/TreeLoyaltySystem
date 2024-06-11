import React from 'react';
import { useGLTF } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';

export function Tree({ scale, position, ...props }) {
  const { nodes } = useGLTF('/tree.gltf');

  // Create custom materials
  const barkMaterial = new MeshStandardMaterial({ color: 'brown', roughness: 1 });
  const leavesMaterial = new MeshStandardMaterial({ color: 'green', roughness: 0.8, metalness: 0.2 });

  // Convert scale number to scale array if necessary
  const scaleArray = typeof scale === 'number' ? [scale, scale, scale] : scale;

  return (
    <group position={position} scale={scaleArray} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={barkMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0_1.geometry}
        material={leavesMaterial}
      />
    </group>
  );
}

useGLTF.preload("/tree.gltf");
export default Tree;
