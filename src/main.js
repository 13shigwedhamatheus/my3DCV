import * as THREE from 'three';

// Initialize Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Add an Object (A Torus/Donut Knot Shape)
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
// MeshStandardMaterial reacts realistically to light paths
const material = new THREE.MeshStandardMaterial({ color: 0xff6347, roughness: 0.1 });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Add Lighting (Standard material requires light to be visible)
const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(pointLight, ambientLight);

// Dynamic Window Resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Subtle animations
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.005;
  torusKnot.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();