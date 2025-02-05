//import three.js library here
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
//import * as THREEx from 'threex';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('AR-window') });
renderer.setSize(window.innerWidth, window.innerHeight);


const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 1.5);
orbit.update(); 

const objectLoader = new OBJLoader();

objectLoader.load('head.obj', (head) => {
    //data.children[0].material = new THREE.MeshBasicMaterial({color: 0x00ff00})    
    head.scale.set(0.038,0.042,0.038);
    head.position.set(0, -0.6, 0);
    head.rotation.x = -1.55;
    scene.add(head); });

objectLoader.load('hair.obj', (hair) => {
    //data.children[0].material = new THREE.MeshBasicMaterial({color: 0x00ff00})    
    hair.scale.set(0.038,0.042,0.038);
    hair.position.set(0, 0.3, 0.05);
    //hair.rotation.y = 0;
    scene.add(hair); });


const BackgroundGeometry = new THREE.PlaneGeometry(50, 50);
const BackgroundMaterial = new THREE.MeshPhongMaterial({
    color: 0x0000FF, // Dark background for contrast
    side: THREE.DoubleSide,
    opacity: 0.7,
    transparent: true
});
const Background = new THREE.Mesh(BackgroundGeometry, BackgroundMaterial);
scene.add(Background);
Background.position.z = -1;


const ambientLight = new THREE.AmbientLight(0xffffff, 0.15); // Soft ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFA500, 0.85); // Adjusted light intensity
directionalLight.position.set(5, -5, 50);
directionalLight.rotation.z = -5;

scene.add(directionalLight);

const pointLight2 = new THREE.PointLight(0x800080, 7, 13); // Bright point light for highlights
pointLight2.position.set(-6, 2, 10);
scene.add(pointLight2);

// <------ Start of AR implementations ----->
/*
const arToolkitSource = new THREEx.ArToolkitSource({
    sourceType: 'webcam',
});
arToolkitSource.init(function onReady() {
    onResize();
});

window.addEventListener('resize', function () {
    onResize();
});

function onResize() {
    arToolkitSource.onResize();
    arToolkitSource.copySizeTo(renderer.domElement);
    if (arToolkitContext.arController !== null) {
        arToolkitSource.copySizeTo(arToolkitContext.arController.canvas);
    }
}

const arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: 'https://rawgit.com/jeromeetienne/AR.js/master/aframe/examples/marker-training/examples/camera_para.dat',
    detectionMode: 'mono',
    maxDetectionRate: 30,
});
arToolkitContext.init(function () {
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
});

const markerRoot = new THREE.Group();
scene.add(markerRoot);

// Add a marker to place the jewelry model
const marker = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
    type: 'pattern',
    patternUrl: 'https://rawgit.com/jeromeetienne/AR.js/master/aframe/examples/marker-training/examples/pattern-hiro.patt',
});
*/
function animate() {
    requestAnimationFrame(animate);
    //if (arToolkitSource.ready !== false) {
    //    arToolkitContext.update(arToolkitSource.domElement);
    //}
    renderer.render(scene, camera);
    console.log(camera.position);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
