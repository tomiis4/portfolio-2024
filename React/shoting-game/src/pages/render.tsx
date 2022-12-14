import {PerspectiveCamera} from '@react-three/drei'
import {OrbitControls} from '@react-three/drei/core'
import {Canvas} from '@react-three/fiber'
import * as THREE from 'three'

const degToRad = (deg: number) => deg * (Math.PI / 180.00)

const Ground = () => {
  return (
    <mesh rotation={[degToRad(90),0,0]}>
      <planeGeometry args={[100,100, 1,1]} />
      <meshBasicMaterial side={THREE.DoubleSide} />
    </mesh>
  );
}

function Render() {


  return (
    <Canvas shadows id="render-canvas">
      <PerspectiveCamera makeDefault position={[1,4,0]} />
      <ambientLight intensity={0.5} />
      <OrbitControls enablePan={false} />
      
      <Ground />
    </Canvas>
  )
}

export default Render
