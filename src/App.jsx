import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, Fragment } from 'react'
import { Suspense } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import Spheres from "./IScatter";
import * as THREE from "three";
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import './tooltip.css';

function App() {
  return (
    // <div id="container">
      <Canvas style={{overflow: "visible", width:"50vw",height:"50vh"}}>
        <OrbitControls enableZoom={true} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]}/>
        <Suspense fallback={null}>
        <primitive object={new THREE.AxesHelper(1.5)} />
        <Spheres />
        </Suspense>
      </Canvas>
      // </div>
  );
}

export default App;
