/// <reference path="player.js" />

var WIDTH = window.innerWidth-10;
var HEIGHT = window.innerHeight - 10;
var G_ACCELERATION_FOR_FRAME = 0.0006 * HEIGHT;
var RUN_ACCELERATION_FOR_FRAME = 0.00075 * HEIGHT;
var START_JUMP_SPEED = HEIGHT / 50;
var КПД = 0.8;
var CIRCLE_RADIUS = HEIGHT / 20;
var PLAYERS_Y = HEIGHT / (1 + (1 / 20));
var svgNS = 'http://www.w3.org/2000/svg';
var svg = document.getElementById('the-svg');
var superSonic1;
var superSonic2;
var player1Score = 0;
var player2Score = 0;
var pl1s = document.createElementNS(svgNS, 'text');
pl1s.setAttribute('x', WIDTH / 4);
pl1s.setAttribute('y', CIRCLE_RADIUS);
pl1s.setAttribute('fill', 'black');

var pl2s = document.createElementNS(svgNS, 'text');
pl2s.setAttribute('x', WIDTH / 4*3);
pl2s.setAttribute('y', CIRCLE_RADIUS);
pl2s.setAttribute('fill', 'black');



window.onload = function () {

    window.onresize = function () {


        WIDTH = window.innerWidth-10;
        HEIGHT = window.innerHeight - 10;
        CIRCLE_RADIUS = HEIGHT / 20;
         G_ACCELERATION_FOR_FRAME = 0.0006 * HEIGHT;
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

        pl1.setY(PLAYERS_Y);
        pl1.minLeft = CIRCLE_RADIUS;
        pl1.maxRight = WIDTH / 2 - CIRCLE_RADIUS;

        pl2.setY(PLAYERS_Y);
        pl2.minLeft = WIDTH / 2 + CIRCLE_RADIUS
        pl2.maxRight = WIDTH - CIRCLE_RADIUS;
    }

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

    var layer1 = new Kinetic.Layer();

    stage.add(layer1);

    stage.add(layer);

    superSonic1.start();
    superSonic2.start();

    document.body.style.background = 'url("images/beach.jpg") no-repeat';
    document.body.style.backgroundSize = WIDTH + 'px ' + HEIGHT + 'px';

    var ball = document.getElementById('ball');
    var l3 = document.getElementById('Layer_3');

    var pl1 = new Player(superSonic1, CIRCLE_RADIUS, '#0F0', WIDTH / 4, PLAYERS_Y, CIRCLE_RADIUS, WIDTH / 2 - CIRCLE_RADIUS, -15);
    var pl2 = new Player(superSonic2, CIRCLE_RADIUS, '#00F', WIDTH / 4 * 3, PLAYERS_Y, WIDTH / 2 + CIRCLE_RADIUS, WIDTH - CIRCLE_RADIUS, 75);

    var net = document.createElementNS(svgNS, 'rect');

    net.setAttribute('x', WIDTH / 2 - 1);
    net.setAttribute('y', HEIGHT / 2);
    net.setAttribute('width', 5);
    net.setAttribute('height', HEIGHT / 2);
    net.setAttribute('fill', '#888');
    ball.setAttribute('width', CIRCLE_RADIUS * 2);
    ball.setAttribute('height', CIRCLE_RADIUS * 2);

    intializeGame(WIDTH / 4 * 3 - CIRCLE_RADIUS, HEIGHT / 10 - CIRCLE_RADIUS);

    svg.appendChild(net);
    svg.appendChild(ball);
    svg.appendChild(pl1s);
    svg.appendChild(pl2s);

    nextFrame();

    function gameResult(playerOneResult, playerTwoResult) {

        pl1s.setAttribute('val', playerOneResult);
        pl2s.setAttribute('val', playerTwoResult);
  /*      pl1r = new Kinetic.Text({
            x: WIDTH / 4,
            y: 25,
            text: playerOneResult,
            fontSize: HEIGHT / 20,
            fontFamily: 'Calibri',
            fill: 'red'
        });

        pl2r = new Kinetic.Text({
            x: WIDTH / 4 * 3,
            y: 25,
            text: playerTwoResult,
            fontSize: HEIGHT / 20,
            fontFamily: 'Calibri',
            fill: 'green'
        });

        layer1.add(pl1r);
        layer1.add(pl1r);
        */
    }



    function intializeGame(ballStartX, ballStartY) {
        ball.setAttribute('x', ballStartX);
        ball.setAttribute('y', ballStartY);
        ball.speedX = 0;
        ball.speedY = 0;
        gameResult(player1Score, player2Score);

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

            var x;

            if (ballX < WIDTH / 2) {
                player1Score++;
                x = WIDTH / 4 * 3;
            }
            else {
                player2Score++;
                x = WIDTH / 4 ;
            }
            gameResult(player1Score, player2Score);
            intializeGame(x, 20);
            //ball.speedY = -ball.speedY;
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
