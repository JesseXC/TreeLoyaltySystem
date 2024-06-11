import './App.css'
import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber"
import { useRef, useState, useEffect} from 'react'
import {MeshWobbleMaterial,Sphere, OrbitControls, useHelper, Box, Text, Image, Text3D} from "@react-three/drei"
import { AmbientLight, DirectionalLight, DirectionalLightHelper, MeshBasicMaterial, MeshStandardMaterial } from 'three'
import {useControls} from 'leva'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useSpring, animated } from "@react-spring/three"
import { useGesture } from '@use-gesture/react'
import Tree from './tree'
import Floor from './floor'
import synchronyBanner from './synchronyBanner'
const buttonStyle = {
  backgroundColor: '#fcd34d',  // Green background
  color: '#333',               // White text
  padding: '10px 20px',         // Padding around the text
  border: 'none',               // No border
  borderRadius: '15px',         // Rounded corners
  cursor: 'pointer',            // Pointer cursor on hover
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Subtle shadow
  outline: 'none',              // No outline on focus
  transition: 'transform 0.3s ease',
  margin: '20px 20px 20px 20px',
  width: '50%',
  height: '50%',// Smooth transform on click
};
const columnStyle = {
  flex: 1, 
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'start', // Adjusts spacing between children
  alignItems: 'center', 
  background: 'darkgray', 
  padding: '20px' // Adds some padding around the column
};
const cardStyle = {
  height:"45vh",
  background: '#fcd34d', 
  borderRadius: '8px', 
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
  margin: '5px', 
  textAlign: 'center', 
  width: '100%', // Ensures it fills the container
  padding: '10px', // Adds padding inside the card
  boxSizing: 'border-box' // Includes padding in width calculation
};

const Scene = () =>{
  const gltf = useLoader(GLTFLoader, '/chest.gltf');
  return (
    <>
            <group position={[100,350,-450]}>
      {/* Sun sphere */}
      <Sphere args={[5+5+10+20, 32+32+64+128, 32+32+64+128]} > {/* Sphere with radius 5, and 32 segments */}
        <meshStandardMaterial
          emissive='yellow'  // Makes the sphere glow with a yellow color
          color='yellow'
          emissiveIntensity={1}
        />
      </Sphere>

      {/* Sunlight */}
      <pointLight
        color='white'
        intensity={2}
        distance={100}  // Adjust the reach of the light
        decay={2}  // How quickly the light dims with distance
      />
    </group>
      <group scale = {[90,48,60]}position = {[-30,-215,137]}>
        <Box args={[0.17, 2.2, 3.116]} position={[0.232, 2.814, 0.391]} rotation= {[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color={"Grey"}/>
        </Box>
        <Image  url={"/public/synchronyBanner.jpg"} scale={[2.8,1.825,3]} position = {[.232,2.814,.48]}/>
      </group>
    <ambientLight/>
    <Floor position = {[75,-55,-23]}/>
    </>
  )
}
const App = () => {
  const [balance, setBalance] = useState('1,234.56');
  const [amountSpent, setAmountSpent] = useState(0);
  const [totalAmountSpent,setTotalAmountSpent] = useState(0);
  const [cashbackMultiplier, setCashbackMultiplier] = useState(0.02);  // Assuming 2% cashback
  const [cashbackEarned, setCashbackEarned] = useState(0);
  const [progress, setProgress] = useState(null);
  // Update the trees state to include scale
  const [trees, setTrees] = useState([{ x: 0, y: -15, z: 0, scale: 1 }]);
  const totalAmount = 1000;  // This is your total amount that defines 100%

  useEffect(() => {
    setProgress((amountSpent / totalAmount) * 100);
    setCashbackEarned(totalAmountSpent * cashbackMultiplier);
  }, [totalAmountSpent, cashbackMultiplier]);

  useEffect(() => {
    if (progress === 100) {
      // Add a new tree at a random position when progress hits 100%
      setTrees(prevTrees => [
        ...prevTrees,
        { x: Math.random() * 200 - 100, y: -15, z: Math.random() * 200 - 100, scale: 1 }
      ]);
      setAmountSpent(0); // Reset the amount spent to start progress over
    }
  }, [progress]);

  const handleSpend = () => {
    setTotalAmountSpent(prevAmountSpent => prevAmountSpent + 100)
    setAmountSpent(prevAmountSpent => prevAmountSpent + 100);
    // Grow trees slightly for each spend action
    
    setTrees(prevTrees => prevTrees.map(tree => ({
      ...tree,
      scale: tree.scale + 0.08  // Increase scale by 0.05 or any factor you prefer
    })));
  };
  const amountRelativeTo100 = (amountSpent / totalAmount) * 100;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={columnStyle}>
        <div style={cardStyle}>
          <img src={"../public/syncCard.png"} alt="Synchrony Credit Card" style={{ width: '80%',padding:"5px", height: 'auto', marginBottom: '10px' }}/>
          <h3>Account Balance:</h3>
          <p style={{ fontSize: '24px', color: '#4CAF50', fontWeight: 'bold' }}>${totalAmountSpent}</p>
        </div>
        <div style={cardStyle}>
          <h3>Total Spent:</h3>
          <p style={{ fontSize: '20px',color: '#4CAF50', marginBottom: '10px' }}>${totalAmountSpent.toFixed(2)}</p>
          <h3>Points Multiplier:</h3>
          <p style={{ fontSize: '20px', marginBottom: '10px' }}>{(cashbackMultiplier * 100).toFixed(0)}%</p>
          <h3>Points Earned:</h3>
          <p style={{ fontSize: '20px', marginBottom: '10px' }}>{cashbackEarned.toFixed(2)}</p>
          <h3>Trees Planted:</h3>
          <p style={{ fontSize: '20px', marginBottom: '10px' }}>{trees.length}</p>
        </div>
      </div>
      <div style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 3 }}>
          <Canvas camera={{ position: [0, 0, 20] }} style={{ backgroundColor: 'lightblue',width: '100%', height: '100%' }}>
            <OrbitControls />
            {trees.map((tree, index) => (
              <Tree key={index} position={[tree.x, tree.y, tree.z]} scale = {tree.scale} />
            ))}
            <Scene/>
          </Canvas>
        </div>
        <div style={{ height: '100px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', background: 'darkgrey' }}>
          <div style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
            <button onClick={handleSpend} style={buttonStyle}>Spend Money</button>
            <div style={{ width: '150px', height: '20px', background: 'lightgrey', borderRadius: '5px', position: 'relative' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: '#fcd34d', borderRadius: '5px' }}></div>
              <span style={{ position: 'absolute', width: '100%', textAlign: 'center', color: 'black', fontSize: '12px' }}>
                ${amountRelativeTo100.toFixed(0)}/100
              </span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: '10px', right: '10px', width: '200px', backgroundColor: 'lightgrey', borderRadius: '5px' }}>
        <div style={{ width: `${progress}%`, height: '20px', backgroundColor: '#fcd34d', borderRadius: '5px', transition: 'width 0.3s' }}>
        </div>
      </div>
    </div>
  );
}

export default App;
