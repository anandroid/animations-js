import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.1/build/three.module.js';

let scene, camera, renderer, ball, floor;
let velocity = -0.02;
const bounceFactor = 0.8;

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  ball = new THREE.Mesh(geometry, material);
  ball.position.y = 2;
  scene.add(ball);

  const floorGeo = new THREE.PlaneGeometry(10, 10);
  const floorMat = new THREE.MeshStandardMaterial({ color: 0xdddddd });
  floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

  window.addEventListener('resize', onWindowResize);
}

function animate() {
  requestAnimationFrame(animate);

  ball.position.y += velocity;
  if (ball.position.y <= 0.5) {
    ball.position.y = 0.5;
    velocity = -velocity * bounceFactor;
  } else {
    velocity -= 0.001;
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
