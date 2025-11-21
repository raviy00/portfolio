import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface FloatingObject {
  mesh: THREE.Mesh | THREE.LineSegments;
  velocity: { x: number; y: number; z: number };
  targetRotation: { x: number; y: number; z: number };
}

export default function Enhanced3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const objectsRef = useRef<FloatingObject[]>([]);
  const scrollYRef = useRef(0);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.Fog(0x0a0a0a, 150, 1000);
    sceneRef.current = scene;

    // Camera setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xff0000, 0.4);
    directionalLight.position.set(20, 20, 20);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0xff0000, 0.6, 100);
    pointLight1.position.set(-30, 10, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ffff, 0.3, 100);
    pointLight2.position.set(30, -10, -20);
    scene.add(pointLight2);

    // Create floating 3D objects
    const createFloatingObject = (
      type: 'box' | 'sphere' | 'torus' | 'octahedron',
      x: number,
      y: number,
      z: number,
      scale: number
    ) => {
      let geometry: THREE.BufferGeometry;

      switch (type) {
        case 'sphere':
          geometry = new THREE.IcosahedronGeometry(scale, 4);
          break;
        case 'torus':
          geometry = new THREE.TorusGeometry(scale, scale * 0.4, 16, 100);
          break;
        case 'octahedron':
          geometry = new THREE.OctahedronGeometry(scale, 2);
          break;
        default:
          geometry = new THREE.BoxGeometry(scale, scale, scale);
      }

      const material = new THREE.MeshPhongMaterial({
        color: Math.random() > 0.5 ? 0xff0000 : 0x00ffff,
        emissive: Math.random() > 0.5 ? 0xff0000 : 0x00ffff,
        emissiveIntensity: 0.2,
        wireframe: Math.random() > 0.6,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      scene.add(mesh);

      objectsRef.current.push({
        mesh,
        velocity: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        targetRotation: {
          x: Math.random() * Math.PI * 2,
          y: Math.random() * Math.PI * 2,
          z: Math.random() * Math.PI * 2,
        },
      });
    };

    // Create a grid of floating objects (optimized for performance)
    const spacing = 50;
    const objectCount = 20; // Limit number of objects for better performance
    for (let i = 0; i < objectCount; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      const types: Array<'box' | 'sphere' | 'torus' | 'octahedron'> = [
        'box',
        'sphere',
        'torus',
        'octahedron',
      ];
      const type = types[Math.floor(Math.random() * types.length)];
      createFloatingObject(type, x, y, z, 2 + Math.random() * 2);
    }

    // Event listeners
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = (e.clientX / window.innerWidth) * 2 - 1;
      mouseYRef.current = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || width;
      const newHeight = containerRef.current?.clientHeight || height;

      if (cameraRef.current) {
        cameraRef.current.aspect = newWidth / newHeight;
        cameraRef.current.updateProjectionMatrix();
      }

      if (rendererRef.current) {
        rendererRef.current.setSize(newWidth, newHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Update floating objects
      objectsRef.current.forEach((obj) => {
        // Movement
        obj.mesh.position.x += obj.velocity.x;
        obj.mesh.position.y += obj.velocity.y;
        obj.mesh.position.z += obj.velocity.z;

        // Bounce off boundaries
        if (Math.abs(obj.mesh.position.x) > 50) obj.velocity.x *= -1;
        if (Math.abs(obj.mesh.position.y) > 50) obj.velocity.y *= -1;
        if (Math.abs(obj.mesh.position.z) > 50) obj.velocity.z *= -1;

        // Rotation
        obj.mesh.rotation.x += 0.002;
        obj.mesh.rotation.y += 0.003;
        obj.mesh.rotation.z += 0.001;
      });

      // Camera movement based on scroll and mouse
      if (cameraRef.current) {
        cameraRef.current.position.y = -scrollYRef.current * 0.02;
        cameraRef.current.position.x = mouseXRef.current * 5;
        cameraRef.current.lookAt(0, -scrollYRef.current * 0.02, 0);
      }

      // Render
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Properly dispose of all Three.js resources
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(mat => mat.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (containerRef.current && rendererRef.current.domElement.parentNode === containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }

      // Clear references
      objectsRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{
        width: '100%',
        height: '100vh',
      }}
    />
  );
}
