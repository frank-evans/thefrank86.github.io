// three.js library 
import * as THREE from './three.module.js';
// effects
import {observer} from './effects/fade.js'; 
// default shader logic
import {vertex, vertexGlow, fragment, fragGlow, cardFrag, cardVert} from './shaders/default.js';
// "three.js" custon functions
import {updateSphere} from './three/updateSphere.js';
import {throttle, onWindowResize, onDocMouseMove, onDocMouseOut} from './three/functions.js';

// Hide/unhide background
import './effects/background.js'; 
// Toggle star color/fragment shader
import './effects/starToggle.js'; 
// Toggle audio music
import './effects/musicToggle.js'; 
// single card search api fetch logic
import './apiSearch/singleSearch.js';
// set cards search api fetch logic
import './apiSearch/setSearch.js';
	

// hover angle threshold for card 'hover' function
    export const THRESHOLD = 6;

// (hidden)text fade in 
	const hiddenElements = document.querySelectorAll('.hidden');
	hiddenElements.forEach((element) => observer.observe(element));

	const hiddenElements2 = document.querySelectorAll('.hidden2');
	hiddenElements2.forEach((element) => observer.observe(element));

// extend search form on hover 
	if (document.querySelector(".outer")) {
		$('.outer').hover(
		function(){ $(this).addClass('outer3') },
		function(){ $(this).removeClass('outer') },
		)
		$('.outer').hover(
		function(){ $('.input').addClass('input3') },
		function(){ $('.input').removeClass('input') }
		)
	}

