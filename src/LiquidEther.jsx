import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./LiquidEther.css";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.5;
    mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);

    for (int i = 0; i < 4; i++) {
      value += amp * noise(p);
      p = rot * p * 2.05 + 0.17;
      amp *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspectUv = uv;
    aspectUv.x *= uResolution.x / max(uResolution.y, 1.0);

    vec2 mouse = uMouse;
    mouse.x *= uResolution.x / max(uResolution.y, 1.0);
    float mouseGlow = smoothstep(0.42, 0.0, distance(aspectUv, mouse));

    float t = uTime * 0.13;
    vec2 flow = vec2(
      fbm(aspectUv * 1.35 + vec2(t, -t * 0.42)),
      fbm(aspectUv * 1.45 + vec2(-t * 0.36, t * 0.7))
    );

    vec2 warped = aspectUv + (flow - 0.5) * 0.38 + mouseGlow * 0.12;
    float ether = fbm(warped * 2.2 + vec2(t * 0.8, -t * 0.25));
    float veil = fbm(warped * 4.4 - vec2(t * 0.42, t * 0.35));
    float ribbons = sin((warped.x + ether * 0.42) * 8.0 + uTime * 0.38) * 0.5 + 0.5;

    vec3 color = mix(uColorA, uColorB, smoothstep(0.18, 0.95, ether));
    color = mix(color, uColorC, smoothstep(0.56, 0.96, ribbons) * 0.58);
    color += uColorB * mouseGlow * 0.32;
    color *= 0.42 + veil * 0.54;

    float vignette = smoothstep(0.95, 0.22, distance(uv, vec2(0.5)));
    float alpha = (0.22 + ether * 0.5 + ribbons * 0.18 + mouseGlow * 0.24) * vignette;

    gl_FragColor = vec4(color, alpha);
  }
`;

export default function LiquidEther({
  colors = ["#1b5cff", "#b7f8ff", "#ff6aa8"],
  className = "",
}) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.1));
    renderer.domElement.className = "liquid-ether-canvas";
    host.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uColorA: { value: new THREE.Color(colors[0]) },
      uColorB: { value: new THREE.Color(colors[1]) },
      uColorC: { value: new THREE.Color(colors[2]) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(window.innerHeight || rect.height));
      renderer.setSize(width, height, false);
      renderer.domElement.dataset.renderHeight = String(height);
      uniforms.uResolution.value.set(width, height);
    };

    const onPointerMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      uniforms.uMouse.value.set(
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height,
      );
    };

    const observer = new ResizeObserver(() => requestAnimationFrame(resize));
    observer.observe(host);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    resize();

    let frameId;
    let isVisible = false;
    let isDisposed = false;
    const start = performance.now();
    const render = () => {
      if (isDisposed || !isVisible || document.hidden) {
        frameId = undefined;
        return;
      }
      uniforms.uTime.value = (performance.now() - start) / 1000;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };
    const startRender = () => {
      if (!frameId && isVisible && !document.hidden) {
        frameId = requestAnimationFrame(render);
      }
    };
    const stopRender = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = undefined;
    };
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible) startRender();
        else stopRender();
      },
      { rootMargin: "240px 0px", threshold: 0 },
    );
    const onVisibilityChange = () => {
      if (document.hidden) stopRender();
      else startRender();
    };
    visibilityObserver.observe(host);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      isDisposed = true;
      stopRender();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer.disconnect();
      visibilityObserver.disconnect();
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [colors]);

  return <div ref={hostRef} className={`liquid-ether-container ${className}`} aria-hidden="true" />;
}
