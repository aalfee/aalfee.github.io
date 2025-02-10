import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.172.0/three.module.js';

let renderer, scene, camera;
let group;
let pointLight;

let selectedObject = null;
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

let scrollAmount = 0;
const maxScrollLeft = -10;
const maxScrollRight = 20;

init();

function init() {
    // init renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    // init scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    group = new THREE.Group();
    scene.add(group);

    // init camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 15);
    camera.lookAt(scene.position);

    // add sprites
    const hexGeometry = new THREE.CircleGeometry(2, 6);
    const hexMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff, emissive: 0x000000, roughness: 0.5, metalness: 1 });
    
    // Create and add hexagons
    const hexPositions = [
        [-7, 1, 5], [-3.7, -1, 5], [-0.4, 1, 5], [2.9, -1, 5], [6.2, 1, 5],
        [9.5, -1, 5], [12.8, 1, 5], [16.1, -1, 5], [19.4, 1, 5], [-3.7, 2.9, 5],
        [2.9, 2.9, 5], [9.5, 2.9, 5], [16.1, 2.9, 5], [-7, 4.9, 5], [-7, -2.9, 5],
        [-0.4, 4.9, 5], [-0.4, -2.9, 5], [6.2, 4.9, 5], [6.2, -2.9, 5], [12.8, 4.9, 5],
        [12.8, -2.9, 5], [19.4, -2.9, 5], [19.4, 4.9, 5], [-3.7, -4.9, 5], [2.9, -4.9, 5], 
        [9.5, -4.9, 5], [16.1, -4.9, 5]
    ];

    hexPositions.forEach(pos => {
        const hex = new THREE.Mesh(hexGeometry, hexMaterial.clone());
        hex.position.set(pos[0], pos[1], pos[2]);
        group.add(hex);
    });

    // Set up lights
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    // Event listeners
    window.addEventListener('resize', onWindowResize);
 
}

function animate() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerDown(event) {
    if (selectedObject && selectedObject.position.y === 1) {
        selectedObject.material.color.set(0x00ff00);
    }
}


