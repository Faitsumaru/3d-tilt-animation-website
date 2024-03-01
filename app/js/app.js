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

        mouseCoords(e)
        cursor.classList.remove('hidden')
        aura.classList.remove('hidden')

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

    gsap.to('.card', { zoom: .98 })
	gsap.to('.l_main', { opacity: 1, duration: .1 })
	gsap.to('.l2_main', { opacity: 1, left: -15, top: 15, duration: .25, delay: .25 })
	gsap.to('.l3_main', { opacity: 1, left: -30, top: 30, duration: .25, delay: .25 })
	gsap.to('.card-russia', { opacity: .07, duration: .1 })
	gsap.to('.card-logo_w', { opacity: 1, duration: .225 })
	gsap.to('.card-chip', { opacity: 1, duration: .225 })
	gsap.to('.card-valid', { opacity: 1, zoom: 1, duration: .1, delay: .25 })
	gsap.to('.card-number-holder', { opacity: 1, zoom: 1, duration: .1, delay: .25 })


    //cursor & aura
    const cursor = document.getElementById('cursor'),
          aura = document.getElementById('aura'),
          links = document.querySelectorAll('a')

    let mouseX = 0, mouseY = 0, posX = 0, posY = 0

    function mouseCoords(e) {
        mouseX = e.pageX
        mouseY = e.pageY
    }

    gsap.to({}, .01, {

        repeat: -1, //infinite animation

        onRepeat: () => { //aura delay from cursor
            posX += (mouseX - posX) / 5
            posY += (mouseY - posY) / 5

            gsap.set(cursor, { //cursor coords setting
                css: {
                    left: mouseX,
                    top: mouseY
                }
            })

            gsap.set(aura, { //aura coords setting
                css: {
                    left: posX - 24,
                    top: posY - 24
                }
            })
        }

    })

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('mouseover', () => {
            cursor.classList.add('active')
            aura.classList.add('active')
        })

        links[i].addEventListener('mouseout', () => {
            cursor.classList.remove('active')
            aura.classList.remove('active')
        })
    }

    document.body.addEventListener('mouseout', () => {
        cursor.classList.add('hidden')
        aura.classList.add('hidden')
    })

})