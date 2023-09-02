import {audioSun, audioGreen, audioBlue, audioYellow, audioSunInit} from '../effects/audio.js'; 
import {lastPlayed} from '../effects/starToggle.js';
import {hover} from '../effects/hover.js'; 


export const setSearch = document.addEventListener('DOMContentLoaded', function() {

    if ( document.querySelector('form.form1')) {

        // function to remove loading graphic
        function loadingRing() {
            const waitElement = document.getElementsByClassName("wait");
            waitElement[0].remove();
        }

        document.querySelector('form.form1').onsubmit = (event) => {
            //  check if no music is playing or paused to start audioYellow
            if (audioGreen.muted == true && audioYellow.muted == true && audioBlue.muted == true && lastPlayed.song == undefined) {
                audioYellow.load();
                audioYellow.muted = false;
                // play star effect audio
                audioSunInit();
                //audioSun.play(); 
                audioSun.resume();
                // update music mute image
                document.getElementById('music').src = "../../Card_Visualizer/static/star/mNote.png";
            }

            // initialize variables for form set search
            let page1, k, pagek;

            const waitElement = document.getElementsByClassName("wait");
            waitElement[0].style.opacity = "0.9";    
        
            // get submitted selected option - else default to a set
            const select = document.getElementById('set');
            let search_id;
            if (typeof select.options[select.selectedIndex] === 'undefined'){
                search_id = "woe";
            }
            else {
                search_id = select.options[select.selectedIndex].value;
            }

            // fetch page 1 (0-174 entries)   =request.getparameter("setselect");
            fetch((`https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3A${search_id}&unique=prints`))
            .then(response => response.json())
            .then(data => {

                page1 = data;

                // set img1 for div used to iterate 
                let img1 = document.getElementById('result');

                // loop through each page adding images 
                for (let i = 0; i < Object.keys( page1.data ).length; i++) {
                    //check if double face card
                    if (typeof page1.data[i].image_uris === 'undefined') {
                        //check if all img data missing
                        if (typeof page1.data[i].card_faces === 'undefined') {
                            continue;
                        }
                        else {
                            img1.innerHTML +=
                                `<img class="tilt" src="${page1.data[i].card_faces[0].image_uris.normal}">`;
                            img1.innerHTML +=
                                `<img class="tilt" src="${page1.data[i].card_faces[1].image_uris.normal}">`;
                                continue;
                        }
                    }
                    img1.innerHTML += `<img class="tilt" src="${page1.data[i].image_uris.normal}">`;
                    
                }

                for (let j = 1; j < 10; j++) {
                    // timeout to comply with scryfall api use rules && last page < 175 data = quick load correction ( , j * 200)
                    setTimeout( () => {
                        delay(j);
                    }, j * 400); 
                }
                
                function delay(j) {
                    if (page1.has_more) {
                        k = j + 1;
                        fetch((`https://api.scryfall.com/cards/search?format=json&include_extras=true&include_multilingual=false&include_variations=true&order=set&page=${k}&q=e%3A${search_id}&unique=prints`))
                        .then(response => response.json())
                        .then(data => {

                            pagek = data;

                            if (typeof pagek.data === 'undefined') {
                                page1.has_more = false;
                            }
                            else {
                                // loop through each page adding images 
                                for (let i = 0; i < 175; i++) {
                                    //check if double face card
                                    if (typeof pagek.data[i].image_uris === 'undefined') {
                                        //check if all img data missing
                                        if (typeof pagek.data[i].card_faces === 'undefined') {
                                            continue;
                                        }
                                        else {
                                            img1.innerHTML +=
                                            `<img class="tilt" src="${pagek.data[i].card_faces[0].image_uris.normal}">`;
                                            img1.innerHTML +=
                                            `<img class="tilt" src="${pagek.data[i].card_faces[1].image_uris.normal}">`;
                                            continue;
                                        }
                                    }
                                    img1.innerHTML += `<img class="tilt" src="${pagek.data[i].image_uris.normal}">`;
                                }
                            }
                        })
                        .catch(error => {
                            console.log("Error:", error);
                        });
                    }
                }
            })
            // call 3d hover effect function after new img's loaded (imported)
            .then(setTimeout(hover, 4 * 1000))
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

            // call for img 3d hover AFTER new img's load  ******** 3 seconds current MINIMUM  *************   called again for larger searches 
            setTimeout(hover, 10 * 1000);
            setTimeout(hover, 20 * 1000);
            // auto scroll to top while loading cards
            window.scrollTo(0, 1);
            setTimeout(loadingRing, 6 * 1000);  

            event.preventDefault();
            // stop form from submitting 
            setTimeout(()=> {
                return false;
            }, 2 * 1000)
            //return false;
        }
    }
});