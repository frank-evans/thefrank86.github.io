
let camera, scene, renderer, mesh;

				init();
				animate();


				function init() {

					
					scene = new THREE.Scene();
 
					camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
					camera.position.set(0, 0, 400);

					//loading
 					const textureLoader = new THREE.TextureLoader();

					const normalTexture = textureLoader.load("{% static 'textures/NormalMap5.png' %}");

					// Lightning ambient
					const ambientLight = new THREE.AmbientLight(0x404040, 2);
					//ambientLight.position.set(1,1,1);
	
					scene.add(ambientLight);

					// Light directional Top
					const Light = new THREE.DirectionalLight(0xC95500, 1.8);
					Light.position.set(90,90,50);

					scene.add(Light);

					// Light directional Bottom
					const Light2 = new THREE.DirectionalLight(0x050055, 4);
					Light2.position.set(-90,-90,50);

					scene.add(Light2);
	
					//const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
					//scene.add(pointLightHelper);

					// Object Geometry 
					// Particles test
					//const dotGeometry = new THREE.BufferGeometry;
					//const dotsCnt = 1000;
					//const posArray = new Float32Array(dotCnt * 3);
					//for(let i = 0; i < dotCnt * 3; i++) {
					//	posArray[i] = Math.random() - 0.5
					//};
					//dotGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

					//const geometry = new THREE.DodecahedronGeometry(180, 2);
					//const geometry = new THREE.IcosahedronGeometry(180, 2);
					const geometry = new THREE.SphereGeometry(225, 100, 100);

					// Material
					const material = new THREE.MeshStandardMaterial();
					material.metalness = 0.7;
					material.roughness = 0.2;
					material.flatShading = true;
					material.needsUpdate = true;
					material.normalMap = normalTexture;
					material.color = new THREE.Color(0x292929);

					//const dotMaterial = new THREE.PointsMaterial({
					//	size: 0.005
					//});

					// Mesh
					mesh = new THREE.Mesh(geometry, material);
					//dotMesh = new THREE.Points(dotGeometry, dotMaterial);
					scene.add(mesh);
					//scene.add(dotMesh);

					//second object ****************
					//const geometry2 = new THREE.BoxGeometry( 200, 200, 200 );
					//const material2 = new THREE.MeshBasicMaterial({ 
                    	//color: "red",
                    	//wireframe: true
                	//});

					//mesh2 = new THREE.Mesh( geometry2, material2 );
					//scene.add( mesh2 );
					// **************************

					// Renderer
					renderer = new THREE.WebGLRenderer( { 
						canvas: document.querySelector('#bg'),
						antialias: true, 
						alpha: true,
					} );
					renderer.setPixelRatio( window.devicePixelRatio );
					renderer.setSize( window.innerWidth, window.innerHeight );
					camera.position.setZ(500);
					document.body.appendChild( renderer.domElement );

					window.addEventListener( 'resize', onWindowResize );

					// mouse orientation
					//document.addEventListener('mousemove', onDocumentMouseMove);
					//let mouseX = 0;
					//let mouseY = 0;
					//let targetX = 0;
					//let targetY = 0;
					//const windowX = window.innerWidth / 2;
					//const windowY = window.innerHeight / 2;

				}

				//function onDocumentMouseMove(event) {

				//	mouseX = (event.clientX - windowX);
				//	mouseY = (event.clientY - windowY);
				//}
				

				function onWindowResize() {

					camera.aspect = window.innerWidth / window.innerHeight;
					camera.updateProjectionMatrix();

					renderer.setSize( window.innerWidth, window.innerHeight );

				}

				// Animation
				function animate() {

					//mouse orientation
					//targetX = mouseX * .001;
					//targetY = mouseY * .001;

					//mesh.rotation.y += .5 * (targetX - mesh.rotation.y);

					//mesh.rotation.x += 0.003;
					mesh.rotation.y += 0.002;
					//mesh.rotation.z += 0.003;

					renderer.render(scene, camera);

					requestAnimationFrame( animate );

				}