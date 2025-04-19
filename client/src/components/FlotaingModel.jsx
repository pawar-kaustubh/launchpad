// src/components/FloatingModel.jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function FloatingModel() {
  const group = useRef();
  const { scene } = useGLTF('/models/model.glb'); // Local model

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.3;
      group.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });

  return <primitive ref={group} object={scene} />;
}
