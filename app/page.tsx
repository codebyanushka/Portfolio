"use client";
import Scene from "./components/Scene";
import Projects from "./components/Projects";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
    ).fromTo(
      subtitleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power4.out" },
      "-=0.6"
    );
  }, []);

  return (
   <main className="relative">
  {/* 3D CANVAS */}
  <Scene />

  {/* HERO CONTENT */}
  <section className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6">
    <h1
      ref={titleRef}
      className="text-5xl md:text-7xl font-light tracking-wide"
    >
      Portfolio
    </h1>

    <p
      ref={subtitleRef}
      className="mt-6 text-lg md:text-xl text-white/70 max-w-xl"
    >
      Creative Developer · Motion · 3D · Web · App Dev
    </p>
  </section>

  {/* SCROLL SPACE */}
  <section className="h-screen flex items-center justify-center text-white/40">
    Scroll Down
  </section>

  
</main>
  );}