import React from "react"
import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber"
import { useRef, useState, useEffect} from 'react'
import {MeshWobbleMaterial, OrbitControls, useHelper, Box, Text, Image} from "@react-three/drei"
import { useSpring, animated } from "@react-spring/three"
import { useGesture } from '@use-gesture/react'

const synchronyBanner = () => {
  return(
        <group>
        <Box args={[0.17, 1.925, 2.116]} position={[0.232, 2.814, 0.391]} rotation= {[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color={"Grey"}/>
        </Box>
        <Image  url={"/public/syncrhonyBanner"} scale={[2,1.825,1]} position = {[.232,2.814,.48]}/>
        </group>
  )
}

export default synchronyBanner