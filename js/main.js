import * as THREE from './three.module.js';
import {vertex} from './shaders/vertex.js';
import {fragment} from './shaders/fragment.js';
import {vertexGlow} from './shaders/vertexGlow.js';
import {fragmentGlow} from './shaders/fragmentGlow.js';

//Hide/unhide background
    //page counter script api
    function websiteVisits(response) {
        //document.querySelector("#visits").textContent = response.value;
        document.getElementById("visits").innerText = response.value;
    }

    document.addEventListener('DOMContentLoaded', function() {

        // name search example :  https://api.scryfall.com/cards/named?exact=doom+blade

        document.getElementById('hide').onclick = () => {
                // hide/unhide canvas
                let x = document.getElementById("bg");
                //let y = document.getElementById("body");
                let y = document.getElementById("background-image");
                if (x.style.display == "none") {
                    x.style.display = "block";
                    y.style.content = 'url("static/stars.jpg")';

                    audioSun.muted = false;
                    audioFire.muted = false;
                }
                else {
                    x.style.display = "none";
                    y.style.content = "none";

                    audioSun.muted = true;
                    audioFire.muted = true;
    
                }
            }
        });

//force reload on "back button" to ensure object.model data reload 
/*
    window.addEventListener( "pageshow", function ( event ) {
        if (performance.navigation.type == 2){
            location.reload(true);
            document.getElementById('form').reset();
        }
    });
*/    

    // function to add hover effects after all img's added
    function hover() {
        document.querySelectorAll('img').forEach(item => {
            item.addEventListener('mousemove', handleHover, false)
        })

        document.querySelectorAll('img').forEach(item => {
            item.addEventListener('mouseleave', resetStyles, false)
        })

    }

        // hover angle threshold
        const THRESHOLD = 6;


        function handleHover(e) {
            const { clientX, clientY, currentTarget } = e;
            const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

            const horizontal = (clientX - offsetLeft) / clientWidth;
            // added -window.scrollY to fix distortin on scroll
            const vertical = (clientY - (offsetTop - window.scrollY)) / clientHeight;

            // this can be positive or negative to reverse the dynamic 3d (hover) effect
            const rotateX = -(THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
            const rotateY = -(vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

            this.style.transform =
            `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1.18, 1.18, 1.18)`;
        }

        function resetStyles(e) {
            this.style.zIndex = "10";
            this.style.transform =
            `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
        }

// ****************************************************************************************************************************
/**
* 
 * @param {String} vertex_url URL to the vertex shader code.
 * @param {String} fragment_url URL to fragment shader code
 * @param {function(String, String)} onLoad Callback function(vertex, fragment) that take as input the loaded vertex and fragment contents.
 * @param {function} onProgress Callback for the `onProgress` event. 
 * @param {function} onError Callback for the `onError` event.
 */
function ShaderLoader(vertex_url, fragment_url, onLoad, onProgress, onError) {
  var vertex_loader = new THREE.FileLoader(THREE.DefaultLoadingManager);
  vertex_loader.setResponseType('text');
  vertex_loader.load(vertex_url, function (vertex_text) {
    var fragment_loader = new THREE.FileLoader(THREE.DefaultLoadingManager);
    fragment_loader.setResponseType('text');
    fragment_loader.load(fragment_url, function (fragment_text) {
      onLoad(vertex_text, fragment_text);
    });
  }, onProgress, onError);
}


//background three.js dynamic/responsive objects script*****************************************************************************
		
		let camera, scene, renderer, mesh, mesh2, controls;

		let mouseX, mouseY, targetX, targetY, windowX, windowY;

		let geometry, material, uniforms, time, resolution;

		let geometry3, material3, mesh3;

		let planeGeometry, planeMaterial, plane;

		// 3d image mouse
		const cursor = {
			x: 0,
			y: 0,
			lerpX: 0,
			lerpY: 0,
		  }

		// let renderPass, composer, bloomPass;

			init();


			function init() {

				// Three.js Scene
				scene = new THREE.Scene();
				scene.name = scene;

                let uniforms = {
                    time: { type: "f", value: 1 },
                }

				// Three.js Camera  (..., ..., near plane frustrum set to 43 per current sphere scroll zoom AND particles overlap, ...)
				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 43, 1000 );
				camera.position.set(0, 0, 400);

				// orbit controls 
				// controls = new THREE.OrbitControls(camera);

				//texture loader
				const textureLoader = new THREE.TextureLoader();

				// this texture being referenced from the static folder only loads in html (not.js)

				//  particle texture loading
				const star = textureLoader.load("./static/star/asteroid2.png");
				star.rotation = 0.3;


				// Lightning ambient (x, 3'intensity')
				/*
				const ambientLight = new THREE.AmbientLight(0x404040, 1);
				//ambientLight.position.set(1,1,1);

				scene.add(ambientLight);

				// Light directional Top (gold : 0xC95500) (red : 0xaa1000)
				const Light = new THREE.DirectionalLight(0xaa1000, 8);
				Light.position.set(90,90,70);

				scene.add(Light);

				// Light directional Bottom  (purple : 0x050055) (blue : 0x001030)
				const Light2 = new THREE.DirectionalLight(0x001030, 20);
				Light2.position.set(-90,-90,20);

				scene.add(Light2);

				//const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
				//scene.add(pointLightHelper);

				*/

				//const geometry = new THREE.DodecahedronGeometry(180, 2);
				//const geometry = new THREE.IcosahedronGeometry(180, 2);
				geometry = new THREE.SphereGeometry(280, 100, 150);

				// sun outer glow geo
				geometry3 = new THREE.SphereGeometry(315, 100, 8);

				// Material (Shaders)
				time = 1.0;

                // Shader loader to handle shader files
                //ShaderLoader("./js/shaders/vertex.vert", "./js/shaders/fragment.frag",
                //function (vertex, fragment) {
                    material = new THREE.ShaderMaterial( {
                        // THREE.Doubleside causes noticable performance drop **********
                        //side: THREE.DoubleSide, 
                        //side: THREE.BackSide,

                        uniforms: uniforms, 
                        vertexShader: vertex,
                        fragmentShader: fragment,
                    
                    })
                //}); 

				// sun outer glow mat
                // Shader loader to handle shader files
                //ShaderLoader("./js/shaders/vertexGlow.vert", "./js/shaders/fragmentGlow.frag",
                //function (vertex, fragment) {
                    material3 = new THREE.ShaderMaterial( {
                        
                        side: THREE.BackSide,
                        uniforms: uniforms,
                        vertexShader: vertexGlow,
                        fragmentShader: fragmentGlow,
                    
                    })
                //});

				// sun glow mesh
				mesh3 = new THREE.Mesh(geometry3, material3);

				// Mesh
				mesh = new THREE.Mesh(geometry, material);
				scene.add(mesh);

				scene.add(mesh3);

				// Other small stars object
				// Particles geometry
				const dotGeometry = new THREE.BufferGeometry();
				// particle count
				const dotsCnt = 5000;
				//const posArray = new Float32Array(dotCnt * 3);  ***Old attempt***

				const vertices = [];

				for ( let i = 0; i < dotsCnt; i ++) {

					// randFloatSpread is +/- half the input spread (points spread volume)
					const x = THREE.MathUtils.randFloatSpread( 1000 );
					const y = THREE.MathUtils.randFloatSpread( 1000 );
					const z = THREE.MathUtils.randFloatSpread( 1000 );

					vertices.push( x, y, z );
				}
			
				// ***old attempt***
				//for (let i = 0; i < dotCnt * 3; i++) {
				//	posArray[i] = (Math.random() - 0.5) * 5,
				//};

				dotGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

				const dotMaterial = new THREE.PointsMaterial({
					size: 2.0,
					//color: 0xddc0ff,
					color: 0xffffff,
					map: star,
					transparent: true,
				});

				mesh2 = new THREE.Points(dotGeometry, dotMaterial);
				scene.add(mesh2);


				// Renderer
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
				
				window.addEventListener( 'resize', onWindowResize );

				// // dynamic mouse orientation Initialized
				document.addEventListener('mousemove', onDocumentMouseMove);
				document.addEventListener('mouseout', onDocumentMouseOut);
				mouseX = 0;
				mouseY = 0;
				targetX = 0;
				targetY = 0;
				windowX = window.innerWidth / 2;
				windowY = window.innerHeight / 2;
			}

			// scroll object ZOOM browser event listener
			window.addEventListener( 'scroll', throttle(updateSphere, 0), false);

			// throttle function for scroll
			function throttle(fn, wait) {
				var time1 = Date.now();
				return function() {
				  if ((time1 + wait - Date.now()) < 0) {
					fn();
					time1 = Date.now();
				  }
				}
			  } 
			// throttled scroll listener for img hover
			//window.addEventListener('scroll', throttle(hover, 2000));

			// nav bar dynamic on scroll
			const nav = document.querySelector("header.nav");
			//const footer = document.querySelector("footer.footer");
			let lastScrollY = window.scrollY;

			// scroll function to zoom Object main
			var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

			// scroll function to zoom Object main
			function updateSphere(event) {

				var st = window.pageYOffset || document.documentElement.scrollTop;
				// lastScrollTop && mesh.position.z < 140
				// camera.position.set(0, 0, 400);
				if (st > lastScrollTop && camera.position.z > 365){
					camera.position.z += -1.0;
					//camera.position.x += 0.5;

					//mesh.position.z += 1.5;
					//mesh3.position.z += 1.5;
					lastScrollTop = st <= 0 ? 0 : st;

					audioFire.volume += (0.00008);
					audioSun.volume += (0.0010);
				}
				// lastScrollTop && mesh.position.z > 0
				else if (st < lastScrollTop && camera.position.z < 500) {
					camera.position.z += 1.0;
					//camera.position.x += -0.5;
					
					//mesh.position.z += window.scrollY * -.0007;
					//mesh.position.z += -1.5;
					//mesh3.position.z += -1.5;
					lastScrollTop = st <= 0 ? 0 : st;

					audioFire.volume -= (0.00008);
					audioSun.volume -= (0.0010);
				}
				else {
					lastScrollTop = st <= 0 ? 0 : st;
					
				}

				// nav bar dynamic on scroll
				if (lastScrollY < window.scrollY) {
					nav.style.top = "-9.375rem";
					//footer.style.bottom = "-6.25rem";
				}
				else {
					nav.style.top = "0";
					//footer.style.bottom = "0";
				}
				
				lastScrollY = window.scrollY;

				// delete 'plane' 3d parallax display card on scroll***********************
				/* if (typeof plane !== "undefined" && camera.position.z > 470){
					scene.remove(plane);
					plane.geometry.dispose();
					plane.material.dispose();
					plane = undefined;
				} */

				return;
			}

			// 3d image clock
			const clock = new THREE.Clock();

			// dynamic mouse movement interaction Function					
			function onDocumentMouseMove(event) {

				mouseX = (event.clientX - windowX);
				mouseY = (event.clientY - windowY);
				cursor.x = event.clientX / windowX - 0.5;
  				cursor.y = event.clientY / windowY - 0.5;
			}

			// dynamic mouse movement interaction Function					
			function onDocumentMouseOut(event) {
				cursor.x = 0;
  				cursor.y = 0;
			}
			
			// dynamic window resizing
			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.setPixelRatio( window.devicePixelRatio );

			}

			// 3d image clock
			let previousTime = 0;

			// Animation
			function animate() {
				
				// dynamic mouse movement interaction (keep rotation.z for constant movement)
				targetX = mouseX * .001;
				targetY = mouseY * .001;
				// 4 Mesh rotations temporary off for shader tests
				//mesh.rotation.x += .003 * (targetY - mesh.rotation.x);
				//mesh.rotation.y += .003 * (targetX - mesh.rotation.y);

				mesh2.rotation.x += .011 * (targetY - mesh2.rotation.x);
				mesh2.rotation.y += .011 * (targetX - mesh2.rotation.y);

				// 3d image parallaxing 
				const elapsedTime = clock.getElapsedTime();
				const deltaTime = elapsedTime - previousTime;
				previousTime = elapsedTime;

				//const parallaxX = cursor.x * 0.5;
  				//const parallaxY = - cursor.y * 0.5;

				// Temp set to consistent and NOT mouse move
				// cursor.lerpX  += (parallaxX - cursor.lerpX ) * 5 * deltaTime;
				// cursor.lerpY += (parallaxY - cursor.lerpY) * 5 * deltaTime;
				// * speed , * tolerance 
				cursor.lerpX  = Math.sin(elapsedTime*0.7) * 0.6;
				//cursor.lerpY = Math.sin(elapsedTime*0.9) * 0.7;   ***************
				cursor.lerpY = Math.sin(elapsedTime*1.1) * 0.4;

				// 3d image positioning values ***********************************************************
				// planeMaterial.uniforms.uMouse.value = new THREE.Vector2(cursor.lerpX , cursor.lerpY);

				// Mesh 2 (asteroids) static movement best (rotate z)
				//mesh2.rotation.y += 0.003;
				//mesh2.rotation.x += 0.0005;
				mesh2.rotation.z -= 0.0009;

				//shader updates
				time += 0.05;
				material.uniforms.time.value = time;
				material3.uniforms.time.value = time;

				renderer.render(scene, camera);
				//composer.render();

				requestAnimationFrame(animate);
			}

			animate();



//api search object *****************************************************************************************************************
		function opacity() {
			const waitElement = document.getElementsByClassName("wait");
			waitElement[0].style.opacity = "0.0";
		}
		//audio file script 
		const audioFire = new Audio("./static/fire3.ogg");
		audioFire.volume = (0.005);
		audioFire.autoplay = true;
		audioFire.muted = true;
		audioFire.loop = true; 

		const audioSun = new Audio("./static/sun5.ogg");
		audioSun.volume = (0.1);
		audioSun.autoplay = true;
		audioSun.muted = true;
		audioSun.loop = true;

        // initialize variable for form single card search
        let single1;

		document.addEventListener('DOMContentLoaded', function() {
			// name search example :  https://api.scryfall.com/cards/named?exact=${search_id}        doom-blade
			document.querySelector('form.form2').onsubmit = () => {
				// play audio
				audioFire.muted = false; 
				audioSun.muted = false

				// ***********  need update 
				const search_id = document.getElementById('single').value;
				//search_id = search_id.trim();
				//search_id = search_id.replace(" ", "-");

				// fetch single card
				fetch((`https://api.scryfall.com/cards/named?exact=${search_id}`))
				.then(response => response.json())
				.then(data => {
					//var single1 = Object.assign({}, data);
					single1 = data;

					// set img1 for div used to iterate 
					let img1 = document.getElementById('result');

					if (typeof single1.image_uris === 'undefined') {
						//check if all img data missing
						if (typeof single1.card_faces !== 'undefined') {
							img1.innerHTML +=
							 `<img class="tilt" src="${single1.card_faces[0].image_uris.normal}">`;
							img1.innerHTML +=
							 `<img class="tilt" src="${single1.card_faces[1].image_uris.normal}">`;
						}
						else {
							img1.innerHTML +=
							 `<a href="https://nicksazani.tumblr.com/post/141268107445" target=_blank>
								<img class="notFound" srcset="https://64.media.tumblr.com/f5892dd6042256098268e36fcf237dc7/tumblr_o485qw8Hke1qjmnzro1_100.gifv 100w, https://64.media.tumblr.com/f5892dd6042256098268e36fcf237dc7/tumblr_o485qw8Hke1qjmnzro1_250.gifv 250w, https://64.media.tumblr.com/f5892dd6042256098268e36fcf237dc7/tumblr_o485qw8Hke1qjmnzro1_400.gifv 400w, https://64.media.tumblr.com/f5892dd6042256098268e36fcf237dc7/tumblr_o485qw8Hke1qjmnzro1_500.gifv 500w, https://64.media.tumblr.com/f5892dd6042256098268e36fcf237dc7/tumblr_o485qw8Hke1qjmnzro1_540.gifv 540w, https://64.media.tumblr.com/f5892dd6042256098268e36fcf237dc7/tumblr_o485qw8Hke1qjmnzro1_640.gifv 640w, https://64.media.tumblr.com/f5892dd6042256098268e36fcf237dc7/tumblr_o485qw8Hke1qjmnzro1_1280.gifv 994w" sizes="(max-width: 994px) 100vw, 994px" alt="Wizard Magic-ing" loading="lazy">
							</a>
							<br><br>Consider consulting Wizards on your Spelling
							<br><span class="error">*Wizard character / animation  &copy; Nick Sazani 2016
							<br>Click image for link to Nick Sazani work / info</span>`;
						}
					}
					if (typeof single1.image_uris !== 'undefined') {
					img1.innerHTML += `<img class="tilt" src="${single1.image_uris.normal}">`;
					}

					})
					// call 3d hover effect function after new img's loaded
					.then(setTimeout(hover, 2 * 1000))
					.catch(error => {
						console.log("Error:", error);
					});
					
					// hide form on submit/search
					var w = document.getElementById("outer");
					w.style.display = "none";
					var y = document.getElementById("outer2");
					y.style.display = "none";
					var z = document.getElementById("intro");
					z.style.display = "none";

					// call for img 3d hover AFTER new img's load  ******** 3 seconds current MINIMUM  *************   called again for larger searches 
					setTimeout(hover, 8 * 1000);
					
					setTimeout(hover, 16 * 1000);

					//delete single1;

					//delete parallax 3d card ********************************************************************************
					//deleteFunction();

					// auto scroll for parallax card delete
					window.scrollTo(0, 1);

					// stop form from submitting (bypass django dataframe search/result)
					return false;
				} 
			});

		// remove loading graphic
		function loadingRing() {
			const waitElement = document.getElementsByClassName("wait");
			waitElement[0].remove();
		}

        // initialize variables for form set search
        let page1, k, pagek;

		document.addEventListener('DOMContentLoaded', function() {

			document.querySelector('form.form1').onsubmit = () => {
					const waitElement = document.getElementsByClassName("wait");
					waitElement[0].style.opacity = "0.9";
					// play audio
					audioFire.muted = false; 
					audioSun.muted = false;
					
				
					// get submitted selected option 
					const select = document.getElementById('set');
					//let search_id = select.options[select.selectedIndex].value;
					let search_id;
					if (typeof select.options[select.selectedIndex] === 'undefined'){
						search_id = "ltr";
					}
					else {
						search_id = select.options[select.selectedIndex].value;
					}
			
					// fetch page 1 (0-174 entries)   =request.getparameter("setselect");
					fetch((`https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3A${search_id}&unique=prints`))
					.then(response => response.json())
					.then(data => {
						//var page1 = Object.assign({}, data);
						page1 = data;
						//page1.push(data);
						//page1 = JSON.stringify(page1);

						// set img1 for div used to iterate 
						let img1 = document.getElementById('result');

						// loop through each page adding images 
						for (let i = 0; i < Object.keys( page1.data ).length; i++) {
							//check if double face card
							if (typeof page1.data[i].image_uris === 'undefined') {
								//check if all img data missing
								if (typeof page1.data[i].card_faces === 'undefined') {

									continue;
								}
								else {
									img1.innerHTML +=
									 `<img class="tilt" src="${page1.data[i].card_faces[0].image_uris.normal}">`;
									img1.innerHTML +=
									 `<img class="tilt" src="${page1.data[i].card_faces[1].image_uris.normal}">`;

									 continue;
								}
							}
							img1.innerHTML += `<img class="tilt" src="${page1.data[i].image_uris.normal}">`;
							
						}

						for (let j = 1; j < 10; j++) {
							// timeout to comply with scryfall api use rules && last page < 175 data = quick load correction
							setTimeout( () => {
								delay(j);
							}, j * 200); 
						}
						
						function delay(j) {
								if (page1.has_more) {
									k = j + 1;
									fetch((`https://api.scryfall.com/cards/search?format=json&include_extras=true&include_multilingual=false&include_variations=true&order=set&page=${k}&q=e%3A${search_id}&unique=prints`))
									.then(response => response.json())
									.then(data => {

										pagek = data;
	
										if (typeof pagek.data === 'undefined') {
											page1.has_more = false;
										}
										else {
											// loop through each page adding images 
											// for (let i = 0; i < Object.keys( pagek.data ).length; i++) {    *** old ***
											for (let i = 0; i < 175; i++) {
												//check if double face card
												if (typeof pagek.data[i].image_uris === 'undefined') {
													//check if all img data missing
													if (typeof pagek.data[i].card_faces === 'undefined') {

														// attempt to slow last page load for proper order (fail)
														img1.innerHTML += 
														`<img class="tilt" hidden="hidden" src="${page1.data[i].image_uris.normal}">`;

														img1.innerHTML +=
														`<img class="tilt" hidden="hidden" scr="${page1.data[i].card_faces[0].image_uris.normal}">`;

														continue;
													}
													else {
														img1.innerHTML +=
														`<img class="tilt" src="${pagek.data[i].card_faces[0].image_uris.normal}">`;
														img1.innerHTML +=
														`<img class="tilt" src="${pagek.data[i].card_faces[1].image_uris.normal}">`;
		
														continue;
													}
												}
												img1.innerHTML += `<img class="tilt" src="${pagek.data[i].image_uris.normal}">`;

											}
										}
										//if (pagek.has_more !== true) {
										//	page1.has_more = false;
										//}
									})
									.catch(error => {
										console.log("Error:", error);
									});

									//delete pagek;
								}
							
						}

                        //delete page1;
					})
					
					// call 3d hover effect function after new img's loaded
					.then(setTimeout(hover, 4 * 1000))
					.catch(error => {
						console.log("Error:", error);
					});
					
					// hide form on submit/search
					var w = document.getElementById("outer");
					w.style.display = "none";
					var y = document.getElementById("outer2");
					y.style.display = "none";
					var z = document.getElementById("intro");
					z.style.display = "none";

					// call for img 3d hover AFTER new img's load  ******** 3 seconds current MINIMUM  *************   called again for larger searches 
					setTimeout(hover, 10 * 1000);
					
					setTimeout(hover, 20 * 1000);
					
					// reset form for proper load on refresh
					//document.getElementById('form').reset();

					// auto scroll for parallax card delete
					window.scrollTo(0, 1);

					//setTimeout(opacity, 4 * 1000);
					setTimeout(loadingRing, 6 * 1000);  

					// stop form from submitting (bypass django dataframe search/result)
					return false;
				}


		});

//script for text fade in *********************************************************************************************************************
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('show');
			} else {
				entry.target.classList.remove('show');
			}
			});
		});

		const hiddenElements = document.querySelectorAll('.hidden');
		hiddenElements.forEach((el) => observer.observe(el));

//extend search form on hover ****************************************************************************************************************
		$('.outer').hover(
       function(){ $(this).addClass('outer3') },
       function(){ $(this).removeClass('outer') },
		)

		$('.outer').hover(
		function(){ $('.input').addClass('input3') },
		function(){ $('.input').removeClass('input') }
		)