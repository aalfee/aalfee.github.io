//import three.js library here
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
//import * as THREEx from 'threex';

const video = document.getElementById('camera');
const cameraButton = document.getElementById('cameraButton');
var on_off = 1;         // counter for on and off switch of the camera
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
    canvas: document.getElementById('AR-window'),
    alpha: true });             // alpha allows transparency for the WebGL canvas
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);            //Sets the background color to be transparent


const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 1.5);
orbit.update(); 

const objectLoader = new OBJLoader();

objectLoader.load('head.obj', (head) => {
    //data.children[0].material = new THREE.MeshBasicMaterial({color: 0x00ff00})    
    head.children[0].material = new THREE.MeshBasicMaterial({   //Make sure the children are referenced to which ones you want to alter with the new BasicMeshMaterial
        color: 0xffffff,                                        //black color makes the texture transparet and white will make it solid 
        transparent: true,                                      //setting transparent to true
        opacity: 0.1                            //makes sure the texture of this child is transparent up to the 0.1 opacity
    });
    head.scale.set(0.038,0.042,0.038);
    head.position.set(0, -0.6, 0);
    head.rotation.x = -1.55;
    scene.add(head); 
    my3DObject = necklace; 
});

objectLoader.load('hair.obj', (hair) => {
    //data.children[0].material = new THREE.MeshBasicMaterial({color: 0x00ff00})    
    hair.scale.set(0.038,0.042,0.038);
    hair.position.set(0, 0.3, 0.05);
    //hair.rotation.y = 0;
    scene.add(hair); });

/*
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
*/

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


cameraButton.addEventListener('click', () => {
on_off=on_off+1;                                // everytime the camera button is clicked we increment the counter by one 
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        // Set the video element's source to the camera stream
        video.srcObject = stream;
        //Make the video element visible
        if((on_off % 2)==0){                // this is where we check if we need to 'block' meaning show the camera 
        video.style.display = 'block';
        } else if ((on_off % 2) == 1){      // or where we hide the camera by setting the style to 'none'
            video.style.display = 'none';
        }
    })
    .catch((error) => {
        console.error("Error accessing the camera: ", error);   // just catching any erors that might come up, nothing specific
    });
});

// Inside the detectNeckline function:
function detectNeckline() {
    // Ensure video dimensions match canvas size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let necklinePosition = { x: 0, y: 0, count: 0 };

    const startY = canvas.height / 3;  // From the middle to near shoulders
    const endY = canvas.height * 0.7; // Rough estimate of the neckline area

    // Detect dark pixels in the neckline region (this could be more complex)
    for (let y = startY; y < endY; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const i = (y * canvas.width + x) * 4;
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

            // Simple heuristic: dark pixels might correspond to the neckline area
            if (r < 60 && g < 60 && b < 60) {
                necklinePosition.x += x;
                necklinePosition.y += y;
                necklinePosition.count++;
            }
        }
    }

    // If a neckline position is detected, compute the average position
    if (necklinePosition.count > 0) {
        necklinePosition.x /= necklinePosition.count;
        necklinePosition.y /= necklinePosition.count;
        necklinePosition.width = 120; // Adjust as needed

        // Call the function to map the 3D object to the detected neckline
        mapObjectToNeckline(necklinePosition);
    }

    // Request the next frame for continual detection
    requestAnimationFrame(detectNeckline);
}
detectNeckline();

// Inside mapObjectToNeckline function:
function mapObjectToNeckline(necklinePosition) {
    const scale = necklinePosition.width / 100;

    // Normalize the 2D canvas position to 3D space coordinates
    const xPosition = (necklinePosition.x / canvas.width) * 2 - 1; // Map to Three.js space (-1 to 1)
    const yPosition = -(necklinePosition.y / canvas.height) * 2 + 1; // Map to Three.js space (-1 to 1)

    // Map to the 3D object's position in the scene
    my3DObject.position.set(xPosition, yPosition, 0);
    my3DObject.scale.set(scale, scale, scale);  // Scale based on detected neckline width

    renderer.render(scene, camera); // Update the rendering
}

