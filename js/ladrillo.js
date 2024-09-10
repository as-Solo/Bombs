class Ladrillo{
    constructor(left, top, screen, isBonus = false, bonusType = null){
        this.left = left;
        this.top = top;
        this.width = 50;
        this.height = 50;
        this.isBonus = isBonus;
        this.bonusType = bonusType;
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