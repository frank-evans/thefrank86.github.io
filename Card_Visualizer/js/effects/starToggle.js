// import star shader material
import {material, material3, time} from '../main.js';
// import audio music
import {audioYellow, audioBlue, audioGreen, audioSun, audioSunInit} from './audio.js';
// import shader logic
import {fragmentBlue} from '../shaders/fragmentBlue.js'; 
import {fragGlowBlue} from '../shaders/fragGlowBlue.js'; 
import {fragment} from '../shaders/fragment.js';
import {fragGlow} from '../shaders/fragGlow.js';
import {fragGreen} from '../shaders/fragGreen.js';
import {fragGlowGreen} from '../shaders/fragGlowGreen.js';


// last played song for musicToggle.js
export let lastPlayed = {
    song : undefined,
}

export const starToggle = document.addEventListener('DOMContentLoaded', function() {
		
    document.getElementById('sToggle').onclick = () => {
        // hide/unhide canvas
        //let y = document.getElementById("body");
        if (material.fragmentShader == fragment) {
            material.fragmentShader = fragmentBlue;
            material3.fragmentShader = fragGlowBlue;

            // switch audio track
            audioYellow.muted = true;
            audioBlue.load();
            audioBlue.muted = false;
            lastPlayed.song = audioBlue;
            audioSunInit();
            //audioSun.play();
            audioSun.resume();

            document.getElementById('music').src = "../../static/star/mNote.png";
            material.needsUpdate = true;
            material3.needsUpdate = true;
        } else if (material.fragmentShader == fragmentBlue){
            material.fragmentShader = fragGreen;
            material3.fragmentShader = fragGlowGreen;
            
            // "flash" text for fragGreen shader
            const flash = document.querySelector('.flash');
            flash.classList.add('show3');
            setTimeout(() => {
                flash.classList.remove('show3');
              }, 4.0 * 1000);

            // reset time for fragFlowGreen.js shader
            time.time = 1.0;

            // switch audio track
            audioBlue.muted = true;
            audioGreen.load();
            audioGreen.muted = false;
            lastPlayed.song = audioGreen;
            //audioSun.play();
            audioSun.resume();

            document.getElementById('music').src = "../../static/star/mNote.png";
            material.needsUpdate = true;
            material3.needsUpdate = true;
        } else {
            material.fragmentShader = fragment;
            material3.fragmentShader = fragGlow;

            // switch audio track
            audioGreen.muted = true;
            audioYellow.load();
            audioYellow.muted = false;
            lastPlayed.song = audioYellow;
            //audioSun.play();
            audioSun.resume();

            document.getElementById('music').src = "../../static/star/mNote.png";
            material.needsUpdate = true;
            material3.needsUpdate = true;
        }
    }
});