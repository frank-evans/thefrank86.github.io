import {scrollContainer, camera} from '../main.js';
import {audioSun} from '../effects/audio.js';

// scroll function to zoom Star Planet and nav bar
export function updateSphere(event) {

    var st = window.scrollY || document.documentElement.scrollTop;

    if (st > scrollContainer.lastScrollTop && camera.position.z > 365){
        camera.position.z += -1.0;

        scrollContainer.lastScrollTop = st <= 0 ? 0 : st;

        if (audioSun) {
            audioSun.volume += (0.0005);
        }
    }
    // lastScrollTop && mesh.position.z > 0
    else if (st < scrollContainer.lastScrollTop && camera.position.z < 500) {
        camera.position.z += 1.0;
        
        scrollContainer.lastScrollTop = st <= 0 ? 0 : st;
        if (audioSun) {
            audioSun.volume -= (0.0005);
        }
    }
    else {
        scrollContainer.lastScrollTop = st <= 0 ? 0 : st;   
    }

    // nav bar dynamic on scroll using Y position
    if (scrollContainer.lastScrollY < window.scrollY) {
        scrollContainer.nav.style.top = "-9.375rem";
    }
    else {
        scrollContainer.nav.style.top = "0";
    }
    
    scrollContainer.lastScrollY = window.scrollY;

    return;
}