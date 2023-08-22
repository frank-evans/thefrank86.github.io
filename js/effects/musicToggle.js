// import audio music
import {audioYellow, audioBlue, audioGreen, audioSun, audioE} from './audio.js';
import {lastPlayed} from './starToggle.js';

export const musicToggle = document.addEventListener('DOMContentLoaded', function() {
	
    const music = document.getElementById('music');

    music.onclick = () => {

        // if all muted
        if (audioYellow.muted == true && audioBlue.muted == true && audioGreen.muted == true) {
            // update music !mute image
            music.src = "../../static/star/mNote.png";
            // select last played song and load
            lastPlayed.play();
            lastPlayed.muted = false;
            audioSun.muted = false;

          // else mute music
        } else if (audioYellow.muted == false) {
            music.src = "../../static/star/mNoteRed.png";
            audioYellow.pause();
            audioYellow.muted = true;
            audioSun.muted = true;
        } else if (audioBlue.muted == false) {
            music.src = "../../static/star/mNoteRed.png";
            audioBlue.pause();
            audioBlue.muted = true;
            audioSun.muted = true;
        } else if (audioGreen.muted == false) {
            music.src = "../../static/star/mNoteRed.png";
            audioGreen.pause();
            audioGreen.muted = true;
            audioSun.muted = true;
        }
    }
    // testing song, remove before release
    let sSong = document.getElementById('sSong');
    sSong.onclick = () => {
        if (audioE.muted == false) {
            audioE.pause();
            audioE.muted = true;
        }else if (audioYellow.muted == true && audioBlue.muted == true && audioGreen.muted == true) {
            audioE.load();
            audioE.muted = false;
        }
    }
});