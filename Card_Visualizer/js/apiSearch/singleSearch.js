import {audioSun, audioGreen, audioBlue, audioYellow, audioSunInit} from '../effects/audio.js';  
import {lastPlayed} from '../effects/starToggle.js';
import {hover} from '../effects/hover.js'; 


export const singleSearch = document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('form.form2')) {
    // name search example :  https://api.scryfall.com/cards/named?exact=${search_id}        named?exact=doom-blade
        // initialize variable for single card search
        let single1, prints;
        document.querySelector('form.form2').onsubmit = (event) => {
            event.preventDefault();
            //  check if no music is playing or paused to start audioYellow
            if (audioGreen.muted == true && audioYellow.muted == true && audioBlue.muted == true && lastPlayed.song == undefined) {
                audioYellow.load(); 
                audioYellow.play();
                audioYellow.muted = false;
                // play star effect audio
                audioSunInit();
                //audioSun.play(); 
                audioSun.resume();
                // update music mute image
                document.getElementById('music').src = "../../Card_Visualizer/static/star/mNote.png";
            }

            // Retrieve selected value from search field
            const search_id = document.getElementById('single').value;

            // fetch single card
            fetch((`https://api.scryfall.com/cards/named?exact=${search_id}`))
            .then(response => response.json())
            .then(data => {

                single1 = data;

                // set img1 for div used to iterate 
                let img1 = document.getElementById('result');

                if (typeof single1.image_uris === 'undefined') {
                    //check if all img data missing
                    if (typeof single1.card_faces !== 'undefined') {
                        img1.innerHTML +=
                            `<img class="tilt" src="${single1.card_faces[0].image_uris.normal}">`;
                        img1.innerHTML +=
                            `<img class="tilt" src="${single1.card_faces[1].image_uris.normal}">`;
                    }
                    else {
                        img1.innerHTML +=
                            `<a href="https://nicksazani.tumblr.com/post/141268107445" target=_blank>
                            <img id="notFound" class="tilt" srcset="https://64.media.tumblr.com/f5892dd6042256098268e36fcf237dc7/tumblr_o485qw8Hke1qjmnzro1_100.gifv 100w, https://64.media.tumblr.com/f5892dd6042256098268e36fcf237dc7/tumblr_o485qw8Hke1qjmnzro1_250.gifv 250w, https://64.media.tumblr.com/f5892dd6042256098268e36fcf237dc7/tumblr_o485qw8Hke1qjmnzro1_400.gifv 400w, https://64.media.tumblr.com/f5892dd6042256098268e36fcf237dc7/tumblr_o485qw8Hke1qjmnzro1_500.gifv 500w, https://64.media.tumblr.com/f5892dd6042256098268e36fcf237dc7/tumblr_o485qw8Hke1qjmnzro1_540.gifv 540w, https://64.media.tumblr.com/f5892dd6042256098268e36fcf237dc7/tumblr_o485qw8Hke1qjmnzro1_640.gifv 640w, https://64.media.tumblr.com/f5892dd6042256098268e36fcf237dc7/tumblr_o485qw8Hke1qjmnzro1_1280.gifv 994w" sizes="(max-width: 994px) 100vw, 994px" alt="Wizard Magic-ing" loading="lazy">
                        </a>
                        <br><br>Consider consulting Wizards on your Spelling
                        <br><span class="error">*Wizard character / animation  &copy; Nick Sazani 2016
                        <br>Click image for link to Nick Sazani work / info</span>`;
                    }
                }
                if (typeof single1.image_uris !== 'undefined') {
                    // fetch all prints of card
                    fetch((single1.prints_search_uri))
                    .then(response => response.json())
                    .then(data => {

                        prints = data;

                        // load each print of the card
                        for (let i = 0; i < Object.keys( prints.data ).length; i++) {
                            img1.innerHTML += `<img class="tilt" src="${prints.data[i].image_uris.normal}">`;
                        }
                    })
                }
            })
                // call 3d hover effect function after new img's loaded (imported)
                .then(setTimeout(hover, 2 * 1000))
                .catch(error => {
                    console.log("Error:", error);
                });
                
                // hide/remove form on submit/search
                var w = document.getElementById("outer");
                w.style.display = "none";
                var y = document.getElementById("outer2");
                y.style.display = "none";
                var z = document.getElementById("intro");
                z.style.display = "none";
                w.remove(); 
                z.remove();

                // auto scroll to top while loading cards
                window.scrollTo(0, 1);

                // stop form from submitting 
                //return false;
        }
    } 
});