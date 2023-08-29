export let audioSun;
export function audioSunInit() {
	if (audioSun === undefined) {
		audioSun = new Gapless5();
		audioSun.addTrack("../../static/audio/sun5.ogg");
		audioSun.volume = (0.10);
		audioSun.loop = true;
		//console.log(audioSun);
	}
}
/*export const audioSun = new Audio("../../static/audio/sun5.ogg");
	audioSun.volume = (0.05);
	audioSun.autoplay = true;
	audioSun.muted = true;
	audioSun.loop = true; */

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