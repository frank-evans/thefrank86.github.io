import {scrollContainer, camera} from '../main.js';
import {audioSun} from '../effects/audio.js';

// scroll function to zoom Star Planet and nav bar
export function updateSphere(event) {

    var st = window.scrollY || document.documentElement.scrollTop;
    // lastScrollTop && mesh.position.z < 140
    // camera.position.set(0, 0, 400);

    if (st > scrollContainer.lastScrollTop && camera.position.z > 365){
        camera.position.z += -1.0;
        //camera.position.x += 0.5;

        //mesh.position.z += 1.5;
        //mesh3.position.z += 1.5;
        scrollContainer.lastScrollTop = st <= 0 ? 0 : st;

        //audioFire.volume += (0.00008);
        audioSun.volume += (0.0010);
    }
    // lastScrollTop && mesh.position.z > 0
    else if (st < scrollContainer.lastScrollTop && camera.position.z < 500) {
        camera.position.z += 1.0;
        //camera.position.x += -0.5;
        
        //mesh.position.z += window.scrollY * -.0007;
        //mesh.position.z += -1.5;
        //mesh3.position.z += -1.5;
        scrollContainer.lastScrollTop = st <= 0 ? 0 : st;

        //audioFire.volume -= (0.00008);
        audioSun.volume -= (0.0010);
    }
    else {
        scrollContainer.lastScrollTop = st <= 0 ? 0 : st;   
    }

    // nav bar dynamic on scroll using Y position
    if (scrollContainer.lastScrollY < window.scrollY) {
        scrollContainer.nav.style.top = "-9.375rem";
        //footer.style.bottom = "-6.25rem";
    }
    else {
        scrollContainer.nav.style.top = "0";
        //footer.style.bottom = "0";
    }
    
    scrollContainer.lastScrollY = window.scrollY;

    return;
}