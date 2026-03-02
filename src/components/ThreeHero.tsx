import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export const ThreeHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x0197b2, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 1);
    pointLight2.position.set(-5, -5, 2);
    scene.add(pointLight2);

    // Industrial Machine Abstract Representation
    const group = new THREE.Group();
    
    // Main body
    const bodyGeo = new THREE.BoxGeometry(2, 1.5, 3);
    const bodyMat = new THREE.MeshStandardMaterial({ 
      color: 0xeeeeee, 
      metalness: 0.5, 
      roughness: 0.5 
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    group.add(body);

    // Rollers
    const rollerGeo = new THREE.CylinderGeometry(0.3, 0.3, 3.2, 32);
    const rollerMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.7 });
    
    for (let i = 0; i < 3; i++) {
      const roller = new THREE.Mesh(rollerGeo, rollerMat);
      roller.rotation.z = Math.PI / 2;
      roller.position.y = 0.8;
      roller.position.z = -1 + i * 1;
      group.add(roller);
    }

    // Gears
    const gearGeo = new THREE.TorusGeometry(0.4, 0.1, 16, 32);
    const gearMat = new THREE.MeshStandardMaterial({ color: 0x0197b2 });
    
    const gear1 = new THREE.Mesh(gearGeo, gearMat);
    gear1.position.set(1.1, 0, 0);
    gear1.rotation.y = Math.PI / 2;
    group.add(gear1);

    scene.add(group);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 1000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x0197b2,
      transparent: true,
      opacity: 0.5
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      group.rotation.y += 0.005;
      group.rotation.x += 0.002;
      
      gear1.rotation.z += 0.05;
      
      particles.rotation.y += 0.001;
      
      renderer.render(scene, camera);
    };

    animate();

    // Scroll interaction
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollPercent = scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      
      group.position.y = -scrollY * 0.002;
      group.rotation.y = scrollY * 0.005;

      // Dynamic Lighting
      pointLight.position.x = 5 + Math.sin(scrollY * 0.005) * 2;
      pointLight.position.z = 5 + Math.cos(scrollY * 0.005) * 2;
      pointLight.intensity = 2 + Math.sin(scrollY * 0.01) * 1;

      pointLight2.position.y = -5 + Math.cos(scrollY * 0.005) * 5;
      pointLight2.intensity = 1 + scrollPercent * 2;

      // Camera movement for depth
      camera.position.y = -scrollY * 0.001;
      camera.lookAt(scene.position);
    };

    window.addEventListener('scroll', handleScroll);

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 -z-10 opacity-60"
      style={{ pointerEvents: 'none' }}
    />
  );
};
