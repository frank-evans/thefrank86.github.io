import {audioSun} from './audio.js'; 

export const backgroundToggle = document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('hide').onclick = () => {
            // hide/unhide canvas
            let x = document.getElementById("bg");
            //let y = document.getElementById("body");
            let y = document.getElementById("background-image");
            //let z = document.getElementById("background3js");
            if (y.style.content == "none") {
                x.style.display = "block";
                y.style.content = 'url("static/stars.jpg")';

                audioSun.muted = false;
                //audioFire.muted = false;
            } else {
                x.style.display = "none";
                y.style.content = "none";

                audioSun.muted = true;
                //audioFire.muted = true;
            }
        }
    });