import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.146.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('background') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create hexagons
const hexRadius = 1;
const hexHeight = Math.sqrt(3) * hexRadius;
const hexGeometry = new THREE.CircleGeometry(hexRadius, 20);
const hexGroup = new THREE.Group();

const BackgroundGeometry = new THREE.PlaneGeometry(50, 50);
const BackgroundMaterial = new THREE.MeshPhongMaterial({
    color: 0xFFFFFF, // Dark background for contrast
    side: THREE.DoubleSide,
    opacity: 0.7,
    transparent: true
});
const Background = new THREE.Mesh(BackgroundGeometry, BackgroundMaterial);
scene.add(Background);
Background.position.z = -1;

// Create a color gradient function
function getColor() {
    const r = 170;
    const g = 169;
    const b = 173;
    return new THREE.Color(r, g, b).getHex();
}

// Create hexagons with modern styling
for (let row = -10; row < 10; row++) {
    for (let col = -10; col < 10; col++) {
        const x = col * 1.5 * hexRadius;
        const y = row * hexHeight + (col % 2) * (hexHeight / 2);
        const color = getColor(); // Modern, random colors
        const hexMaterial = new THREE.MeshPhysicalMaterial({
            color: color,
            metalness: 0.7, // Moderate metalness for a polished look
            roughness: 0.5, // Low roughness for smoothness
            clearcoat: 10, // Clear coat for extra shine
            clearcoatRoughness: 0.5 // Smooth clear coat for better reflections
        });
        const hex = new THREE.Mesh(hexGeometry, hexMaterial);
        hex.position.set(x, y, 0);
        hex.userData = { originalPosition: hex.position.clone(), speed: Math.random() * 0.2 + 0.01 };
        hexGroup.add(hex);
    }
}

scene.add(hexGroup);
camera.position.z = 8;

const ambientLight = new THREE.AmbientLight(0x444444); // Soft ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Adjusted light intensity
directionalLight.position.set(5, 2, 20);
directionalLight.rotation.z = -5;

scene.add(directionalLight);

const pointLight2 = new THREE.PointLight(0xFF5210, 3, 70); // Bright point light for highlights
pointLight2.position.set(-5, -5, 10);
scene.add(pointLight2);

function animate() {
    requestAnimationFrame(animate);

    hexGroup.children.forEach(hex => {
        const time = Date.now() * 0.01;
        hex.rotation.x = hex.userData.originalPosition.z + Math.sin(time * hex.userData.speed * 10) * 0.15;
        //hex.rotation.y = hex.userData.originalPosition.z + Math.cos(time * hex.userData.speed * 10) * 5;
        hex.rotation.z = hex.userData.originalPosition.z + Math.sin(time * hex.userData.speed * 10) * 5;

        //hex.position.x+= hex.userData.originalPosition.z + Math.sin(time * hex.userData.speed * 10) * 0.05;
        hex.position.y+= hex.userData.originalPosition.z + Math.cos(time * hex.userData.speed * 10) * 0.05;
        hex.position.z+= hex.userData.originalPosition.z + Math.sin(time * hex.userData.speed * 1) * 0.05;

    });

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
