// Three.js setup
import * as THREE from 'three';

const canvas = document.getElementById('AR-window');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("VR-window") });
renderer.setSize(window.innerWidth, window.innerHeight);

let lastPinnedPosition = { x: 0, y: 0, z: 5 };
let newX=0, newY=0, deltaX = 0, deltaY = 0;

// Add a 3D object to the scene
const geometry = new THREE.SphereGeometry(0.1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const my3DObject = new THREE.Mesh(geometry, material);
scene.add(my3DObject);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    console.log(camera.position);
}
animate();

// Map pointer coordinates to Three.js (this creates 3D clones)
export function mapPointerToThreeJS(x, y) {
    let newClone = my3DObject.clone();
    scene.add(newClone);
    const normalizedX = -(x / canvas.width) * 3 + 3;
    const normalizedY = -(y / canvas.height) * 3 + 3;
    newClone.position.set(normalizedX, normalizedY, 0);
}

// Function that moves the camera based on palm coordinates
export function mapPalmToThreeJS(x, y) {

    // Normalize the input coordinates to the range [-1, 1]
    const normalizedX = (x / canvas.width)-2; // Normalizing from [0, canvas.width] to [-1, 1]
    const normalizedY = (y / canvas.height)-2; // Normalizing from [0, canvas.height] to [-1, 1]

    // Calculate the new position relative to the last pinned position

    // Update the camera's position relative to the last position
    camera.position.set(newX+normalizedX, newY+normalizedY, 10); // Keep z-position fixed at 5 or any value you prefer
    // Update the last pinned position to the new position

}

// Reset camera position to the default
export function resetCameraPosition() {
    newX = camera.position.x;
    newY = camera.position.y;
}

// Resize handling
window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    canvas.width = width;
    canvas.height = height;
});
