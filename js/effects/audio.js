/*export let audioSun;
export function audioSunInit() {
	if (audioSun === undefined) {
		audioSun = new Gapless5();
		audioSun.addTrack("../../static/audio/sun5.ogg");
		audioSun.volume = (0.10);
		audioSun.loop = true;
		//console.log(audioSun);
	}
}
	audioSun.volume = (0.05); */

import { AudioContext as audioCtx, decodeAudioData } from 'https://jspm.dev/standardized-audio-context';
//let url  = "../../static/audio/sun5.ogg";
//let url  = `<audio src="../../static/audio/sun5.ogg"></audio>`;
let audioElement = document.querySelector("audio");
export let audioSun;
export let gainNode;

export function audioSunInit() {
	if (audioSun === undefined) {
		audioSun = new audioCtx();
		gainNode = audioSun.createGain();

		audioSun.createBuffer(2, 22050, 44100);
		console.log(audioSun);
		//let source = audioSun.createBufferSource();
				//connect it to the destination so you can hear it.
			//source.connect(gainNode);
			let track = audioSun.createMediaElementSource(audioElement);
			track.connect(gainNode);
			gainNode.connect(audioSun.destination);
			//gainNode.gain.value = 0.05;
			gainNode.gain.value = 0.1;

			audioElement.loop = true;
			audioElement.play();
			audioSun.suspend();
			/*async function safariAudio() {
				const response = await fetch("../../static/audio/sun5.ogg");
				const arrayBuffer = await response.arrayBuffer();
				const audioBuffer = await decodeAudioData(audioSun, arrayBuffer);
			}
			safariAudio(); */
				
				/* --- load buffer ---  
			let request = new XMLHttpRequest();
				//open the request
			request.open('GET', url, true); 
				//webaudio paramaters
			request.responseType = 'arraybuffer';
				//Once the request has completed... do this
			request.onload = function() {
				audioSun.decodeAudioData(request.response, function(response) {
						/* --- play the sound AFTER the buffer loaded --- 
						//set the buffer to the response we just received.
					source.buffer = response;
						//start(0) should play asap.
					source.start(0);
					source.loop = true;
				}, function () { console.error('The request failed.'); } );
			}
				//Now that the request has been defined, actually make the request. (send it)
			request.send(); */
	}
}

//export const audioYellow = new Audio("../../static/audio/NexusEdit.ogg");
export const audioYellow = new Audio("../../static/audio/AnimaEdit.ogg");
	audioYellow.volume = (0.3);
	audioYellow.autoplay = true;
	audioYellow.muted = true;
	audioYellow.loop = true;

export const audioBlue = new Audio("../../static/audio/LightsEdit.ogg");
	audioBlue.volume = (0.4);
	audioBlue.autoplay = true;
	audioBlue.muted = true;
	audioBlue.loop = true;

export const audioGreen = new Audio("../../static/audio/PlasmaEdit.ogg");
	audioGreen.volume = (0.3);
	audioGreen.autoplay = true;
	audioGreen.muted = true;
	audioGreen.loop = true;

// testing song, remove before release
export const audioE = new Audio("../../static/audio/E-edit.ogg");
	audioE.volume = (0.3);
	audioE.autoplay = true;
	audioE.muted = true;
	audioE.loop = true;