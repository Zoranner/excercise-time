<script lang="ts" setup>
interface Particle {
    x: number
    y: number
    width: number
    height: number
    vx: number
    vy: number
    angle: number
    color: string
    spinSpeed: number
    dead: boolean
}

const emits = defineEmits(['stoped'])

const width = Glbc.screenWidth
const height = Glbc.screenHeight
const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4CAF50",
    "#8BC34A",
    "#CDDC39",
    "#FFEB3B",
    "#FFC107",
    "#FF9800",
    "#FF5722",
    "#795548",
]
const particles: Particle[] = []
const context = Taro.createCanvasContext('surpriseCanvas')

const randomRange = (min: number, max: number) => {
    return min + Math.random() * (max - min)
}

const convertToRadians = (degree: number) => {
    return degree * (Math.PI / 180);
}

const drawParticle = (particle: Particle) => {
    context.save()
    context.translate(particle.x, particle.y)
    context.rotate(particle.angle)
    context.fillStyle = particle.color
    context.beginPath()
    // drawStar(0, 0, 5, this.boxW, this.boxH)
    context.fillRect(
        (particle.width / 2) * -1,
        (particle.height / 2) * -1,
        particle.width,
        particle.height
    )
    context.fill()
    context.closePath()
    context.restore()
    particle.angle += particle.spinSpeed
    particle.vy *= 0.999
    particle.vy += 0.3
    particle.x += particle.vx
    particle.y += particle.vy
    if (particle.y < 0) {
        particle.vy *= -0.2
        particle.vx *= 0.9
    }
    if (particle.y > height) {
        particle.spinSpeed = 0
        particle.y = height
        particle.vy *= -0.2
        particle.vx *= 0.9
        particle.dead = true
    }
    if (particle.x > width || particle.x < 0) {
        particle.vx *= -0.5
    }
    // console.log(particle)
}

const drawScreen = () => {
    for (var i = 0; i < particles.length; i++) {
        if (particles[i].dead == true) {
            particles.splice(i, 1)
            continue
        }
        drawParticle(particles[i])
    }
    context.draw()
}

const updateCanvas = () => {
    if (particles.length === 0) {
        emits('stoped')
        return
    }
    context.clearRect(0, 0, width, height)
    drawScreen()
    requestAnimationFrame(updateCanvas)
}

const surpriseClicked = () => {
    if (particles.length > 0) {
        particles.splice(0, particles.length)
    }
    for (var i = 0; i < 100; i++) {
        particles.push({
            x: width / 2,
            y: height - 10,
            width: randomRange(5, 20),
            height: randomRange(5, 20),
            vx: randomRange(-18, 18),
            vy: randomRange(-50, -10),
            angle: convertToRadians(randomRange(0, 360)),
            color: colors[Math.floor(Math.random() * colors.length)],
            spinSpeed: randomRange(-0.2, 0.2),
            dead: false,
        })
    }
	Vibrate.longTwice(0)
    updateCanvas()
}

defineExpose({
    surpriseClicked
})
</script>

<template>
    <view class="surpriseViewArea">
        <canvas id="surpriseCanvas" canvas-id="surpriseCanvas">
        </canvas>
    </view>
</template>

<style lang="scss">
.surpriseViewArea {
    #surpriseCanvas {
        width: 100%;
        height: 100%;
        // background-color: #000;
    }
}
</style>
