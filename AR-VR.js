import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.172.0/build/three.module.js';

			import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.172.0/examples/jsm/loaders/OBJLoader.js';
			import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.172.0/examples/jsm/controls/OrbitControls.js';

			let camera, scene, renderer;

			let object;

			init();

			function init() {

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 20 );
				camera.position.z = 2.5;

				// scene

				scene = new THREE.Scene();

				const ambientLight = new THREE.AmbientLight( 0xffffff );
				scene.add( ambientLight );

				const pointLight = new THREE.PointLight( 0xffffff, 15 );
				camera.add( pointLight );
				scene.add( camera );

		
		const objectloader = new OBJLoader();
objectLoader.load('head.obj', (stove) => {
    //data.children[0].material = new THREE.MeshBasicMaterial({color: 0x00ff00})    
    stove.scale.set(0.038,0.042,0.038);
    stove.position.set(-5.8, 0.2, -6.3);
    stove.rotation.x = -1.55;
    scene.add(stove); });

				//

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				//

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.minDistance = 2;
				controls.maxDistance = 5;
				controls.addEventListener( 'change', render );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function render() {

				renderer.render( scene, camera );

			}