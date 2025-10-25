import { useEffect, useRef, useState } from "react";

export default function AnimatedBackground() {
  // Current interpolated glow position and animation values
  const [pos, setPos] = useState({ x: 50, y: 50 });

  // Target position (where the mouse is pointing)
  const target = useRef({ x: 50, y: 50 });

  // Holds the requestAnimationFrame ID so we can cancel it later
  const raf = useRef(null);

  // Linear interpolation — moves a value smoothly toward another
  const lerp = (a, b, t) => a + (b - a) * t;

  useEffect(() => {
    // === 1️⃣ Capture mouse position and convert to % of viewport ===
    const onMove = (e) => {
      const x = (e.clientX / innerWidth) * 100;
      const y = (e.clientY / innerHeight) * 100;
      // Prevent the glow from going off the page edges
      target.current = {
        x: Math.min(95, Math.max(5, x)),
        y: Math.min(95, Math.max(5, y)),
      };
    };

    // Listen to global mouse movements
    addEventListener("mousemove", onMove, { passive: true });

    // === 2️⃣ Animation loop using requestAnimationFrame ===
    const tick = (t) => {
      // Subtle automatic drifting movement (so it never feels static)
      const driftX = Math.sin(t * 0.00006) * 8; // horizontal wave
      const driftY = Math.cos(t * 0.00005) * 6; // vertical wave

      // Smooth breathing effect (slow size and opacity oscillation)
      const pulse = (Math.sin(t * 0.0002) + 1) / 2; // value between 0–1
      const size = 90 + pulse * 12;                 // gradient size: 90% → 102%
      const alpha = 0.12 + pulse * 0.08;            // inner green opacity: 0.12 → 0.20
      const alphaMid = 0.07 + pulse * 0.05;         // mid layer opacity
      const alphaEdge = 0.02 + pulse * 0.02;        // outer glow opacity

      // Smoothly update the glow position and pulse parameters
      setPos((p) => ({
        x: lerp(p.x, target.current.x + driftX, 0.08), // smooth horizontal follow
        y: lerp(p.y, target.current.y + driftY, 0.08), // smooth vertical follow
        size,
        alpha,
        alphaMid,
        alphaEdge,
      }));

      // Schedule the next animation frame (≈60 fps)
      raf.current = requestAnimationFrame(tick);
    };

    // Start the animation loop
    raf.current = requestAnimationFrame(tick);

    // === 3️⃣ Cleanup when the component unmounts ===
    return () => {
      removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // === 4️⃣ Extract safe defaults for the first render ===
  const size = pos.size ?? 90;
  const a0 = pos.alpha ?? 0.12;
  const a1 = pos.alphaMid ?? 0.07;
  const a2 = pos.alphaEdge ?? 0.02;

  // === 5️⃣ Render the full-screen background ===
  return (
    <div
      // Fixed so it stays behind all content, even when scrolling
      className="fixed inset-0 -z-10 h-screen w-screen pointer-events-none transition-all duration-500"
      style={{
        // Radial gradient that moves and breathes dynamically
        background: `
          radial-gradient(
            ${size}% ${size}% at ${pos.x}% ${pos.y}%,
            rgba(0,255,157,${a0}) 0%,   /* inner glow (subtle green) */
            rgba(0,255,157,${a1}) 35%,  /* mid fade */
            rgba(0,255,157,${a2}) 60%,  /* soft edge */
            rgba(0,0,0,1) 100%          /* deep black outer background */
          )
        `,
      }}
    />
  );
}
