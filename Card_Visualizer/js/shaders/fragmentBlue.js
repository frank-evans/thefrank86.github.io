import {noiseFilter} from './noise.js'; 

export const fragmentBlue = noiseFilter + /* glsl */ `

// layers of noise
float fbm(vec4 p){
	
    float sum = 0.;
    float amp = 1.;
    float scale = 1.;
    for(int i = 0; i < 6; i ++) {
        sum += snoise(p *scale) *amp;
        p.w += 100.;
        amp *= 0.9;
        scale *= 2.2;
    }
    return sum;
} 

vec3 brightnessToColor(float b) {
    b *= 0.25;
    return (vec3(b*b*b*b, b*b, b)/0.25)*0.8;
}

float Fresnel(vec3 eyeVector, vec3 worldNormal) {
    return pow( 1.0 + dot( eyeVector, worldNormal), 3.0 );
}

uniform float time;
varying vec2 vertexUV; 
varying vec3 vPos;
varying vec3 vNormal;
varying vec3 eyeVector;

void main() {
    //vec4 v = vec4(0.5, 0.5, 1., 1.);
    // vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
    //gl_FragColor = vec4(vUv*, 0.0, 1.);

    // BASE
    //vec4 p = vec4(vPos/35., time *0.03);
    vec4 p = vec4(vNormal*08., time *0.03);
    float noisy = fbm(p);
    
    //gl_FragColor = vec4(noisy); 

    // SPOTS
    vec4 p1 = vec4(vertexUV/10., 0.05, 1.);
    float spots = min(snoise(p1), 1.);

    //gl_FragColor *= mix(0., spots, 0.7);

    // Color
    float brightness = noisy * mix(0., spots, 0.8);
    brightness = brightness*3. + 1.2;

    //fresnel
    //float fres = (Fresnel(eyeVector, vNormal))*(time*0.02);
    float fres = (Fresnel(eyeVector, vNormal));
    brightness += pow(fres, 0.4);

    vec3 col = brightnessToColor(brightness);
    gl_FragColor = vec4(col, 1.);


    // START
    //gl_FragColor = vec4(vertexUV, 0., time);  

    //float noisy = snoise(vec4(vPos/50., time));
    //gl_FragColor = vec4(noisy);

    //gl_FragColor = vec4(vec3(0.7, 0.5, 0.) + texture2D(globeTexture, vertexUV).xyz, 1.0);
    //float noisy = snoise(vec4(vec3(0.7, 0.5, 0.) + texture2D(globeTexture, vertexUV).xyz, 1.0));
    //gl_FragColor = vec4(vPos, 1.);


}`