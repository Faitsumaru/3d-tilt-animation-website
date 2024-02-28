import { gsap } from 'gsap'

let cx, cy, clientX, clientY, dx, dy, tiltx, tilty, request, radius, degree

document.addEventListener('DOMContentLoaded', () => {

    cx = window.innerWidth / 2
    cy = window.innerHeight / 2
    
    document.body.addEventListener('mouseover', e => {

        clientX = e.pageX
        clientY = e.pageY
        
        // console.log(e.pageX + ' / ' + e.pageY) //mouse cursor page position coords

        request = requestAnimationFrame(updateMe)

    })

    function updateMe() {
        dx = clientX - cx
        dy = clientY - cy

        tiltx = dy / cy
        tilty = dx / cx

        radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2))
        degree = radius * 15

        gsap.to('.content', 1, { transform: `rotate3d( ${tiltx}, ${tilty}, 0, ${degree}deg )` })
    }

})