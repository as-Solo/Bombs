// Solo 06/09/2024

class GameData{
    constructor(){
        this.startScreen = document.querySelector("#inicio");
        this.gameScreen = document.querySelector("#game");
        this.gameBoard = document.querySelector("#game-board");
        this.gameEndScreen = document.querySelector("#ranking");
        this.numBombs = document.querySelector("#bombas span");
        this.width = 1100;
        this.height = 750;
        this.numEnemies = 1;
        this.enemies = [];
        this.enemiesPos = [['x', 'y']];
        this.puerta = ['x', 'y'];
        this.muros = [];

        this.map = [
            '11111111111111111',
            '10000000000000001',
            '10101010101010101',
            '10002000000000001',
            '10101010101010101',
            '10002000000000001',
            '10101010101010101',
            '10002000000000001',
            '10101010101010101',
            '10000000000000001',
            '11111111111111111',
        ]
        this.elementosColisionables = [];

        this.tiempo = 343;
        this.scores = 0
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = 1000/60

        this.initialPosition = [50, 50]
        this.player = new Bomberman(this.gameBoard, this.initialPosition[0], this.initialPosition[1], "./images/player-stand.png");
    }

    // crearMuro(left, top){
    //     const muro = new Muro(left, top, this.gameBoard)
    //     this.muros.push(muro);
    //     // const muroNode = document.createElement("img")
    //     // muroNode.src = "./images/muro.png"
    //     // muroNode.style.position = "absolute"
    //     // muroNode.style.top = `${i * 50}px`;
    //     // muroNode.style.left = `${j * 50}px`;
    //     // muroNode.style.width = `${50}px`;
    //     // muroNode.style.height = `${50}px`;
    //     // this.gameBoard.append (muroNode);
    //     // this.muros.push(muroNode);
    // }

    crearLadrillo(i, j){
        const muroNode = document.createElement("img")
        muroNode.src = "./images/ladrillo.png"
        muroNode.style.position = "absolute"
        muroNode.style.top = `${i * 50}px`;
        muroNode.style.left = `${j * 50}px`;
        muroNode.style.width = `${50}px`;
        muroNode.style.height = `${50}px`;
        this.gameBoard.append (muroNode);
        this.muros.push(muroNode);
    }

    checkCollisions(){
        for (let i = this.muros.length - 1; i >= 0 ; i--) {
           
            // bloquear la direccion en caso de fufura colision
            const obstacle = this.muros[i];
            if (!(obstacle instanceof Enemy)){

                let canMoveLeft = true;
                let canMoveRight = true;
                let canMoveUp = true;
                let canMoveDown = true;
                
                if (this.player.willCollide(obstacle.element, -1, 0)) {
                    canMoveLeft = false;
                }
                if (this.player.willCollide(obstacle.element, 1, 0)) {
                    canMoveRight = false;
                }
                if (this.player.willCollide(obstacle.element, 0, -1)) {
                    canMoveUp = false;
                }
                if (this.player.willCollide(obstacle.element, 0, 1)) {
                    canMoveDown = false;
                }
                
                if (!canMoveLeft && this.player.leftDirection === -1) {
                    this.player.leftDirection = 0;
                }
                if (!canMoveRight && this.player.leftDirection === 1) {
                    this.player.leftDirection = 0;
                }
                if (!canMoveUp && this.player.topDirection === -1) {
                    this.player.topDirection = 0;
                }
                if (!canMoveDown && this.player.topDirection === 1) {
                    this.player.topDirection = 0;
                } 
            }

            // colisiones contra muros
            if (this.player.didCollide(obstacle.element)) {
                this.player.isColide = true;
                // console.log("TASMATAO!!!")
            }
            else{
                this.player.isColide = false;
            }

            // ver si las llamas de las bombas colisionan
            this.player.bombasPuestas.forEach((bomba)=>{
                ((obstacle, i)=>{
                    // console.log(obstacle instanceof Ladrillo)
                    if ((obstacle instanceof Muro) && (bomba.didCollide(50, 0, 0, 0, obstacle.element))){
                        bomba.llamaLeft = false;
                        // console.log("left")
                    }
                    else if((obstacle instanceof Ladrillo) && (bomba.didCollide(50, 0, 0, 0, obstacle.element))){
                        const del = i;
                        this.muros.splice(del, 1)
                        setTimeout(()=>{
                            obstacle.element.style.display = "none"
                        }, 3500)
                    }
                    if ((obstacle instanceof Muro) && (bomba.didCollide(0, 50, 0, 0, obstacle.element))){
                        bomba.llamaRight = false;
                        // console.log("right")

                    }
                    else if((obstacle instanceof Ladrillo) && (bomba.didCollide(0, 50, 0, 0, obstacle.element))){
                        const del = i;
                        this.muros.splice(del, 1)
                        setTimeout(()=>{
                            obstacle.element.style.display = "none"
                        }, 3500)
                    }
                    if ((obstacle instanceof Muro) && (bomba.didCollide(0, 0, 50, 0, obstacle.element))){
                        bomba.llamaTop = false;
                        // console.log("top")

                    }
                    else if((obstacle instanceof Ladrillo) && (bomba.didCollide(0, 0, 50, 0, obstacle.element))){
                        const del = i;
                        this.muros.splice(del, 1)
                        setTimeout(()=>{
                            obstacle.element.style.display = "none"
                        }, 3500)
                    }
                    if ((obstacle instanceof Muro) && (bomba.didCollide(0, 0, 0, 50, obstacle.element))){
                        bomba.llamaBottom = false;
                        // console.log("bottom")

                    }
                    else if((obstacle instanceof Ladrillo) && (bomba.didCollide(0, 0, 0, 50, obstacle.element))){
                        const del = i;
                        this.muros.splice(del, 1)
                        setTimeout(()=>{
                            obstacle.element.style.display = "none"
                        }, 3500)
                    }
                })(obstacle, i)
            })
        }
    }

