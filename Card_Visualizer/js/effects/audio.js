let url  = "../../Card_Visualizer/static/audio/sun5.mp3";
export let audioSun;
export let gainNode;

export function audioSunInit() {
	if (audioSun === undefined) {
		audioSun = new AudioContext();
		audioSun.suspend();
		gainNode = audioSun.createGain();

		console.log(audioSun);
		let source = audioSun.createBufferSource();
				//connect it to the destination so you can hear it.
			source.connect(gainNode);
			gainNode.connect(audioSun.destination);
			gainNode.gain.value = 0.08;
			//gainNode.gain.value = 0.1;
				
				/* --- load buffer --- */
			let request = new XMLHttpRequest();
				//open the request
			request.open('GET', url, true); 
				//webaudio paramaters
			request.responseType = 'arraybuffer';
				//Once the request has completed... continue
			request.onload = function() {
				audioSun.decodeAudioData(request.response, function(response) {
						/* --- play the sound AFTER the buffer loaded --- */
						//set the buffer to the response we just received.
					source.buffer = response;
						//start(0) should play asap.
					source.start(0);
					source.loop = true;
				}, function () { console.error('The request failed.'); } );
			}
				//Now that the request has been defined, actually make the request. (send it)
			request.send(); 
	}
}

//export const audioYellow = new Audio("../../static/audio/NexusEdit.ogg");
export const audioYellow = new Audio("../../Card_Visualizer/static/audio/AnimaEdit.mp3");
	audioYellow.volume = (0.3);
	audioYellow.autoplay = true;
	audioYellow.muted = true;
	audioYellow.loop = true;

export const audioBlue = new Audio("../../Card_Visualizer/static/audio/LightsEdit.mp3");
	audioBlue.volume = (0.4);
	audioBlue.autoplay = true;
	audioBlue.muted = true;
	audioBlue.loop = true;

export const audioGreen = new Audio("../../Card_Visualizer/static/audio/PlasmaEdit.mp3");
	audioGreen.volume = (0.3);
	audioGreen.autoplay = true;
	audioGreen.muted = true;
	audioGreen.loop = true;

// testing song, remove before release
export const audioE = new Audio("../../Card_Visualizer/static/audio/E-edit.mp3");
	audioE.volume = (0.3);
	audioE.autoplay = true;
	audioE.muted = true;
	audioE.loop = true;