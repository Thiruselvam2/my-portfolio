import * as THREE from 'three';

// 1. Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg-canvas'),
  alpha: true // Transparent background
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);

// Helper function to create a particle system
function createParticles(count, color, size) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 100; // x
    positions[i3 + 1] = (Math.random() - 0.5) * 100; // y
    positions[i3 + 2] = (Math.random() - 0.5) * 100; // z
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: color,
    size: size,
    transparent: true,
    blending: THREE.AdditiveBlending,
    opacity: 0.7
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);
  return particles;
}

// 2. Create Particle Systems
// Your off-white particles
const particlesWhite = createParticles(5000, 0xF8F8FF, 0.1); 
// New accent color particles
const particlesPurple = createParticles(2000, 0x9D4EDD, 0.12); 

// 3. Handle Mouse Movement
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// 4. The Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Animate white particles
  particlesWhite.rotation.x += 0.0001;
  particlesWhite.rotation.y += 0.0002;
  
  // Animate purple particles (at a slightly different speed)
  particlesPurple.rotation.x -= 0.0002;
  particlesPurple.rotation.y -= 0.0003;

  // Animate camera based on mouse
  camera.position.x += (mouseX * 5 - camera.position.x) * 0.02;
  camera.position.y += (mouseY * 5 - camera.position.y) * 0.02;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();