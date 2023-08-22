export const fragGlow = /* glsl */ `

uniform float time;
varying vec2 vUv;
varying vec3 vPosition; 
varying vec3 vNorm;

vec3 brightnessToColor(float b) {
	b *= 0.25;
	return (vec3(b, b*b, b*b*b*b)/0.25)*0.8;
}

void main() {
	float radial = 1. - vNorm.z;
	radial *= radial * radial * radial;

	//normal ********************************************************************************
	float brightness = 1.0 + radial*2.0;

	// Color corrupted ***************************************************************************
	//brightness = brightness + 1.2;
	//brightness -= 2.0;

	gl_FragColor.rgb = brightnessToColor(brightness)*radial;

	gl_FragColor.a = radial;

	//gl_FragColor = vec4(radial, 0., 0., 1.);
	}`;