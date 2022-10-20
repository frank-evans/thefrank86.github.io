<script type="x-shader/x-vertex" id="vertexShader">

    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform vec2 pixels;
    float PI = 3.141592653589793238;


    varying vec2 vUv;
    void main () {
        vUv = uv;

        // gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        //vec4 mvPosition = modelViewMatrix * vec4( position, 1. );
        //gl_PointSize = size*5. * ( 1. / - myPosition.z );
        //gl_PointSize = 50. * ( 1. / - myPosition.z );
        //gl_PointSize = size*10. ;
        vPosition = position;

        gl_Position = projectionMatrix *
        modelViewMatrix * vec4( position, 1.0);
    }

</script>