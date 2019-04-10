var white = "#eae9da"
var black = "#000"
var green = "rgb(46, 171, 98)"
var orange = "#f76300"
var sphereColor = [white, green, orange]
var color = ["46, 171, 98","247, 99, 0"]

class ProgressBar{
    constructor(y){
        this.x = 0
        this.y = y
        this.height = 5
        this.progress = 0
        this.style = black
    }

    draw(){
        ctx.beginPath()
        ctx.fillStyle = this.style
        ctx.rect(this.x, this.y, this.progress, this.height)
        ctx.fill()
        ctx.closePath()

        ctx.save()
        ctx.beginPath()
        ctx.translate(canvas.width/2,(canvas.height/2)-this.height*2)
        ctx.font = "30px Arial";
        ctx.fillText("Loading...", 0, 0)
        ctx.closePath()
        ctx.restore()
    }

    update(progress){
        this.progress = progress
        this.draw()
    }
}

class Background{
    constructor(h, w){
        this.width = w
        this.height = h
        this.style = white
        this.started = false
        this.position = canvas.height*2
    }

    draw(){
        ctx.beginPath()
        if (this.started) {
            var gradient = ctx.createLinearGradient(this.width/2, 0, this.width/2, this.position)
            gradient.addColorStop(0, 'rgba(0,0,0,1)')
            gradient.addColorStop(1, 'rgba(12, 50, 117, 1)')
            ctx.fillStyle = gradient;
        } else {
            ctx.fillStyle = white
        }
        ctx.rect(0,0,this.width, this.height)
        ctx.fill()
        ctx.closePath()
    }

    update(h, w, p){
        this.width = parseInt(w)
        this.height = parseInt(h)
        this.position = p
        this.draw()
    }
}

class CircleStart{
    constructor(){
        this.x = 0
        this.y = 0
        this.targetX = 0
        this.targetY = 0
        this.velocity = 0.1
        this.velocityR = 0.0001
        this.startR = 50
        this.r = 50
        this.targetR = 50
        this.style = black
    }

    draw(){
        ctx.beginPath()
        ctx.fillStyle = this.style
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2)
        ctx.fill()
        ctx.closePath()
    }

    update(x, y, r, t){
        this.targetX = x
        this.targetY = y
        this.targetR = r
        this.x += (this.targetX - this.x)*this.velocity
        this.y += (this.targetY - this.y)*this.velocity
        if (t>0) {
            this.r = this.easeInCubic(t, this.startR, this.targetR-this.startR, 9800)
        }
        this.draw()
    }

    easeInCubic(t,b,c,d) {
		return c*(t/=d)*t*t + b;
	}
}

class Sphere{
    constructor(x,y,z){
        this.x = x
        this.y = y
        this.z = z
        this.radius = 10
        this.opacity = 1
        this.style = white
    }

    draw(){
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = this.style
        ctx.arc(starX,starY,starRadius,0,Math.PI*2)
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }

    update(centerX, centerY, focalLength, basseFreq, opacity, velocity){
        starX = (this.x - centerX) * (focalLength / this.z)
        starX += centerX

        starY = (this.y - centerY) * (focalLength / this.z)
        starY += centerY

        this.radius = basseFreq
        this.opacity = opacity

        starRadius = this.radius * (focalLength/this.z)

        this.z += velocity

        if(this.z <= 0){
            this.z = parseInt(canvas.width)
        }
        this.draw()
    }


}

class Star{
    constructor(x,y,velocityX, velocityY, radius){
        this.x = x
        this.y = y
        this.startX = x
        this.startY = y
        this.velocityX = velocityX
        this.velocityY = velocityY
        this.radius = radius
        this.style = white
    }

    draw(dx, dy){
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = this.style
        ctx.translate(this.x + dx,this.y + dy)
        ctx.arc(0,0,this.radius,0,Math.PI*2)
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }

    update(distanceX, distanceY){
        if (this.x >= w) {
            this.x = 0
        } 
        else if (this.x <= 0){
            this.x = w
        }

        if (this.y >= h) {
            this.y = 0
        } else if (this.y <= 0){
            this.y = h
        }

        this.x += this.velocityX
        this.y += this.velocityY

        this.draw(distanceX/20, distanceY/20)
    }

    
    lineTo(target, opacity, dx, dy, c){
        ctx.beginPath()
        ctx.strokeStyle = "rgba("+color[c]+","+opacity+")"
        ctx.moveTo(this.x + dx/20, this.y + dy/20)
        ctx.lineTo(target.x + dx/20, target.y + dy/20)
        ctx.stroke()
        ctx.closePath()
    }


}