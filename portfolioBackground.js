import * as THREE from 'three';

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

    pointLight = new THREE.PointLight(0xffffff, 1000, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerdown', onPointerDown);

    // Handle scrolling based on mouse movement
    document.addEventListener('mousemove', onMouseMove);
}

function animate() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}




function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObject(group, true);

    if (intersects.length > 0) {
        const res = intersects.filter(res => res && res.object)[0];

        if (res && res.object && res.object.position.y === 1) {
            selectedObject = res.object;
            selectedObject.material.color.set(0xff0000);
        } else {
            if (selectedObject) {
                selectedObject.material.color.set(0xff00ff);
                selectedObject = null;
            }
        }
    } else {
        if (selectedObject) {
            selectedObject.material.color.set(0xff00ff);
            selectedObject = null;
        }
    }
}

function onPointerDown(event) {
    if (selectedObject && selectedObject.position.y === 1) {
        selectedObject.material.color.set(0x00ff00);
    }
}

function onMouseMove(event) {
    // Calculate normalized mouse position
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = - (event.clientY / window.innerHeight) * 2 + 1;

    // Update camera position to simulate horizontal scrolling
    const deltaX = event.movementX * 0.02;
    scrollAmount += deltaX;
    scrollAmount = Math.max(maxScrollLeft, Math.min(maxScrollRight, scrollAmount));
    camera.position.x = scrollAmount;

    // Update light position based on mouse position
    const lightX = mouseX * 40; // Adjust multiplier for desired range
    const lightY = mouseY * 40; // Adjust multiplier for desired range
    pointLight.position.set(lightX, lightY, 30);
}
