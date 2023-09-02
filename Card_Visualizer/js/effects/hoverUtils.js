import {THRESHOLD} from '../main.js'

export function handleHover(e) {
    const { clientX, clientY, currentTarget } = e;
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

    const horizontal = (clientX - offsetLeft) / clientWidth;
    // added -window.scrollY to fix distortin on scroll
    const vertical = (clientY - (offsetTop - window.scrollY)) / clientHeight;

    // this can be positive or negative to reverse the dynamic 3d (hover) effect
    const rotateX = -(THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
    const rotateY = -(vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

    this.style.transform =
    `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1.18, 1.18, 1.18)`;
}

export function resetStyles(e) {
    this.style.zIndex = "10";
    this.style.transform =
    `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
}