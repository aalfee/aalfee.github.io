let scene, camera, renderer, model;

function init() {
    // Set up the scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Set up the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.6);
    document.getElementById('vr-view').appendChild(renderer.domElement);

    // Add lighting
    const light = new THREE.AmbientLight(0x404040);  // Ambient light
    scene.add(light);
    
    // Load your jewelry 3D model
    const loader = new THREE.OBJLoader();
    loader.load('assets/jewelry-models/ring.obj', function (object) {
        model = object;
        scene.add(model);
    });

    camera.position.z = 5;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        if (model) model.rotation.y += 0.01;  // Rotate the model
        renderer.render(scene, camera);
    }

    animate();
}

// Initialize the VR viewer
init();


function initAR() {
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('ar-view').appendChild(renderer.domElement);

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

    // Load 3D model to place in AR
    const loader = new THREE.OBJLoader();
    loader.load('assets/jewelry-models/ring.obj', function (object) {
        markerRoot.add(object);
    });

    function animate() {
        requestAnimationFrame(animate);
        if (arToolkitSource.ready !== false) {
            arToolkitContext.update(arToolkitSource.domElement);
        }
        renderer.render(scene, camera);
    }

    animate();
}

initAR();
