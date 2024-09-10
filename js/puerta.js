class Puerta{
    constructor(left, top, screen){
        this.left = left;
        this.top = top;
        this.w = 50;
        this.h = 50;
        this.screen = screen;
        this.isOpen = false;
        this.isCollide = false;

        this.path = "./images/portal/po_";
        this.sprite = ['01.png', '02.png', '03.png', '04.png', '05.png', '06.png', '07.png', '08.png', '09.png', '10.png', '11.png', '12.png', '13.png', '14.png', '15.png', '16.png'];
        this.spriteW = ['09.png', '10.png', '11.png', '12.png', '10.png'];

        this.element = document.createElement("img");
        this.element.src = `${this.path}${this.sprite[0]}`
        this.element.style.position = "absolute";
        this.element.style.width = `${this.w}px`;
        this.element.style.height = `${this.h}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        this.screen.appendChild(this.element);

        this.openId = null;
        this.waitId = null;
        // this.open()
    }

    open(){
        this.isCollide = true
        let i = 0;
        this.openId = setInterval(()=>{
            i++
            this.element.src = `${this.path}${this.sprite[i]}`
            if (i>=9){
                clearInterval(this.openId)
            }
        }, 1500)
        i = 0;
        this.waitId = setInterval(()=>{
            i++;
            this.element.src = `${this.path}${this.spriteW[i % this.spriteW.length]}`
        }, 200)
    }
    close(){
        //ojo que aqui tienes que cuadrarlo con la animacion de desaparicion de player
    }
}