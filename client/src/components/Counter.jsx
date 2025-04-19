// src/components/Counter.jsx
import { useState, useEffect, useRef } from "react";

const Counter = ({ target, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const requestRef = useRef();
  const startTimeRef = useRef(null);
  const startValueRef = useRef(0);

  // Easing function for smooth animation
  const easeOutQuad = (t) => t * (2 - t);

  const animate = (timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp || performance.now();
      startValueRef.current = count;
    }
    
    const elapsed = (timestamp || performance.now()) - startTimeRef.current;
    const progress = Math.min(elapsed / (duration * 1000), 1);
    const easedProgress = easeOutQuad(progress);
    const currentCount = Math.floor(easedProgress * target);
    
    setCount(currentCount);
    
    if (progress < 1) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    // Start animation when component mounts
    requestRef.current = requestAnimationFrame(animate);
    
    // Clean up on unmount
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  return <span>{count.toLocaleString()}+</span>;
};

export default Counter;