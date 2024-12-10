// Earth.js
import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';
import './Login.css'

function Earth() {
    const ref = useRef();
    const [scale, setScale] = useState([0, 0, 0]); // Start with a scale of 0 for the transition

    // Rotate the globe continuously
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.006; // Adjust the rotation speed here
        }
    });

    useEffect(() => {
        // Set a timeout to increase scale after component mounts
        const timeout = setTimeout(() => {
            setScale([1.2, 1.2, 1.2]); // Set to final scale after a brief delay
        }, 100); // Adjust the delay as necessary

        return () => clearTimeout(timeout);
    }, []);

    return (
        <Sphere ref={ref} args={[1, 64, 64]} position={[0, 0, 0]} scale={scale} className='earth'>
            <meshStandardMaterial
                attach="material"
                map={new THREE.TextureLoader().load("//unpkg.com/three-globe/example/img/earth-night.jpg")}
                roughness={0.7}
                metalness={0.2}
            />
        </Sphere>
    );
}

export default Earth;
