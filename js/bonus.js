class Bonus{
    constructor(left, top, type, screen){
        this.screen = screen;
        this.left = left;
        this.top = top;
        this.w = 50;
        this.h =50;
        this.type = type;
        
        if (this.type === 'speed')
            this.imgSrc = "./images/speed.png"

        this.element = document.querySelector('img');
        this.element.src = imgSrc;
        this.element.style.width = `${this.w}px`;
        this.element.style.height = `${this.h}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        this.element.style.position = "absolute";

        this.screen.appendChild(this.element)
    }
}