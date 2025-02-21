<<<<<<< HEAD
import * as THREE from 'three';

import * as THREEx from 'threex';

// <<-------------------------------------------Copy--------------------------------------------->>

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
//import * as THREEx from 'threex';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('VR-window') });
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

// <<-------------------------------------------Copy--------------------------------------------->>

/*

var camera, clock, deltaTime, totalTime;
=======
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.146.0/build/three.module.js';



var scene, camera, renderer, clock, deltaTime, totalTime;
>>>>>>> 6948b8ca24dd5aa8be6145e02c6dc6f7fd25446d

var arToolkitSource, arToolkitContext, smoothedControls;

var markerRoot1, markerRoot2;

var mesh1;

initialize();
<<<<<<< HEAD
//animate();

function initialize()
{
	const scene = new THREE.Scene();

	//let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.5 );
	//scene.add( ambientLight );
			
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	scene.add(camera);

	const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('VR-window') });
	renderer.setSize(window.innerWidth, window.innerHeight);

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

	//clock = new THREE.Clock();
	//deltaTime = 0;
	//totalTime = 0;
=======
animate();

function initialize()
{
	scene = new THREE.Scene();

	let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.5 );
	scene.add( ambientLight );
				
	camera = new THREE.Camera();
	scene.add(camera);

	renderer = new THREE.WebGLRenderer({
		antialias : true,
		alpha: true
	});
	renderer.setClearColor(new THREE.Color('lightgrey'), 0)
	renderer.setSize( 640, 480 );
	renderer.domElement.style.position = 'absolute'
	renderer.domElement.style.top = '0px'
	renderer.domElement.style.left = '0px'
	document.body.appendChild( renderer.domElement );

	clock = new THREE.Clock();
	deltaTime = 0;
	totalTime = 0;
>>>>>>> 6948b8ca24dd5aa8be6145e02c6dc6f7fd25446d
	
	////////////////////////////////////////////////////////////
	// setup arToolkitSource
	////////////////////////////////////////////////////////////
<<<<<<< HEAD
/*
=======

>>>>>>> 6948b8ca24dd5aa8be6145e02c6dc6f7fd25446d
	arToolkitSource = new THREEx.ArToolkitSource({
		sourceType : 'webcam',
	});

	function onResize()
	{
		arToolkitSource.onResize()	
		arToolkitSource.copySizeTo(renderer.domElement)	
		if ( arToolkitContext.arController !== null )
		{
			arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)	
		}	
	}

	arToolkitSource.init(function onReady(){
		onResize()
	});
	
	// handle resize event
	window.addEventListener('resize', function(){
		onResize()
	});
	
	////////////////////////////////////////////////////////////
	// setup arToolkitContext
	////////////////////////////////////////////////////////////	

	// create atToolkitContext
	arToolkitContext = new THREEx.ArToolkitContext({
		cameraParametersUrl: 'data/camera_para.dat',
		detectionMode: 'mono'
	});
	
	// copy projection matrix to camera when initialization complete
	arToolkitContext.init( function onCompleted(){
		camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
	});

	////////////////////////////////////////////////////////////
	// setup markerRoots
	////////////////////////////////////////////////////////////

	// build markerControls
	markerRoot1 = new THREE.Group();
	scene.add(markerRoot1);
	
	let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
		type : 'pattern',
		patternUrl : "data/hiro.patt",
	})

	// interpolates from last position to create smoother transitions when moving.
	// parameter lerp values near 0 are slow, near 1 are fast (instantaneous).
	let smoothedRoot = new THREE.Group();
	scene.add(smoothedRoot);
	smoothedControls = new THREEx.ArSmoothedControls(smoothedRoot, {
		lerpPosition: 0.8,
		lerpQuaternion: 0.8,
		lerpScale: 1,
		// minVisibleDelay: 1,
		// minUnvisibleDelay: 1,
	});

	let geometry1	= new THREE.CubeGeometry(1,1,1);
	let material1	= new THREE.MeshNormalMaterial({
		transparent : true,
		opacity: 0.5,
		side: THREE.DoubleSide
	}); 
	
	mesh1 = new THREE.Mesh( geometry1, material1 );
	mesh1.position.y = 0.5;
	
	// markerRoot1.add( mesh1 );
	smoothedRoot.add( mesh1 );
}


function update()
{
	// update artoolkit on every frame
	if ( arToolkitSource.ready !== false )
		arToolkitContext.update( arToolkitSource.domElement );
		
	// additional code for smoothed controls
	smoothedControls.update(markerRoot1);
}
<<<<<<< HEAD
*/
//function animate()
//{
	//requestAnimationFrame(animate);
	//deltaTime = clock.getDelta();
	//totalTime += deltaTime;
	//update();
	//render();

//}
=======


function render()
{
	renderer.render( scene, camera );
}


function animate()
{
	requestAnimationFrame(animate);
	deltaTime = clock.getDelta();
	totalTime += deltaTime;
	update();
	render();
}

</script>

</body>
</html>
>>>>>>> 6948b8ca24dd5aa8be6145e02c6dc6f7fd25446d
