import {handleHover, resetStyles} from './hoverUtils.js'; 

export function hover() {
    document.querySelectorAll('.tilt').forEach(item => {
        item.addEventListener('mousemove', handleHover, false)
    })
    document.querySelectorAll('.tilt').forEach(item => {
        item.addEventListener('mouseleave', resetStyles, false)
    })
}