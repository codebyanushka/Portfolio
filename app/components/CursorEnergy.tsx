"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorEnergy() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let trailPositions: { x: number; y: number }[] = [];

    // Create trail elements
    for (let i = 0; i < 5; i++) {
      const trail = document.createElement("div");
      trail.className = `fixed top-0 left-0 w-[${120 - i * 20}px] h-[${
        120 - i * 20
      }px] rounded-full bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-cyan-400/30 blur-xl mix-blend-screen pointer-events-none z-50`;
      document.body.appendChild(trail);
      trailRefs.current.push(trail as HTMLDivElement);
      trailPositions.push({ x: 0, y: 0 });
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", moveCursor);

    // GSAP animation loop
    gsap.ticker.add(() => {
      // Update main cursor
      gsap.to(cursor, {
        x: mouseX - 60,
        y: mouseY - 60,
        duration: 0.3,
        ease: "power3.out",
      });

      // Update trail with delay
      trailPositions.unshift({ x: mouseX, y: mouseY });
      if (trailPositions.length > 5) trailPositions.pop();

      trailRefs.current.forEach((trail, index) => {
        if (trail && trailPositions[index]) {
          gsap.to(trail, {
            x: trailPositions[index].x - (60 - index * 10),
            y: trailPositions[index].y - (60 - index * 10),
            duration: 0.2,
            ease: "power2.out",
          });
        }
      });

      // Pulsing effect
      cursor.style.transform = `scale(${
        1 + Math.sin(Date.now() * 0.002) * 0.1
      })`;
    });

    // Click effect
    const handleClick = () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      });
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("click", handleClick);
      trailRefs.current.forEach((trail) => trail.remove());
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 w-[120px] h-[120px] rounded-full 
                 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400
                 opacity-30 blur-xl mix-blend-screen z-50 transition-transform duration-300"
    />
  );
}