// Solo 06/09/2024
let jugador;
audioInicio = document.querySelector('#audio-inicio');
window.onload = function () {
    audioInicio.volume = .2
    const startButton = document.querySelector("#start-button");
    const restartButton = document.getElementById("restart-button");
    let game;
    
    const form = document.getElementById('enter-name');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombreJugador = document.getElementById('nombre').value
        jugador = new Jugador(nombreJugador);

        if (localStorage.getItem(jugador.name)){
            console.log("existe")
            jugador.puntuaciones = JSON.parse(localStorage.getItem(jugador.name))
            // localStorage.setItem(jugador.name, JSON.stringify([]))  // resetear jugador
            console.log(jugador)
        }
        else{
            localStorage.setItem(jugador.name, JSON.stringify(jugador.puntuaciones));
            console.log("no existe")
        }
    });


    startButton.addEventListener("click", function () {
        const nombreJugador = document.getElementById('nombre').value
        jugador = new Jugador(nombreJugador);
        
        if (localStorage.getItem(jugador.name)){
            console.log("existe")
            jugador.puntuaciones = JSON.parse(localStorage.getItem(jugador.name))
            // localStorage.setItem(jugador.name, JSON.stringify([]))  // resetear jugador
            console.log(jugador)
        }
        else{
            localStorage.setItem(jugador.name, JSON.stringify(jugador.puntuaciones));
            console.log("no existe")
        }
        startGame();
    });

    restartButton.addEventListener("click", function () {
        location.reload();
      });

    function startGame() {

        game = new GameData();
        game.start();
        window.addEventListener("keydown", presionarKey);
        window.addEventListener("keyup", soltarKey);
    }

    function presionarKey(event) {
        const key = event.key;
        const possibleKeystrokes = [
            "ArrowLeft",
            "ArrowUp",
            "ArrowRight",
            "ArrowDown",
            " ",
            "q",
        ];

        if (possibleKeystrokes.includes(key)) {
            event.preventDefault();
            switch (key) {
            case "ArrowLeft":
                game.player.ajustarAlto()
                game.player.leftDirection = -1;
                break;
            case "ArrowUp":
                game.player.ajustarLeft()
                game.player.topDirection = -1;
                break;
            case "ArrowRight":
                game.player.ajustarAlto()
                game.player.leftDirection = 1;
                break;
            case "ArrowDown":
                game.player.ajustarLeft()
                game.player.topDirection = 1;
                break;
            case " ":
                // game.player.ajustarLeft()
                game.player.ponerBomba();
                // console.log(game.player.bombasPuestas)
                // console.log(game.player.bombasPuestas[0].explotar)
                break;
            case "q":
                // game.player.ajustarLeft()
                // let explosion = new Explosion(game.gameBoard, 150, 100);
                // console.log(explosion)
                // console.log(game.player.bombasPuestas[0].isCollide)
                // console.log(game.player.bombasPuestas[0].isRemovable)
                // console.log(game.player.bombasPuestas[0].explotar)
                // console.log(game.enemies)
                // console.log(game.indexMurosDel)
                console.log(game.muros)
                // console.log(game.player)
                break;
            }
        }
        // console.log('-' + event.key + '-')
    }
    function soltarKey(event) {
        const key = event.key;
        const possibleKeystrokes = [
            "ArrowLeft",
            "ArrowUp",
            "ArrowRight",
            "ArrowDown",
        ];

        if (possibleKeystrokes.includes(key)) {
            event.preventDefault();
            switch (key) {
            case "ArrowLeft":
            case "ArrowRight":
                // console.log("Soltando L/R")
                // game.player.ajustarAlto()
                game.player.leftDirection = 0;
                break;
            case "ArrowUp":
            case "ArrowDown":
                // console.log("Soltando T/B")
                // game.player.ajustarLeft()
                game.player.topDirection = 0;
                break;
            }
        }
    }
}  