const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const collisionMap = [];
for(let i = 0; i < collisions.length; i += 70) {
    collisionMap.push(collisions.slice(i, 70 + i))
}

const boundaries = [];
const offset = {
    x: -158,
    y: -881
}

collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1025)
        boundaries.push(new Boundary({
            position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
        }
    }))
    })
})

const image = new Image();
image.src = 'assets/jogoMap.png'

const playerDownImg = new Image();
playerDownImg.src = 'assets/playerDown.png';

const player = new Sprite({
    position: {
        x: canvas.width / 2 - playerDownImg.width / 4,
        y: canvas.height / 2 - playerDownImg.height / 2
    },
    image: playerDownImg,
    frames: {
        max: 4
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const keys = {
    arrowUp: {
        pressed: false
    },
    arrowDown: {
        pressed: false
    },
    arrowLeft: {
        pressed: false
    },
    arrowRight: {
        pressed: false
    },
}

const movables = [background, ...boundaries]

function collision({rect1, rect2}) {
    return (rect1.position.x + rect1.width >= rect2.position.x &&
        rect1.position.x <= rect2.position.x + rect2.width &&
        rect1.position.y <= rect2.position.y + rect2.height &&
        rect1.position.y + rect1.height >= rect2.position.y
        )
}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    player.draw()

    let moving = true;
        if(keys.arrowUp.pressed && lastKey === 'ArrowUp') {
            for(let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if(
                    collision({
                    rect1: player,
                    rect2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }}
                })
                ) {
                    moving = false
                    break
                }
            }
            if(moving)
            movables.forEach((movable) => {movable.position.y += 3})
        }
        else if(keys.arrowDown.pressed && lastKey === 'ArrowDown') {
            for(let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if(
                    collision({
                    rect1: player,
                    rect2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }}
                })
                ) {
                    moving = false
                    break
                }
            }
            if(moving)
            movables.forEach((movable) => {movable.position.y -= 3})
        }
        else if(keys.arrowRight.pressed && lastKey === 'ArrowRight') {
            for(let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if(
                    collision({
                    rect1: player,
                    rect2: {...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }}
                })
                ) {
                    moving = false
                    break
                }
            }
            if(moving)
            movables.forEach((movable) => {movable.position.x -= 3})
        }
        else if(keys.arrowLeft.pressed && lastKey === 'ArrowLeft') {
            for(let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if(
                    collision({
                    rect1: player,
                    rect2: {...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }}
                })
                ) {
                    moving = false
                    break
                }
            }
            if(moving)
            movables.forEach((movable) => {movable.position.x += 3})
        }

        /* To move diagonally, you can just remove the else if's and the lastKey, and use if on all of them */
        
}
animate();

let lastKey = '';
window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
        keys.arrowUp.pressed = true;
        lastKey = 'ArrowUp'
        break;

        case 'ArrowDown':
        keys.arrowDown.pressed = true;
        lastKey = 'ArrowDown'
        break;

        case 'ArrowLeft':
        keys.arrowLeft.pressed = true;
        lastKey = 'ArrowLeft'
        break;

        case 'ArrowRight':
        keys.arrowRight.pressed = true;
        lastKey = 'ArrowRight'
        break;
    }
})

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'ArrowUp':
        keys.arrowUp.pressed = false;
        break

        case 'ArrowDown':
        keys.arrowDown.pressed = false;
        break

        case 'ArrowLeft':
        keys.arrowLeft.pressed = false;
        break

        case 'ArrowRight':
        keys.arrowRight.pressed = false;
        break
    }
})