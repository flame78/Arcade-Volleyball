/// <reference path="player.js" />

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight - 5;
var G_ACCELERATION_FOR_FRAME = 0.0006 * HEIGHT;
var RUN_ACCELERATION_FOR_FRAME = 0.00075 * HEIGHT;
var START_JUMP_SPEED = HEIGHT / 50;
var КПД = 0.8;
var CIRCLE_RADIUS = HEIGHT / 20;
var PLAYERS_Y = HEIGHT / (1 + (1 / 20));
console.log(START_JUMP_SPEED);
console.log(HEIGHT);
console.log(RUN_ACCELERATION_FOR_FRAME);
var svgNS = 'http://www.w3.org/2000/svg';
var svg = document.getElementById('the-svg');
var superSonic1;
var superSonic2;

window.onload = function () {

    svg.setAttribute('width', WIDTH);
    svg.setAttribute('height', HEIGHT);

    var stage = new Kinetic.Stage({
        container: 'container',
        width: WIDTH,
        height: HEIGHT
    });

    var layer = new Kinetic.Layer();
    var imageObj = document.getElementById('sprite');

    superSonic1 = new Kinetic.Sprite({
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
        frameRate: 30,
        frameIndex: 0
    });

    superSonic2 = new Kinetic.Sprite({
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
        frameRate: 30,
        frameIndex: 0
    });

    superSonic2.scaleX(-1);

    layer.add(superSonic1);
    layer.add(superSonic2);

    stage.add(layer);

    superSonic1.start();
    superSonic2.start();

    document.body.style.background = 'url("images/beach.jpg") no-repeat';
    document.body.style.backgroundSize = WIDTH + 'px ' + HEIGHT + 'px';

    var ball = document.getElementById('ball');
    var l3 = document.getElementById('Layer_3');

    var pl1 = new Player(superSonic1, CIRCLE_RADIUS, '#0F0', WIDTH / 4, PLAYERS_Y, CIRCLE_RADIUS, WIDTH / 2 - CIRCLE_RADIUS,-15);
    var pl2 = new Player(superSonic2, CIRCLE_RADIUS, '#00F', WIDTH / 4 * 3, PLAYERS_Y, WIDTH / 2 + CIRCLE_RADIUS, WIDTH - CIRCLE_RADIUS, 75);

    var net = document.createElementNS(svgNS, 'rect');

    net.setAttribute('x', WIDTH / 2 - 1);
    net.setAttribute('y', HEIGHT / 2);
    net.setAttribute('width', 2);
    net.setAttribute('height', HEIGHT / 2);
    net.setAttribute('fill', '#888');
    ball.setAttribute('width', CIRCLE_RADIUS * 2);
    ball.setAttribute('height', CIRCLE_RADIUS * 2);

    intializeGame();

    svg.appendChild(net);
    svg.appendChild(ball);
    // svg.appendChild(pl1.element);
    // svg.appendChild(pl2.element);

    nextFrame();

    function gameResult(playerOneResult, playerTwoResult) {

        playerOneResult = new Kinetic.Stage({
            container: 'container',
            x: WIDTH * 2 / 4,
            y: HEIGHT * 1 / 3

        });

        playerTwoResult = new Kinetic.Stage({
            container: 'container',
            x: WIDTH * 3 / 4,
            y: HEIGHT * 1 / 3

        });


        var layer1 = new Kinetic.Layer();

        layer1.add(playerOneResult);
        layer1.add(playerTwoResult);

        stage.add(layer1);
    }
    


    function intializeGame() {
        ball.setAttribute('x', WIDTH / 4 * 3 - CIRCLE_RADIUS);
        ball.setAttribute('y', HEIGHT / 10 - CIRCLE_RADIUS);
        ball.speedX = 0;
        ball.speedY = 0;
    }

    window.onkeydown = function (e) {

        switch (e.keyCode) {

            case 37:
                //      if (!pl2.jump) {
                if (!pl2.movingLeft) pl2.speedX = -1;
                pl2.movingLeft = true;
                //      }
                break;
            case 39:
                //    if (!pl2.jump) {
                if (!pl2.movingRight) pl2.speedX = 1;
                pl2.movingRight = true;
                //       }
                break;
            case 38:
                if (!pl2.jump) {
                    pl2.speedY = START_JUMP_SPEED;
                    pl2.jump = true;
                }
                break;
            default:

        }
    }

    window.onkeyup = function (e) {

        switch (e.keyCode) {

            case 37:

                pl2.movingLeft = false;
                pl2.speedX = 0;
                break;

            case 39:

                pl2.movingRight = false;
                pl2.speedX = 0;
                break;

            default:

        }
    }

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

        gameResult();

        pl1.update();
        pl2.update();

        requestAnimationFrame(nextFrame);
    }

    function aI() {

        var pl1x = pl1.x;
        var ballX = parseFloat(ball.getAttribute('x'));
        var ballY = parseFloat(ball.getAttribute('y'));

        if (!pl1.jump && ball.speedY < 10 && ballY < HEIGHT - CIRCLE_RADIUS * 3 && ballY > HEIGHT / 2 && ballX < WIDTH / 2) {
            pl1.speedY = START_JUMP_SPEED;
            pl1.jump = true;
        }

        if (ballX < pl1x) {
            if (pl1.speedX == 0 || pl1.movingRight) pl1.speedX = -1;

            pl1.movingLeft = true;
            pl1.movingRight = false;
        }
        else if (ballX > pl1x) {
            if (pl1.speedX == 0 || pl1.movingLeft) pl1.speedX = 1;
            pl1.movingRight = true;
            pl1.movingLeft = false;
        }
    }

    function checkForCollision() {
        var ballY = parseFloat(ball.getAttribute('y')) + CIRCLE_RADIUS;
        var ballX = parseFloat(ball.getAttribute('x')) + CIRCLE_RADIUS;

        // drop
        if ((ballY + CIRCLE_RADIUS) > HEIGHT) {
            //  alert('lose');
            // intializeGame();
            ball.speedY = -ball.speedY;
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
}
