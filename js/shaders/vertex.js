import {noiseFilter} from './noise.js';

export const vertex = noiseFilter + /* glsl */ `
        varying vec2 vertexUV;
		uniform float time;
		varying vec3 vPos;
		varying vec3 eyeVector;
		varying vec3 vNormal;
	
	
		//varying vec2 vUv;
		void main () {
			vertexUV = uv;
			vPos = position;
			// warp sphere
			float uFrequency = 10.0;
			float uStrength = 0.9;
			float noiseStrength = snoise(vec4(position * uFrequency, time * 0.35)) * uStrength;
			vPos += normal * noiseStrength;

			vec4 viewPosition = viewMatrix * vec4(vPos, 1.0);
			// fresnal
			vNormal = normal;
			vec4 worldPosition = modelMatrix * vec4( position, 1.0);
			eyeVector = normalize(worldPosition.xyz - cameraPosition);
	
			// gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			//vec4 mvPosition = modelViewMatrix * vec4( position, 1. );
			//gl_PointSize = size*5. * ( 1. / - myPosition.z );
			//gl_PointSize = 50. * ( 1. / - myPosition.z );
			//gl_PointSize = size*10. ;
	
			//gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
			gl_Position = projectionMatrix * viewPosition;
		}`;