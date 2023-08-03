import {noiseFilter} from './noise.js';

export const vertexGlow = noiseFilter + /* glsl */ `
		// uniform float time;
		//varying vec2 vUv;
		//varying vec3 vPosition;
		//uniform vec2 pixels;
		//float PI = 3.141592653589793238; */
		varying vec2 vUv;
		uniform float time;
		varying vec3 vPosition;
		varying vec3 vNorm;
	
	
		//varying vec2 vUv;
		void main () {
			vUv = uv;
			vPosition = position;
			vNorm = normal;
			// warp sphere
			float uFrequency = 5.0;
			float uStrength = 3.0;
			float nStrength = snoise(vec4(position * uFrequency, time * 0.45)) * uStrength;
			vPosition += normal * nStrength;

			vec4 viewPos = viewMatrix * vec4(vPosition, 1.0);
	
			//gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
			gl_Position = projectionMatrix * viewPos;
		}`;