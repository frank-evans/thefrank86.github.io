// image 3D effect on hover scripting

document.querySelectorAll('img').forEach(item => {
	item.addEventListener('mousemove', handleHover, false)
  })

document.querySelectorAll('img').forEach(item => {
	item.addEventListener('mouseleave', resetStyles, false)
  })

// hover angle threshold
const THRESHOLD = 10;


function handleHover(e) {
	const { clientX, clientY, currentTarget } = e;
	const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

	const horizontal = (clientX - offsetLeft) / clientWidth;
	// added -window.scrollY to fix distortin on scroll
	const vertical = (clientY - (offsetTop - window.scrollY)) / clientHeight;

	const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
	const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

	this.style.transform =
	`perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1.15, 1.15, 1.15)`;
}

function resetStyles(e) {
	this.style.transform =
	`perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
}