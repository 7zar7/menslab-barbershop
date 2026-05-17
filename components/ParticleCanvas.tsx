"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const COUNT = 1200;
const ACCENT = new THREE.Color("#00E5FF");

/**
 * Hero particle field — "a server room at 3am".
 * Slow drift, gentle mouse repulsion within ~80px, fades on scroll.
 * Mounted only after the perf gate passes (see ParticleField).
 */
export default function ParticleCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    const home = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 140;
      const y = (Math.random() - 0.5) * 90;
      const z = (Math.random() - 0.5) * 60;
      positions.set([x, y, z], i * 3);
      home.set([x, y, z], i * 3);
      speeds[i] = 0.025 + Math.random() * 0.05;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Soft round sprite so points read as glowing dots, not squares.
    const sprite = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.35, "rgba(255,255,255,0.85)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    })();

    const material = new THREE.PointsMaterial({
      color: ACCENT,
      size: 1.6,
      map: sprite,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = new THREE.Vector2(-1000, -1000);
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let scrollFade = 1;
    const onScroll = () => {
      const y = window.scrollY;
      scrollFade = Math.max(0, 1 - (y / 100) * 0.2);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    const repel = new THREE.Vector3();
    const worldMouse = new THREE.Vector3();
    let raf = 0;
    let visible = true;
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    const clock = new THREE.Clock();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      const arr = geometry.attributes.position.array as Float32Array;

      worldMouse.set(mouse.x * 70, mouse.y * 45, 0);

      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        const drift = Math.sin(t * speeds[i] + i) * 0.3;
        let px = home[ix] + drift;
        let py = home[ix + 1] + Math.cos(t * speeds[i] + i) * 0.3;
        const pz = home[ix + 2];

        repel.set(px - worldMouse.x, py - worldMouse.y, 0);
        const d = repel.length();
        if (d < 12 && d > 0.0001) {
          const force = (1 - d / 12) * 4;
          repel.normalize();
          px += repel.x * force;
          py += repel.y * force;
        }
        arr[ix] = px;
        arr[ix + 1] = py;
        arr[ix + 2] = pz;
      }
      geometry.attributes.position.needsUpdate = true;
      points.rotation.y = t * 0.012;
      material.opacity = 0.5 * scrollFade;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
      style={{ willChange: "opacity" }}
    />
  );
}
