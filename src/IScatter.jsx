import * as THREE from "three";
import React, { Fragment, useRef, useState, useMemo, useLayoutEffect } from "react";
// import ReactDOM from "react-dom";
// import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stats, Html } from "@react-three/drei";
import { useEffect } from "react";
import { DoubleSide } from "three";
import data from "./story.json";
import StoryGlyph from "./Tooltip";

const points = [ [1, 0, -1], [0, 1, -0.5], [0.5, 0.5, 0.5], [1,0.25,-1], [1,0,1], [0,1,0.5] ];
// const content = ["Shantam", "Rishabh", "Hello World", "ETH", "Drone", "Trevor"];
const colors = [0,0,0,5,5,5];
// const hues = [...new Array(10)].map((_, i) => Math.floor((255 / 10) * i));

// const lightTransparentColorsByLabel = hues.map(
//   hue => `hsla(${hue}, 100%, 50%, 0.05)`
// );
// console.log(lightTransparentColorsByLabel);
// const heavyTransparentColorsByLabel = hues.map(
//   hue => `hsla(${hue}, 100%, 50%, 0.75)`
// );
// //const opaqueColorsByLabel = hues.map(hue => `hsla(${hue}, 100%, 50%, 1)`);

// const opaqueColorsByLabel = [
//   "hsla(0, 100%, 50%, 1)",
//   "hsla(240, 100%, 50%, 1)",
//   "hsla(51, 100%, 50%, 1)",
//   "hsla(76, 100%, 50%, 1)",
//   "hsla(102, 100%, 50%, 1)",
//   "hsla(127, 100%, 50%, 1)",
//   "hsla(153, 100%, 50%, 1)",
//   "hsla(178, 100%, 50%, 1)",
//   "hsla(204, 100%, 50%, 1)",
//   "hsla(229, 100%, 50%, 1)"
// ]
const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();
const tempSphere = new THREE.Object3D();
// const axesHelper = new THREE.AxesHelper( 5 );

const Spheres = () => {
  const material = new THREE.MeshLambertMaterial({ opacity: 0.5, side: THREE.DoubleSide, transparent: true,});
  const spheresGeometry = new THREE.SphereBufferGeometry(0.25, 15, 15);

  const ref = useRef();
  // const meshRef = useRef();
  const prevRef = useRef();
  // const [active, setActive] = useState(false);
  // const [hover, setHover] = useState(false);
  const [hovered, set] = useState();

  // const colorArray = useMemo(() => colors.map((val, row) => tempColor.set(new THREE.Color(`hsl(${val*100}, 100%, 50%)`))), []);
  // tempColor = useMemo(() => colors.map((val, row) => tempColor.set(new THREE.Color(`hsl(${val*100}, 100%, 50%)`))), []);
  // console.log("Temp Color Array -",tempColor);
  // console.log("Color Array -",colorArray);

  useEffect(() => {
        //  (prevRef.current = hovered)

    points.map(function (val, row) {
        // console.log(val, row);
        tempSphere.position.set(val[0], val[1], val[2]);
        tempSphere.updateMatrix();
        ref.current.setMatrixAt(row, tempSphere.matrix);
        ref.current.setColorAt(row, new THREE.Color(`hsl(${colors[row]*100}, 100%, 50%)`));
       
      });
      if (hovered !== prevRef.current) {
        // (row === hovered ? tempColor.setRGB(10, 10, 10) : colorArray).map((val, id)=>ref.current.setColorAt(id,val));
        ref.current.setColorAt(hovered, new THREE.Color("hsl(43, 100%, 50%)"));
        ref.current.instanceColor.needsUpdate = true;
        // ref.current.geometry.attributes.color.needsUpdate = true;
      }
    ref.current.instanceMatrix.needsUpdate = true;
    // ref.current.geometry.attributes.color.needsUpdate = true;
    // ref.current.geometry.attributes.opacity.needsUpdate = true;
    // ref.current.instanceOpacity.needsUpdate = true;

    // ref.current.instanceColor.needsUpdate = true;
  },[hovered]);

  // useLayoutEffect(() => {

  // });

  return (
        <instancedMesh 
        // onClick={() => {setActive(!active);}}
        // onPointerOver={() => {setActive(!active);setHover(true);}}
        // onPointerOut={() => {setHover(false);}} 
        onPointerOver={(e) => (e.stopPropagation(), set(e.instanceId))}
        onPointerOut={(e) => set(undefined)}
        ref={ref} rotation={[0,30,0]} args={[spheresGeometry, material, 15]}>
        <Html distanceFactor={5}>
        {/* <div className="content">
          {content[hovered]}
        </div> */}
          <StoryGlyph title={data.title} story={data.story} author={data.author}></StoryGlyph>

      </Html>
      </instancedMesh>
  );
};

export default Spheres;