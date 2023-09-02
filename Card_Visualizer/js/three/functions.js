import {camera, renderer, windowX, windowY, cursor, mouse} from '../main.js';


// throttle function for scroll
export function throttle(fn, wait) {
    var time1 = Date.now();
    return function() {
        if ((time1 + wait - Date.now()) < 0) {
        fn();
        time1 = Date.now();
        }
    }
} 

// dynamic window resizing
export function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
}

// dynamic mouse movement interaction Function					
export function onDocMouseMove(event) {
    mouse.x = (event.clientX - windowX);
    mouse.y = (event.clientY - windowY);
    cursor.x = event.clientX / windowX - 0.5;
    cursor.y = event.clientY / windowY - 0.5;
}

// dynamic mouse movement interaction Function					
export function onDocMouseOut(event) {
    cursor.x = 0;
    cursor.y = 0;
}