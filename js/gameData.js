// Solo 06/09/2024

class GameData{
    constructor(){
        this.startScreen = document.querySelector("#inicio");
        this.gameScreen = document.querySelector("#game");
        this.gameBoard = document.querySelector("#game-board");
        this.gameEndScreen = document.querySelector("#ranking");
        this.numBombs = document.querySelector("#bombas span");
        this.speed = document.querySelector("#speed");
        this.numVidas = document.querySelector("#vidas");
        this.minutos = document.querySelector("#crono .minutos");
        this.segundos = document.querySelector("#crono .segundos");
        this.width = 1100;
        this.height = 750;
        this.numEnemies = 0;
        this.enemies = [];
        // this.enemiesPos = [['x', 'y']]; //deprecated
        // this.puerta = ['x', 'y']; // deprecated
        this.muros = [];

        this.map = [
            '11111111111111111',
            '10000000000000001',
            '10101010101010101',
            '10002000000000001',
            '101010101e1010101',
            '100020000E0000001',
            '10101010101010101',
            '100020000000e0001',
            '10101010101010101',
            '1e0000000000000e1',
            '11111111111111111',
        ]
        this.elementosColisionables = [];

        this.tiempo = 342;
        this.scores = 0
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = 1000/60

        this.initialPosition = [50, 50]
        this.player = new Bomberman(this.gameBoard, this.initialPosition[0], this.initialPosition[1], "./images/player-stand.png");
        this.crono = new Crono(this.tiempo);
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

    // crearLadrillo(i, j){
    //     const muroNode = document.createElement("img")
    //     muroNode.src = "./images/ladrillo.png"
    //     muroNode.style.position = "absolute"
    //     muroNode.style.top = `${i * 50}px`;
    //     muroNode.style.left = `${j * 50}px`;
    //     muroNode.style.width = `${50}px`;
    //     muroNode.style.height = `${50}px`;
    //     this.gameBoard.append (muroNode);
    //     this.muros.push(muroNode);
    // }

    checkCollisionsWalls(){
        for (let i = this.muros.length - 1; i >= 0 ; i--) {
           
            // bloquear la direccion en caso de fufura colision
            const obstacle = this.muros[i];
            
            if (this.player.willCollide(obstacle.element, -1, 0)) {
                this.player.canMoveLeft = false;
            }
            else{
                this.player.canMoveLeft = true
            }
            if (this.player.willCollide(obstacle.element, 1, 0)) {
                this.player.canMoveRight = false;
            }
            else{
                this.player.canMoveRight = true
            }
            if (this.player.willCollide(obstacle.element, 0, -1)) {
                this.player.canMoveUp = false;
            }
            else{
                this.player.canMoveUp = true
            }
            if (this.player.willCollide(obstacle.element, 0, 1)) {
                this.player.canMoveDown = false;
            }
            else{
                this.player.canMoveDown = true
            }
            
            if (!this.player.canMoveLeft && this.player.leftDirection === -1) {
                this.player.leftDirection = 0;
            }
            if (!this.player.canMoveRight && this.player.leftDirection === 1) {
                this.player.leftDirection = 0;
            }
            if (!this.player.canMoveUp && this.player.topDirection === -1) {
                this.player.topDirection = 0;
            }
            if (!this.player.canMoveDown && this.player.topDirection === 1) {
                this.player.topDirection = 0;
            }


            this.enemies.forEach((enemigo)=>{
                ((obstacle)=>{
                    if (enemigo.willCollide(obstacle.element, -1, 0)) {
                        enemigo.canMoveLeft = false;
                    }
                    else{
                        enemigo.canMoveLeft = true
                    }
                    if (enemigo.willCollide(obstacle.element, 1, 0)) {
                        enemigo.canMoveRight = false;
                    }
                    else{
                        enemigo.canMoveRight = true
                    }
                    if (enemigo.willCollide(obstacle.element, 0, -1)) {
                        enemigo.canMoveUp = false;
                    }
                    else{
                        enemigo.canMoveUp = true
                    }
                    if (enemigo.willCollide(obstacle.element, 0, 1)) {
                        enemigo.canMoveDown = false;
                    }
                    else{
                        enemigo.canMoveDown = true
                    }
                    
                    if (!enemigo.canMoveLeft && enemigo.leftDirection !== 0) {
                        enemigo.leftDirection *= -1;
                    }
                    if (!enemigo.canMoveRight && enemigo.leftDirection !== 0) {
                        enemigo.leftDirection *= -1;
                    }
                    if (!enemigo.canMoveUp && enemigo.topDirection !== 0) {
                        enemigo.topDirection *= -1;
                    }
                    if (!enemigo.canMoveDown && enemigo.topDirection !== 0) {
                        enemigo.topDirection *= -1;
                    }
                    if (enemigo.didCollide(obstacle.element)){
                        let susodicho = enemigo;
                        console.log("COLISION!!!!")
                        susodicho.topDirection = 0;
                        susodicho.leftDirection = 0;
                        susodicho.ajustarLeft();
                        susodicho.ajustarAlto();
                        setTimeout(()=>{
                            // console.log("Enemigo ", susodicho)
                            if (enemigo.willCollide(obstacle.element, 0, 1)){
                                enemigo.topDirection = -1;
                            }
                            else if (enemigo.willCollide(obstacle.element, 0, -1)){
                                enemigo.topDirection = 1;
                            }
                            else if (enemigo.willCollide(obstacle.element, 1, 0)){
                                enemigo.leftDirection = -1;
                            }
                            else if (enemigo.willCollide(obstacle.element, -1, 0)){
                                enemigo.leftDirection = 1;
                            }
                        }, 300)
                        // if (enemigo.willCollide(obstacle.element, 0, 1)){
                        //     enemigo.topDirection = -1;
                        // }
                        // else if (enemigo.willCollide(obstacle.element, 0, -1)){
                        //     enemigo.topDirection = 1;
                        // }
                        // else if (enemigo.willCollide(obstacle.element, -1, 0)){
                        //     enemigo.leftDirection = 1;
                        // }
                        // else if (enemigo.willCollide(obstacle.element, -1, 0)){
                        //     enemigo.leftDirection = 1;
                        // }
                    }
                    // console.log(enemigo.canMoveDown, enemigo.canMoveLeft, enemigo.canMoveUp, enemigo.canMoveRight)
                    // console.log(enemigo.left, enemigo.top, this.gameBoard.offsetHeight)
                })(obstacle)
            })
            

            // colisiones contra muros  // deprecated Usalo para loa enemigos
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
                else if (this.map[i][j] === 'e'){
                    let randomDirection = (Math.floor(Math.random()* 2))
                    console.log(randomDirection)
                    const enemy = new Enemy(j*50, i*50, this.gameBoard, randomDirection, (1 - randomDirection))
                    this.enemies.push(enemy)
                    this.numEnemies++;
                }
            }
        }
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "flex";
        this.gameIntervalId = setInterval(() => {this.gameLoop()}, this.gameLoopFrequency)
    };

    
    gameLoop(){
        this.update();
        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId)
        }
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
        this.numVidas.innerText = this.player.vidas
        this.speed.innerText = `x${this.player.speedBonus}`
        this.minutos.innerText = this.crono.minutes
        this.segundos.innerText = this.crono.seconds
        this.numBombs.innerText = this.player.numBombs - this.player.bombasPuestas.length
        this.bombList();
        this.checkCollisionsWalls();
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