// import audio music
import {audioYellow, audioBlue, audioGreen, audioSun, audioE, audioSunInit} from './audio.js';
import {lastPlayed} from './starToggle.js';

export const musicToggle = document.addEventListener('DOMContentLoaded', function() {
	
    const music = document.getElementById('music');

    music.onclick = () => {

        // if all muted
        if (audioYellow.muted == true && audioBlue.muted == true && audioGreen.muted == true) {
            if (lastPlayed.song == undefined) {
                lastPlayed.song = audioYellow;
            }
            // update music !mute image
            music.src = "../../static/star/mNote.png";
            // select last played song and load
            lastPlayed.song.play();
            lastPlayed.song.muted = false;
            
            audioSunInit();
            audioSun.play();

          // else mute music
        } else if (audioYellow.muted == false) {
            music.src = "../../static/star/mNoteRed.png";
            audioYellow.pause();
            audioYellow.muted = true;
            audioSun.pause();
        } else if (audioBlue.muted == false) {
            music.src = "../../static/star/mNoteRed.png";
            audioBlue.pause();
            audioBlue.muted = true;
            audioSun.pause();
        } else if (audioGreen.muted == false) {
            music.src = "../../static/star/mNoteRed.png";
            audioGreen.pause();
            audioGreen.muted = true;
            audioSun.pause();
        }
    }
    // testing song, remove before release
    let sSong = document.getElementById('sSong');
    sSong.onclick = () => {
        if (audioE.muted == false) {
            audioE.pause();
            audioE.muted = true;
            audioSunInit();
            audioSun.pause();
        }else if (audioYellow.muted == true && audioBlue.muted == true && audioGreen.muted == true) {
            audioE.load();
            audioE.muted = false;
        }
    }
});