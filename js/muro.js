class Muro{
    constructor(left, top, screen){
        this.left = left;
        this.top = top;
        this.w = 50;
        this.h = 50;
        this.screen = screen;

        this.element = document.createElement("img")
        this.element.src = "./images/muro.png"
        this.element.style.position = "absolute"
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${50}px`;
        this.screen.append(this.element)
    }
}