import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.146.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('model') });
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

camera.position.z = 1000;

const textureLoader = new THREE.TextureLoader();
const ModelTexture = textureLoader.load('model1.jpg');

const ModelGeometry = new THREE.PlaneGeometry(0.686, 1.181);
const ModelMaterial= new THREE.MeshBasicMaterial({map: ModelTexture});
const model = new THREE.Mesh(ModelGeometry, ModelMaterial);
scene.add(model);
model.position.z = 999.1;



const ModelBackGeometry = new THREE.PlaneGeometry(1686, 2281);
const ModelBackMaterial=  new THREE.MeshPhysicalMaterial({
            color: 0x000000,
            metalness: 0.7, // Moderate metalness for a polished look
            roughness: 0.5, // Low roughness for smoothness
            clearcoat: 10, // Clear coat for extra shine
            clearcoatRoughness: 0.5 // Smooth clear coat for better reflections
        });
const modelBack = new THREE.Mesh(ModelBackGeometry, ModelBackMaterial);
modelBack.position.z = 500;
scene.add(modelBack);



const ambientLight = new THREE.AmbientLight(0x444444); // Soft ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Adjusted light intensity
directionalLight.position.set(5, 2, 20);
directionalLight.rotation.z = -5;

const directionalLight2 = new THREE.DirectionalLight(0xA020F0, 10) // Adjusted light intensity
directionalLight2.position.set(0, 0, 5);


scene.add(directionalLight);
scene.add(directionalLight2);

const pointLight2 = new THREE.PointLight(0xFF5210, 3, 70); // Bright point light for highlights
pointLight2.position.set(-5, -5, 10);
scene.add(pointLight2);


//<--- Start of new code --->
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

let scrollAmount = 0;
const maxScrollLeft = -10;
const maxScrollRight = 10;

document.addEventListener('pointermove', onPointerMove);

// Handle scrolling based on mouse movement
document.addEventListener('mousemove', onMouseMove);

function onPointerMove(event) {
pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
pointer.y =  (event.clientY / window.innerHeight) * 2 + 1;

raycaster.setFromCamera(pointer, camera);

const intersects = raycaster.intersectObject(model, true);

const res = intersects.filter(res => res && res.object)[0];
selectedObject = res.object;

if (intersects.length > 0) {
            selectedObject.material.color.set(0xfff000);
  }
}

function onMouseMove(event) {

// Calculate normalized mouse position

const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
const mouseY = (event.clientY / window.innerHeight) * 2 + 1;

// Update camera position to simulate horizontal scrolling

const deltaY = event.movementY * 0.002;
<<<<<<< HEAD
scrollAmount += deltaY * 0.5;
=======
scrollAmount += deltaY * 0.005;
>>>>>>> 6948b8ca24dd5aa8be6145e02c6dc6f7fd25446d
//scrollAmount = Math.max(maxScrollLeft, Math.min(maxScrollRight, scrollAmount));
camera.position.y = scrollAmount;

// Update light position based on mouse position

<<<<<<< HEAD
const lightX = mouseX * 10; // Adjust multiplier for desired range
const lightY = mouseY * 10; // Adjust multiplier for desired range
directionalLight2.position.set(0, lightY, lightX);
=======
const lightX = mouseX * 30; // Adjust multiplier for desired range
const lightY = mouseY * 10; // Adjust multiplier for desired range
directionalLight2.position.set(50, lightX -10, lightY);
>>>>>>> 6948b8ca24dd5aa8be6145e02c6dc6f7fd25446d
}

// <---- End of new Code --->


function animate() {
  //const time = Date.now() * 0.01;
  //directionalLight2.position.x+= Math.sin(time * 0.5) * 0.05;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
