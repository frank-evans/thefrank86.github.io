export const fragGlowGreen = /* glsl */ `

uniform float time;
varying vec2 vUv;
varying vec3 vPosition; 
varying vec3 vNorm;

vec3 brightnessToColor(float b) {
	b *= 0.25;
	//return (vec3(b, b*b, b*b*b*b)/0.25)*0.8;
	float time2 = 1.0-(time * 0.0035);
	vec3 color = time < 56.7 ? (vec3(b/time2, b*b, b*b*b*b)/0.25)*0.8 : (vec3(b/0.8, b*b, b*b*b*b)/0.25)*0.8;
	return color;
}

void main() {
	float radial = 1. - vNorm.z;
	radial *= radial * radial * radial;
	//radial *= radial * radial;

	//normal ********************************************************************************
	float brightness = 1.0 + radial*2.0;

	// Color corrupted ***************************************************************************
	//brightness = brightness + 1.0;
	time < 56.7 ? brightness = brightness + (time * 0.0176) : brightness = brightness + 1.0;
	//brightness -= 1.8;
	time < 56.7 ? brightness -= (time * 0.03) : brightness -= 1.7;

	//brightness = brightness + 2.2;
	//brightness -= 2.8;

	gl_FragColor.rgb = brightnessToColor(brightness)*radial;

	gl_FragColor.a = radial;

	//gl_FragColor = vec4(radial, 0., 0., 1.);
	}`;