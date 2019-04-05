class Paddle{
    constructor(){
        this.width = 100
        this.height = 25
        this.color = color(255)
        this.location =  createVector((width / 2) - (this.width / 2), height - 35)
    }

    display(){
        fill(this.color)
        Rect(this.location.x, this.location.y, this.width, this.height )
    }
}