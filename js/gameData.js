// Solo 06/09/2024

class GameData{
    constructor(){
        // -----------------------------------------------------------
        this.audioWin = document.createElement('audio');
        this.audioWin.src = "./audio/Next_Stage.mp3";
        this.audioGameOver = document.createElement('audio');
        this.audioGameOver.src = "./audio/Game_Over.mp3";
        this.audioGame = document.createElement('audio');
        this.audioGame.src = "./audio/Game_BSO.mp3";
        this.audioGame.loop = true;
        this.audioGame.volume = .1;
        this.audioRanking = document.createElement('audio');
        this.audioRanking.src = "./audio/Ranking.mp3";
        this.audioRanking.loop = true;
        this.audioRanking.volume = .1;

        this.audioMuerte = document.createElement('audio');
        this.audioMuerte.src = "./audio/muerte_player.mp3";

        this.audioInicio = document.querySelector('#audio-inicio');
        // -----------------------------------------------------------
        this.startScreen = document.querySelector("#inicio");
        this.gameScreen = document.querySelector("#game");
        this.gameBoard = document.querySelector("#game-board");
        this.gameEndScreen = document.querySelector("#ranking");
        this.numBombs = document.querySelector("#bombas span");
        this.speed = document.querySelector("#speed");
        this.numVidas = document.querySelector("#vidas");
        this.minutos = document.querySelector("#crono .minutos");
        this.segundos = document.querySelector("#crono .segundos");
        this.gameOverScreen = document.querySelector("#game-over");
        this.nextLevelScreen = document.querySelector("#next-level");
        
        this.nextLevelButtonPanel = document.querySelector(".container-boton-NL")
        
        this.textoBombas = document.querySelector("#bombas-usadas");
        this.textoTime = document.querySelector("#tiempo-total");
        this.textoMuertos = document.querySelector("#enemigos-eliminados");
        this.textoKillScore = document.querySelector("#kill-score");
        this.textoKillScoreSum = document.querySelector("#kill-score-sum");
        this.textoTitleScore = document.querySelector("#tittle-score");
        this.textoTitleScoreSum = document.querySelector("#tittle-score-sum");
        this.textoTimeScore = document.querySelector("#time-score");
        this.textoTimeScoreSum = document.querySelector("#time-score-sum");
        this.textoTotalScore = document.querySelector("#total-score");
        this.textoRanking = document.querySelector(".texto-ranking");
        // this.textoMaxPuntos = document.querySelector(".puntitos");
        // this.textoName = document.querySelector(".nombre-jugador");
        
        // this.enemiesKill = 0;// deprecated
        // this.titlePoints = 550; //deprecated
        // this.bombsUsed = 0; // deprecated
        // this.pointsTime = 0; // deprecated
        this.pointsEchKill = 300;
        this.wallDestroyed = 0;
        //tiempo de game - tiempo transcurrido de crono * 150
        // ya pensaremos algo para el numero de bombas, los titulos y sus puntuaciones
        //[piromano, francotirador, activista, manco]

        this.width = 1100;
        this.height = 750;
        // this.enemiesPos = [['x', 'y']]; //deprecated
        // this.puerta = ['x', 'y']; // deprecated
        this.numEnemies = 0;
        this.enemies = [];
        this.indexEnemiesDel = new Set();

        this.muros = [];
        this.indexMurosDel = new Set();

        this.map = levels[levelIndex];

        this.elementosColisionables = [];

        this.tiempo = 342; //342
        // this.scores = 0 // deprecated
        this.lives = 3;

        this.gameIsOver = false;
        this.nextStage = false;

        this.gameIntervalId = null;
        this.gameLoopFrequency = 1000/60

        this.initialPosition = [50, 50]
        this.player = new Bomberman(this.gameBoard, this.initialPosition[0], this.initialPosition[1]);
        this.crono = new Crono(this.tiempo);
        this.puerta = null;
    }
    // muros vs jugador. muro vs enemigos.
    checkCollisionsWalls(){
        for (let i = this.muros.length - 1; i >= 0 ; i--) {
           
            // BLOQUEAR EL MOVIMIENTO DEL JUGADOR CONTRA LOS MUROS
            // --------------------------------------------------------------------------------------------------
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
            // ------------------------------   HASTA AQUI JUGADOR MUROS   --------------------------------------
            // --------------------------------------------------------------------------------------------------
            // ------------------------------    EMPIEZA LOOP ENEMIGOS     --------------------------------------
            for (let j = this.enemies.length - 1; j >= 0; j--){
                const enemigo = this.enemies[j];
                
                if(enemigo.isInicio){
                    enemigo.ajustarAlto();
                    enemigo.ajustarLeft();
                    const coord_i = (enemigo.left / 50)
                    const coord_jL= (enemigo.top / 50 - 1)
                    const coord_jR= (enemigo.top / 50 + 1)
                    
                    const coord_j = (enemigo.top / 50)
                    const coord_iL= (enemigo.left / 50 - 1)
                    const coord_iR= (enemigo.left / 50 + 1)

                    if (this.map[coord_j][coord_iL] !== '0' && this.map[coord_j][coord_iR] !== '0'){
                        enemigo.topDirection = 1;
                        enemigo.leftDirection = 0;
                    }
                    else if (this.map[coord_jL][coord_i] !== '0' && this.map[coord_jR][coord_i] !== '0'){
                        enemigo.topDirection = 0;
                        enemigo.leftDirection = 1;
                    }
                    else{
                        // const randomChoice = Math.floor(Math.random()*2)
                        enemigo.topDirection = 1 //- randomChoice;
                        // enemigo.leftDirection = randomChoice;
                    }
                    enemigo.restore()
                    enemigo.isInicio = false;    
                }

                if (enemigo.didCollide(obstacle)){
                    console.log("")
                    enemigo.leftDirection *= -1;
                    enemigo.topDirection *= -1;
                }
            }
        }
    }
    // explosion vs muros. explosion vs enemigos. explosion vs jugador.
    checkCollisionExplosion() {
        for (let k = this.player.bombasPuestas.length - 1; k >= 0; k--){
            const bomba = this.player.bombasPuestas[k];
            if (!bomba.didCollide(0, 0, 0, 0, this.player.element)){
                bomba.isCollide = true;
            }
            // LLAMAS  ===============================================================
            for (let x = bomba.llamas.length - 1; x >= 0; x--){
                const llama = bomba.llamas[x];
                // MUROS ===========================================================================================================
                for (let l = this.muros.length -1; l >=0 ; l--){
                    const obstacle = this.muros[l]
                    if((obstacle instanceof Ladrillo) && (llama.didCollide(obstacle))){
                        this.indexMurosDel.add(l);
                        // console.log(obstacle.element)
                        // console.log("Indice del obastacle " + l)
                        // console.log(llama.element)
                        if (obstacle.isBonus){
                            this.puerta = new Puerta(obstacle.left, obstacle.top, this.gameBoard)
                        }
                        setTimeout(()=>{
                            obstacle.element.style.display = "none"
                            obstacle.element.remove()
                        }, 500)
                    }
                }
            this.removeWalls();
                // ENEMIGOS ========================================================================================================
                for (let l = this.enemies.length - 1; l >= 0; l--){
                    const enemigo = this.enemies[l]
                    if(bomba.explotar && llama.didCollide(enemigo)){ // eligiendo bugs enemigo.isAlive && 
                        enemigo.dies()
                        this.indexEnemiesDel.add(l);           
                    }
                }
                this.removeEnemies();
                // PLAYER =======================================================================================================
                if(!this.player.inmune && bomba.explotar && llama.didCollide(this.player)){
                    this.player.dies(this.initialPosition[0], this.initialPosition[1])    
                }
            }
        }
    }
    // Pintar llamas
    checkExplosionDistance() {
        for (let k = this.player.bombasPuestas.length - 1; k >= 0; k--){
                    
            const bomba = this.player.bombasPuestas[k];
            const left = Math.floor(bomba.left/ 50);
            const top = Math.floor(bomba.top / 50);
            // ALCANCE LLAMAS ====================================================================================================
            for (let d = 1; d <= bomba.distancia; d++){
                if(this.map[top][left - d] === '1'){
                    bomba.llamaLeft = d - 1;
                    break;
                }
                bomba.llamaLeft  = d
            }
            for (let d = 1; d <= bomba.distancia; d++){
                if(this.map[top][left + d] === '1'){
                    bomba.llamaRight = d - 1;
                    break;
                }
                bomba.llamaRight  = d
            }
            for (let d = 1; d <= bomba.distancia; d++){
                if(this.map[top - d][left] === '1'){
                    bomba.llamaTop = d - 1;
                    break;
                }
                bomba.llamaTop  = d
            }
            for (let d = 1; d <= bomba.distancia; d++){ 
                if(this.map[top + d][left] === '1'){
                    bomba.llamaBottom = d - 1;
                    break;
                }
                bomba.llamaBottom  = d
            }
        }
    }
    // enemigos vs jugador
    checkCollisionEnemyPlayer() {
        for (let p = this.enemies.length - 1; p >= 0; p--){
            const enemigo = this.enemies[p]
            if (!this.player.inmune && enemigo.didCollide(this.player)){
                this.audioMuerte.play()
                this.player.dies(this.initialPosition[0], this.initialPosition[1])
            }//sacar de este bucle
        }
    }
    // bombs vs jugador. bomb vs enemigo
    checkCollisionBombs() {
        for(let m = this.player.bombasPuestas.length - 1; m >=0; m--){
            const bomba = this.player.bombasPuestas[m];
            
            // ==================   COLISIONES DE JUGADOR Y BOMBA   ====================
            if (bomba.isCollide && this.player.willCollide(bomba.element, -1, 0)) {
                this.player.canMoveLeft = false;
            }
            else{
                this.player.canMoveLeft = true
            }
            if (bomba.isCollide && this.player.willCollide(bomba.element, 1, 0)) {
                this.player.canMoveRight = false;
            }
            else{
                this.player.canMoveRight = true
            }
            if (bomba.isCollide && this.player.willCollide(bomba.element, 0, -1)) {
                this.player.canMoveUp = false;
            }
            else{
                this.player.canMoveUp = true
            }
            if (bomba.isCollide && this.player.willCollide(bomba.element, 0, 1)) {
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

            // ==================   COLISIONES DE ENEMIGOS Y BOMBA   ====================
            for (let n = this.enemies.length - 1; n >= 0; n--){
                const enemigo = this.enemies[n]

                if (bomba.isCollide){
                    if (enemigo.didCollide(bomba)){
                        if (enemigo.topDirection !== 0)
                            enemigo.topDirection *= -1;
                        else{
                            enemigo.leftDirection *= -1;
                        }
                    }
                }
            }
        }
    }
    start(){
        this.audioInicio.pause()
        this.audioGame.play()
   
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
                    // console.log(randomDirection)
                    const enemy = new Enemy(j*50, i*50, this.gameBoard, randomDirection, (randomDirection  -1))
                    this.enemies.push(enemy)
                    this.numEnemies++;
                }
                else if (this.map[i][j] === 'S'){
                    this.puerta = new Puerta(j*50, i*50, this.gameBoard)
                }
                else if (this.map[i][j] === 's'){
                    const ladrillo = new Ladrillo(j*50, i*50, this.gameBoard, true, "portal")
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
        if (this.gameIsOver) {
            this.updateScores()
            this.removeWalls();
            clearInterval(this.gameIntervalId)
            this.gameOverScreen.classList.toggle("show")
            this.audioGame.pause()
            this.audioGameOver.play()
            setTimeout(()=>{
                this.gameEndScreen.style.display = "flex"
                this.gameScreen.style.display = "none"
                this.audioRanking.play()
            }, 4000)
        }
        if (this.nextStage){
            levelIndex++;
            if (levelIndex >= levels.length){
                this.gameIsOver = true;
            }
            else{
                this.updateScores()
                this.removeWalls()
                clearInterval(this.gameIntervalId)
                this.audioGame.pause()
                this.nextLevelScreen.classList.toggle("show2")
                this.audioWin.play()
                setTimeout(()=>{
                    this.nextLevelButtonPanel.classList.toggle("show2") 
                }, 2000)
            }

        }
    };
    bombList(){
        if (this.player.bombasPuestas.length > 0){
            for (let i = this.player.bombasPuestas.length - 1; i >= 0; i--){
                if (this.player.bombasPuestas[i].isRemovable){
                    const deleteBomb = this.player.bombasPuestas[i].element;
                    this.player.bombasPuestas.splice(i, 1);
                    bombsUsed++;
                    setTimeout(()=>{
                        deleteBomb.remove();
                    }, 4000)
                }
            }
        }
    }
    removeWalls(){
        if (this.indexMurosDel.size > 0){
            for (let index of this.indexMurosDel){
                this.muros.splice(index, 1)
                this.wallDestroyed++;
            }
            this.indexMurosDel.clear();
        }
    }
    removeEnemies(){
        if (this.indexEnemiesDel.size > 0){
            for (let index of this.indexEnemiesDel){
                // console.log(index)
                this.enemies.splice(index, 1)
                this.numEnemies--;
                enemiesKill++;
            }
            this.indexEnemiesDel.clear();
            // if (this.enemies.length === 0){
            //     this.removeWalls();
                // this.enemies.push(new Enemy(-50, -50, this.gameBoard,  0, 0))
            // }
        }
    }
    update(){
        this.numVidas.innerText = vidas
        this.speed.innerText = `x${this.player.speedBonus}`
        this.minutos.innerText = this.crono.minutes
        this.segundos.innerText = this.crono.seconds
        this.numBombs.innerText = this.player.numBombs - this.player.bombasPuestas.length
        if (this.puerta){
            // console.log(this.numEnemies);
            if(this.numEnemies === 0){
                this.puerta.isOpen = true
            }
            if (this.puerta.isOpen && !this.puerta.isCollide){
                this.puerta.open() 
            }
        }
        this.bombList();
        this.removeEnemies();
        this.removeWalls();

        this.checkCollisionsWalls();
        this.checkCollisionExplosion();
        this.checkCollisionBombs();
        this.checkCollisionEnemyPlayer();
        this.checkExplosionDistance();

        this.enemies.forEach((enemy)=>{
            enemy.move();
        })
        this.player.move();
        if(this.puerta){
            if (this.player.didCollide(this.puerta) && this.puerta.isCollide){
                this.nextStage = true;
                // hacerte una funcion para que checkee si esta dentro de la puerta
                // seria que estuviese en las mismas coordenadas, pero con un margen de error
            }
        }
        if (this.crono.time <=0 || vidas === 0){ // <= 0 OJO
            this.numVidas.innerText = vidas
            this.gameIsOver = true
        }
    
    };
    updateScores(){
        this.textoBombas.innerText = bombsUsed;
        this.textoMuertos.innerText = enemiesKill;
        this.textoTime.innerText = `${this.crono.minutesT}:${this.crono.secondsT}`;
        this.textoKillScore.innerText = `${enemiesKill} x ${this.pointsEchKill}`;
        this.textoKillScoreSum.innerText = `${enemiesKill * this.pointsEchKill}pts.`;
        // el tiempo y la puntuacion por titulo se añade porque es independiente de cada nivel
        if (this.gameIsOver && !this.nextStage){
            timeScore += 0;
            this.textoTitleScore.innerText = `'Maancooo!'`;
            tittleScore += 0;
        }
        else{
            timeScore += (this.crono.time * 20)
            this.textoTitleScore.innerText = `'piromano'`;
        }
        this.textoTimeScore.innerText = `${this.crono.minutes}:${this.crono.seconds}`;
        this.textoTimeScoreSum.innerText = `${timeScore}pts.`;
        this.textoTitleScoreSum.innerText = `${tittleScore}pts.`;
        totalScore += timeScore + (enemiesKill * this.pointsEchKill) + tittleScore;
        // timeScore + (enemiesKill * this.pointsEchKill) + tittleScore // DEPRECATEDISIMO
        this.textoTotalScore.innerText = `${totalScore}pts.`
        if (jugador != null){
            if (!jugador.puntuaciones.includes(totalScore)){
                jugador.addPoints(totalScore)
            }
            localStorage.setItem(jugador.name, JSON.stringify(jugador.puntuaciones));
            this.crearRanking(totalScore);
        }
    }
    crearRanking(totalScore){
        this.textoRanking.innerHTML = '';
        const topTen = [...jugador.puntuaciones].sort((a, b)=> b - a);
        for (let i = 0; i < 10 && i < jugador.puntuaciones.length; i++){
            const fila = document.createElement("div");
            fila.innerHTML = 
            `<div class="puntuacion">
            <p id="puntitos">${topTen[i]}pts.</p>
            <p>.....</p>
            <p id="nombre-jugador">${jugador.name}</p>
            </div>`
            if (topTen[i] == totalScore){
                fila.style.color = "yellow";
                fila.style.fontSize = ".9rem"
            }
            this.textoRanking.appendChild(fila);
        }
       
    }
}

 