    start(){
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        for (let i = 0; i<this.map.length; i++){
            for (let j = 0; j<this.map[i].length; j++){
                if (this.map[i][j] === '1'){
                    const muro = new Muro(j*50, i*50, this.gameBoard)
                    this.muros.push(muro)
                }
                else if (this.map[i][j] === '2'){
                    const ladrillo = new Ladrillo(j*50, i*50, this.gameBoard)
                    this.muros.push(ladrillo)
                }
            }
        }
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "flex";
        this.gameIntervalId = setInterval(() => {this.gameLoop()}, this.gameLoopFrequency)
    };

    
    gameLoop(){
        this.update();
        // if (this.gameIsOver) {
        //     clearInterval(this.gameIntervalId)
        // }
    };

    bombList(){
        if (this.player.bombasPuestas.length > 0){
            for (let i = this.player.bombasPuestas.length - 1; i >= 0; i--){
                if (this.player.bombasPuestas[i].explotar){
                    this.player.bombasPuestas[i].boom()
                    const deleteBomb = this.player.bombasPuestas[i].element;
                    this.player.bombasPuestas.splice(i, 1);
                    setTimeout(()=>{
                        deleteBomb.remove()
                    }, 4000)
                }
            }
        }
    }
    update(){
        // this.checkPosition();
        this.numBombs.innerText = this.player.numBombs - this.player.bombasPuestas.length
        this.bombList();
        this.checkCollisions();
        this.player.move();
    };
}









// maybe...
// this.tablero = [
//     ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
//     ['0', 'J', 'M', '0', '0', '0', '0', '0', '0', 'M', '0'],
//     ['0', '0', 'M', '0', '0', '0', 'M', '0', '0', 'M', '0'],
//     ['0', '0', 'M', '0', '0', '0', 'M', '0', '0', 'M', '0'],
//     ['0', '0', 'M', '0', '0', '0', 'P', '0', '0', 'M', '0'],
//     ['0', '0', 'M', '0', '0', '0', 'M', '0', '0', 'M', '0'],
//     ['0', '0', 'M', 'M', 'M', 'M', 'M', '0', 'M', 'M', '0'],
//     ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
//     ['0', '0', '0', '0', '0', '0', 'E', '0', '0', '0', '0'],
//     ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
// ]


// this.map = [
//     '11111111111111111',
//     '10000000000000001',
//     '10000000000000001',
//     '10001000010010001',
//     '10001000010010001',
//     '10001000011110001',
//     '10001000010010001',
//     '10001000010010001',
//     '10000000000000001',
//     '10000000000000001',
//     '11111111111111111',
// ]