
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshStandardMaterial } from 'three';

export function Floor(props) { 
  const barkMaterial = new MeshStandardMaterial({ color: 'brown', roughness: 1 });
  const { nodes, materials } = useGLTF('/floor.gltf')
  return (
    <group {...props} dispose={null}>
      <group scale = {[4,4,4]} position={[0, 58.444, 32.157]} rotation={[-Math.PI / 2, 0, 0]}>
       
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_2.geometry}
          material={materials.mat3}
          position={[0, 0, -2.614]}
        />
        
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_1_1.geometry}
          material={barkMaterial}
        />
      </group>
    </group>
  )
}

useGLTF.preload('floor.gltf')

export default Floor;