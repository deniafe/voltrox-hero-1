import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;
camera.position.y = 2;
camera.position.x = -2;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
const canvasWidth = window.innerWidth * 0.5; // Set the canvas width to half of the page width
const canvasHeight = window.innerHeight;
renderer.setSize(canvasWidth, canvasHeight);
renderer.setClearColor('#050816');
document.getElementById('second').appendChild(renderer.domElement);

// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Load the GLTF model
const loader = new GLTFLoader();
loader.load(
  './mobile.glb',
  (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 0, 0); // Adjust the position of the model
    scene.add(model);
    // model.scale.set(1.5, 1.2, 1.2)

    // Optionally, you can perform any additional transformations or settings on the loaded model here.

    // Render the scene
    renderer.render(scene, camera);
  },
  undefined,
  (error) => {
    console.error('Error loading GLTF model', error);
  }
);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable smooth camera movements
controls.dampingFactor = 0.05; // Set the damping factor for the smoothness
controls.rotateSpeed = 0.5; // Set the speed of rotation
controls.zoomSpeed = 0.5; // Set the speed of zooming
controls.panSpeed = 0.5; // Set the speed of panning

window.addEventListener('resize', () => {
  // Update camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer size
  const canvasWidth = window.innerWidth * 0.5;
  const canvasHeight = window.innerHeight;
  renderer.setSize(canvasWidth, canvasHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update orbit controls
  controls.update();

  // Render the scene
  renderer.render(scene, camera);
}
animate();
