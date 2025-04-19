import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';

// =========================
// 3D Floating Model
// =========================
function FloatingModel({ url }) {
  const group = useRef();
  const { nodes, materials } = useGLTF(url);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.2;
    group.current.position.y = Math.sin(t) * 0.2;
  });
  return (
    <group ref={group} dispose={null}>
      <mesh geometry={nodes.Scene.children[0].geometry} material={materials.Material} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
    </group>
  );
}

// =========================
// Hero Section with Typed Text
// =========================
function Hero({ texts }) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [forward, setForward] = useState(true);

  useEffect(() => {
    let timeout;
    const full = texts[index];
    if (forward) {
      if (text.length < full.length) {
        timeout = setTimeout(() => setText(full.slice(0, text.length + 1)), 100);
      } else {
        timeout = setTimeout(() => setForward(false), 2000);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(full.slice(0, text.length - 1)), 50);
      } else {
        setForward(true);
        setIndex((i) => (i + 1) % texts.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, forward, index, texts]);

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} className="absolute inset-0 opacity-20 pointer-events-none">
        <ambientLight intensity={0.5} />
        <FloatingModel url="/models/low-poly-sphere.glb" />
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {text}
          </span>
          <span className="ml-1 animate-pulse">|</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Interactive dashboard for your startup metrics and analytics.
        </p>
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full font-semibold"
          >
            Edit Info
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 border-2 border-blue-400 rounded-full font-semibold text-white"
          >
            View Reports
          </motion.button>
        </div>
      </motion.div>

      <div className="absolute bottom-10 w-full flex justify-center animate-bounce">
        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

// =========================
// Dashboard Page
// =========================
export default function StartupDashboard() {
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetch('/api/startup/me')
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setForm(d);
      });
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const save = () => {
    fetch('/api/startup/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(setData)
      .finally(() => setEditing(false));
  };

  if (!data) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <>
      <Hero texts={["Innovate Together", "Grow Together"]} />

      <main className="space-y-12 p-6 max-w-5xl mx-auto">
        <section className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">General Info</h2>
            <button onClick={() => setEditing(!editing)} className="text-blue-500">
              {editing ? 'Cancel' : 'Edit'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['startupname','startupdesc','email','country','location','website','phone','industry','socials','team'].map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-600">{key}</label>
                {editing ? (
                  <input
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                ) : (
                  <p className="mt-1 text-gray-800">{data[key]}</p>
                )}
              </div>
            ))}
          </div>
          {editing && (
            <div className="mt-4 flex justify-end">
              <button onClick={save} className="px-4 py-2 bg-blue-500 text-white rounded">
                Save
              </button>
            </div>
          )}
        </section>

        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Financial Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['totalsales','revenue','profit','loss','valuation','equity','burnrate','runway'].map((key) => (
              <motion.div key={key} whileHover={{ scale: 1.02 }} className="p-4 bg-gray-50 rounded">
                <h3 className="text-xl font-bold mb-1">{data[key]}</h3>
                <p className="text-sm text-gray-600">{key}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}