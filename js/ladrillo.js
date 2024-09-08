class Ladrillo{
    constructor(left, top, screen){
        this.left = left;
        this.top = top;
        this.width = 50;
        this.height = 50;
        this.isBonus = false;
        this.bonusType = "tipo de Bonus";
        this.screen = screen;

        this.element = document.createElement("img")
        this.element.src = "./images/ladrillo.png"
        this.element.style.position = "absolute"
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${50}px`;
        this.screen.append(this.element)
    }
}