// real-time interactive background using three.js dynamic/responsive objects

	// init large scope variables for real-time background
	let geometry, mesh, geometry3, mesh3, mesh2, scene, resolution, controls,
		targetX = 0, targetY = 0;
	// exported for other function (star, updateSphere, functions, ...)
	export let camera, renderer, material, material3,
		windowX = window.innerWidth / 2, 
		windowY = window.innerHeight / 2;
	export let time = {
		time : 1.0,
	}
	// parallax card three.js variable (used in "about.html")
	let planeGeometry, planeMaterial, plane;

	// shader uniforms
	let uniforms = {
		time: { type: "f", value: 1 },
	}

	// background and 3d parallax image mouse (functions.js)
	export const cursor = {
		x: 0,
		y: 0,
		lerpX: 0,
		lerpY: 0,
	}

	// mouse movement and window variables (functions.js)
	export const mouse = {
		x : 0,
		y : 0,
	}

	// scroll state object (updateShpere.js)
	export const scrollContainer = {
		// nav bar for dynamic on scroll
		nav : document.querySelector("header.nav"),
		// initialize save Y position for dynamic nav bar
		lastScrollY : window.scrollY,
		// scroll object 
		lastScrollTop : window.scrollY || document.documentElement.scrollTop,
	}

	// init 3d parallax image clock and previous time variable
	const clock = new THREE.Clock();
	let previousTime = 0;
	
	// scroll object browser event listener - only for index.html (#result)
	if (document.getElementById("result")) {
		window.addEventListener( 'scroll', throttle(updateSphere, 10), false);
	}

	// background resize on window resize function
	window.addEventListener( 'resize', onWindowResize );

	// dynamic mouse orientation Initialized for asteroid movement
	document.addEventListener('mousemove', onDocMouseMove);
	document.addEventListener('mouseout', onDocMouseOut);

	// initialize real-time three.js background
	function init() {
		// init Three.js Scene
		scene = new THREE.Scene();
		scene.name = scene;

		// init Three.js Camera  (..., ..., near plane frustrum set to 43 per current sphere scroll zoom AND particles overlap, ...)
		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 43, 1000 );
		camera.position.set(0, 0, 400);

		// orbit controls 
		//controls = new THREE.OrbitControls(camera);

		// init texture loader
		const textureLoader = new THREE.TextureLoader();

		// this texture being referenced from the static folder only loads in html (not.js) ***************************************
		const depthImage = textureLoader.load("./static/textures/mDepth2.png");
		//const depthImage = textureLoader.load("{% static 'textures/FpDepthBlur2.png' %}");

		const originalImage = textureLoader.load("./static/textures/mountain1.png");
		//const originalImage = textureLoader.load("{% static 'textures/FrankProfile1.png' %}"); ***********************************

		// particle texture loading
		const asteroid = textureLoader.load("./static/star/asteroid2.png");
		asteroid.rotation = 0.3;

		// sun geometry
		geometry = new THREE.SphereGeometry(280, 100, 150);
		// sun outer glow geo 
		geometry3 = new THREE.SphereGeometry(315, 100, 8);

		// Shader loader to handle shader files
		material = new THREE.ShaderMaterial( {
			uniforms: uniforms, 
			vertexShader: vertex,
			fragmentShader: fragment,
			//fragmentShader: fragmentBlue,
		})

		// sun outer glow mat
		material3 = new THREE.ShaderMaterial( {
			side: THREE.BackSide,
			uniforms: uniforms,
			vertexShader: vertexGlow,
			fragmentShader: fragGlow,
			//fragmentShader: fragGlowBlue,
		})

		// sun glow mesh
		mesh3 = new THREE.Mesh(geometry3, material3);
		scene.add(mesh3);

		// sun Mesh
		mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		// small asteroid particles object
		// Particles geometry
		const dotGeometry = new THREE.BufferGeometry();
		// particle count
		const dotsCnt = 5000;
		// coordinates array for particles
		const vertices = [];

		for ( let i = 0; i < dotsCnt; i ++) {
			// randFloatSpread is +/- half the input spread (points spread volume)
			const x = THREE.MathUtils.randFloatSpread( 1000 );
			const y = THREE.MathUtils.randFloatSpread( 1000 );
			const z = THREE.MathUtils.randFloatSpread( 1000 );
			vertices.push( x, y, z );
		}

		// set particle geometry to particle array coordinates
		dotGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

		// material and asteroid map applied
		const dotMaterial = new THREE.PointsMaterial({
			size: 2.0,
			//color: 0xddc0ff,
			color: 0xffffff,
			map: asteroid,
			transparent: true,
		});

		// asteroid particles mesh
		mesh2 = new THREE.Points(dotGeometry, dotMaterial);
		scene.add(mesh2);

		// init/render Parallax card only on "about.html" 
		if (document.getElementById('parallax')) {
			// parallax card init geo, mat, mesh
			planeGeometry = new THREE.PlaneBufferGeometry(67.2 * 0.5, 93.6 * 0.5);
			//planeGeometry = new THREE.PlaneBufferGeometry(512 *0.25, 361 *0.25);
			//planeGeometry = new THREE.CircleBufferGeometry(512 *0.15, 80);

			planeMaterial = new THREE.ShaderMaterial({
				uniforms: {
					originalTexture: { value: originalImage },
					depthTexture: { value: depthImage },
					uMouse: { value: new THREE.Vector2(0, 0) },
					//uThreshold: { value: new THREE.Vector2(20. * 0.85, 35. * 0.85) },
					uThreshold: { value: new THREE.Vector2(20. * 1.2, 35. * 1.2) },
				},
				fragmentShader: cardFrag,
				vertexShader: cardVert,
			});
			//planeMaterial.transparent = true;
			//planeMaterial.opacity = 0.75;

			plane = new THREE.Mesh(planeGeometry, planeMaterial);
			plane.name = "plane1";
			scene.add(plane);

			// position parallax card
			plane.position.x = -32;
			plane.position.y = -1;
			plane.position.z = 456;
			plane.rotateZ(0.05);
		}

		// init Renderer
		renderer = new THREE.WebGLRenderer( { 
			canvas: document.querySelector('#bg'),
			alpha: true,
			antialias: false,
			powerPreference: "high-performance",
		} );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		camera.position.setZ(500);
		document.body.appendChild( renderer.domElement );

	}init();

	// Constant real-time update animations
	function animate() {
		// dynamic mouse movement interaction for mesh2 (keep rotation.z for constant movement)
		targetX = mouse.x * .001;
		targetY = mouse.y * .001;

		mesh2.rotation.x += .011 * (targetY - mesh2.rotation.x);
		mesh2.rotation.y += .011 * (targetX - mesh2.rotation.y);

		// 3d image parallaxing clock updates
		const elapsedTime = clock.getElapsedTime();
		const deltaTime = elapsedTime - previousTime;
		previousTime = elapsedTime;

		// Temp set to consistent and NOT on mouse move (current used in About.html)
		//const parallaxX = cursor.x * 0.5;
		//const parallaxY = - cursor.y * 0.5;

		//cursor.lerpX  += (parallaxX - cursor.lerpX ) * 5 * deltaTime;
		//cursor.lerpY += (parallaxY - cursor.lerpY) * 5 * deltaTime;

		// ( *speed) *tolerance 
		cursor.lerpX  = Math.sin(elapsedTime*0.7) * 0.6;
		//cursor.lerpY = Math.sin(elapsedTime*0.9) * 0.7;   ***
		cursor.lerpY = Math.sin(elapsedTime*1.1) * 0.4;

		// 3d parallax image positioning values if exists
		if (planeMaterial !== undefined) {
			planeMaterial.uniforms.uMouse.value = new THREE.Vector2(cursor.lerpX , cursor.lerpY);
		}
		
		// Mesh 2 (asteroids) static movement best (rotate z)
		mesh2.rotation.z -= 0.0009;

		//shader updates
		time.time += 0.05;
		material.uniforms.time.value = time.time;
		material3.uniforms.time.value = time.time;

		renderer.render(scene, camera);
		requestAnimationFrame(animate);

	}animate();