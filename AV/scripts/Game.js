/// <reference path="player.js" />

var FRAME_RATE = 50;
var FRAME_REPEAT_TIME = 1000 / FRAME_RATE; // frame rate in ms
var КПД = 0.8;
var svgNS = 'http://www.w3.org/2000/svg';

var WIDTH,
    HEIGHT,
    G_ACCELERATION_FOR_FRAME,
    RUN_ACCELERATION_FOR_FRAME,
    START_JUMP_SPEED,
    CIRCLE_RADIUS,
    PLAYERS_Y,
     playerOnePoints = 0,
    playerTwoPoints = 0;

window.onload = function () {

    var net = document.createElementNS(svgNS, 'rect');
    var ball = document.getElementById('ball');
    var stage = new Kinetic.Stage({
        container: 'container'
    });
    var svg = document.getElementById('the-svg');
    var playerOneScore = document.getElementById('playerOneScore');
    var playerTwoScore = document.getElementById('playerTwoScore');
    var l3 = document.getElementById('Layer_3');
    var layer = new Kinetic.Layer();
    var imageObj = document.getElementById('sprite');
    var superSonic1;
    var superSonic2;

    updateConstants();
    initializeGame();

    var playerOne = new Player(superSonic1, CIRCLE_RADIUS, '#0F0', WIDTH / 4, PLAYERS_Y, CIRCLE_RADIUS, WIDTH / 2 - CIRCLE_RADIUS, -15);
    var playerTwo = new Player(superSonic2, CIRCLE_RADIUS, '#00F', WIDTH / 4 * 3, PLAYERS_Y, WIDTH / 2 + CIRCLE_RADIUS, WIDTH - CIRCLE_RADIUS, 75);

    setTimeout(nextFrame, FRAME_REPEAT_TIME);

    window.addEventListener('resize', updateGame);

    window.addEventListener('click', function (e) {
        playerOneScore.innerHTML = e.clientX;
        playerTwoScore.innerHTML = e.clientY;
    });

    window.addEventListener('touchstart', function (e) {
        playerOneScore.innerHTML = e.clientX;
        playerTwoScore.innerHTML = e.clientY;
    });

    window.addEventListener('keydown', function (e) {

        switch (e.keyCode) {

            case 37:
                if (!playerTwo.movingLeft) playerTwo.speedX = -1;
                playerTwo.movingLeft = true;
                break;

            case 39:
                if (!playerTwo.movingRight) playerTwo.speedX = 1;
                playerTwo.movingRight = true;
                break;

            case 38:
                if (!playerTwo.jump) {
                    playerTwo.speedY = START_JUMP_SPEED;
                    playerTwo.jump = true;
                }
                break;

            default:

        }
    });

    window.addEventListener('keyup', function (e) {

        switch (e.keyCode) {

            case 37:
                playerTwo.movingLeft = false;
                playerTwo.speedX = 0;
                break;

            case 39:
                playerTwo.movingRight = false;
                playerTwo.speedX = 0;
                break;

            default:

        }
    });

    function nextFrame() {
        var ballY = parseFloat(ball.getAttribute('y')) + CIRCLE_RADIUS;
        var ballX = parseFloat(ball.getAttribute('x')) + CIRCLE_RADIUS;

        ball.setAttribute('x', ballX - CIRCLE_RADIUS + ball.speedX);
        ball.setAttribute('y', ballY - CIRCLE_RADIUS + ball.speedY);

        // rottate ball
        l3.setAttribute('transform', 'translate(-90,-90) scale(1.35) rotate(' + 0.001 * HEIGHT * (ball.speedX * ball.speedY * ball.speedX) + ' 250 250)');

        ball.speedY = ball.speedY + G_ACCELERATION_FOR_FRAME;

        checkForCollision();

        aI();

        playerOne.update();
        playerTwo.update();

        setTimeout(nextFrame, FRAME_REPEAT_TIME);
    }

    function aI() {

        var ballX = parseFloat(ball.getAttribute('x'));
        var ballY = parseFloat(ball.getAttribute('y'));

        if (!playerOne.jump && ball.speedY < 10 && ballY < HEIGHT - CIRCLE_RADIUS * 3 && ballY > HEIGHT / 2 && ballX < WIDTH / 2) {
            playerOne.speedY = START_JUMP_SPEED;
            playerOne.jump = true;
        }

        if (ballX < playerOne.x) {
            if (playerOne.speedX == 0 || playerOne.movingRight) playerOne.speedX = -1;

            playerOne.movingLeft = true;
            playerOne.movingRight = false;
        }
        else if (ballX > playerOne.x) {
            if (playerOne.speedX == 0 || playerOne.movingLeft) playerOne.speedX = 1;
            playerOne.movingRight = true;
            playerOne.movingLeft = false;
        }
    }

    function checkForCollision() {

        var ballY = parseFloat(ball.getAttribute('y')) + CIRCLE_RADIUS;
        var ballX = parseFloat(ball.getAttribute('x')) + CIRCLE_RADIUS;

        // drop
        if ((ballY + CIRCLE_RADIUS) > HEIGHT) {

            var newBallX;

            if (ballX < WIDTH / 2) {
                playerTwoPoints++;
                newBallX = WIDTH / 4 * 3;
                playerTwoScore.innerHTML = playerTwoPoints;
            }
            else {
                playerOnePoints++;
                newBallX = WIDTH / 4;
                playerOneScore.innerHTML = playerOnePoints;
            }
            restartBall(newBallX, 20);
        }

        // with top
        if ((ballY - CIRCLE_RADIUS) <= 1) {
            ball.speedY = Math.abs(ball.speedY * КПД);
        }

        // with left wall
        if ((ballX - CIRCLE_RADIUS) < 0) {
            ball.speedX = -ball.speedX * КПД;
            ball.setAttribute('x', 0);
        }

        // with right wall
        if ((WIDTH - CIRCLE_RADIUS) < (ballX)) {
            ball.speedX = -ball.speedX * КПД;
            ball.setAttribute('x', (WIDTH - CIRCLE_RADIUS * 2));
        }

        // net from right
        if ((WIDTH / 2) >= (ballX - CIRCLE_RADIUS) && ballY >= HEIGHT / 2 && ballX > WIDTH / 2) {
            ball.speedX = -ball.speedX * КПД;
            ball.setAttribute('x', WIDTH / 2);
            ballX = WIDTH / 2 + CIRCLE_RADIUS;
        }

        // net from left
        if ((WIDTH / 2) <= (ballX + CIRCLE_RADIUS) && ballY >= HEIGHT / 2 && ballX < WIDTH / 2 + CIRCLE_RADIUS) {
            ball.speedX = -ball.speedX * КПД;
            ball.setAttribute('x', WIDTH / 2 - CIRCLE_RADIUS * 2);
            ballX = WIDTH / 2 - CIRCLE_RADIUS;
        }
    }

    function sonicSprite() {
        return {
            x: 250,
            y: 450,
            image: imageObj,
            animation: 'idle',
            animations: {
                idle: [
                  // x, y, width, height
                  7, 7, 90, 120,
                ],
                move: [
                  // x, y, width, height
                  100, 7, 90, 120,
                  200, 7, 90, 120,
                  300, 7, 100, 120,
                  405, 7, 105, 120,
                  510, 7, 90, 120,
                  610, 7, 90, 120,
                  715, 7, 90, 120,
                  815, 7, 105, 120,
                  920, 7, 100, 120,
                  7, 110, 110, 120,
                  100, 7, 110, 120,
                  200, 7, 110, 120,
                  300, 7, 110, 120
                ],
                rotate: [
                  7, 240, 110, 120,
                  100, 240, 110, 120,
                  200, 240, 110, 120
                ]
            },
            frameRate: FRAME_RATE / 2,
            frameIndex: 0
        };
    }

    function updateConstants() {
        WIDTH = window.innerWidth;
        HEIGHT = window.innerHeight;
        CIRCLE_RADIUS = HEIGHT / 20;
        G_ACCELERATION_FOR_FRAME = 0.0004 * HEIGHT;
        RUN_ACCELERATION_FOR_FRAME = 0.00075 * HEIGHT;
        START_JUMP_SPEED = HEIGHT / 50;
        PLAYERS_Y = HEIGHT / (1 + (1 / 20));
        net.setAttribute('x', WIDTH / 2 - 1);
        net.setAttribute('y', HEIGHT / 2);
        net.setAttribute('width', 5);
        net.setAttribute('height', HEIGHT / 2);
        net.setAttribute('fill', '#888');
        ball.setAttribute('width', CIRCLE_RADIUS * 2);
        ball.setAttribute('height', CIRCLE_RADIUS * 2);
        document.body.style.backgroundSize = WIDTH + 'px ' + HEIGHT + 'px';
        svg.setAttribute('width', WIDTH);
        svg.setAttribute('height', HEIGHT);
        stage.setWidth(WIDTH);
        stage.setHeight(HEIGHT);

        playerOneScore.setAttribute('x', WIDTH / 4);
        playerTwoScore.setAttribute('x', WIDTH / 4 * 3);
        playerOneScore.setAttribute('y', CIRCLE_RADIUS * 2);
        playerTwoScore.setAttribute('y', CIRCLE_RADIUS * 2);
        playerOneScore.setAttribute('font-size', CIRCLE_RADIUS * 2)
        playerTwoScore.setAttribute('font-size', CIRCLE_RADIUS * 2)
    }

    function updateGame() {

        updateConstants();

        playerOne.updateScale(CIRCLE_RADIUS, PLAYERS_Y, CIRCLE_RADIUS, WIDTH / 2 - CIRCLE_RADIUS);
        playerTwo.updateScale(CIRCLE_RADIUS, PLAYERS_Y, WIDTH / 2 + CIRCLE_RADIUS, WIDTH - CIRCLE_RADIUS);
    }

    function initializeGame() {

    

        superSonic1 = new Kinetic.Sprite(sonicSprite());
        superSonic2 = new Kinetic.Sprite(sonicSprite());

        layer.add(superSonic1);
        layer.add(superSonic2);

        stage.add(layer);

        superSonic1.start();
        superSonic2.start();

        restartBall(WIDTH / 4 * 3 - CIRCLE_RADIUS, HEIGHT / 10 - CIRCLE_RADIUS);

        svg.appendChild(net);
        svg.appendChild(ball);
        svg.appendChild(playerOneScore);
        svg.appendChild(playerTwoScore);
    }

    function restartBall(ballStartX, ballStartY) {
        ball.setAttribute('x', ballStartX);
        ball.setAttribute('y', ballStartY);
        ball.speedX = 0;
        ball.speedY = 0;
    }
}
