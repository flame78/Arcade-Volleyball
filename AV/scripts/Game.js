/// <reference path="player.js" />
var WIDTH = 320;
var HEIGHT = 200;
var КПД = 0.8;
var CIRCLE_RADIUS = HEIGHT / 20;
var PLAYERS_Y = HEIGHT / (1 + (1 / 20));
var G_ACCELERATION_FOR_FRAME = 9.8 / 60;
var RUN_ACCELERATION_FOR_FRAME = 9.8 / 60;
var svgNS = 'http://www.w3.org/2000/svg';

window.onload = function () {

    var svg = document.getElementById('the-svg');

    svg.setAttribute('width', WIDTH);
    svg.setAttribute('height', HEIGHT);

    var stage = new Kinetic.Stage({
        container: 'container',
        width: WIDTH,
        height: WIDTH
    });

    /*
        var layer = new Kinetic.Layer();
   
       var imageObj = new Image();
   
       imageObj.onload = function () {
           var beach = new Kinetic.Image({
               x: 0,
               y: 0,
               image: imageObj,
               width: WIDTH,
               height: HEIGHT,
               
           });
   
           beach.setZIndex(10);
   
           // add the shape to the layer
           layer.add(beach);
   
           // add the layer to the stage
           stage.add(layer);
       };
   
       imageObj.src = 'images/beach.jpg';
   
       document.body.style.backgroundImage.link('images/beach.jpg');
       */

    var ball = document.getElementById('ball');
    var l3 = document.getElementById('Layer_3');

    var pl1 = new Player(document.createElementNS(svgNS, 'circle'), CIRCLE_RADIUS, '#0F0', WIDTH / 4, PLAYERS_Y, CIRCLE_RADIUS, WIDTH / 2 - CIRCLE_RADIUS);
    var pl2 = new Player(document.createElementNS(svgNS, 'circle'), CIRCLE_RADIUS, '#00F', WIDTH / 4 * 3, PLAYERS_Y, WIDTH / 2 + CIRCLE_RADIUS, WIDTH - CIRCLE_RADIUS);

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
    svg.appendChild(pl1.element);
    svg.appendChild(pl2.element);

    nextFrame();

    function intializeGame() {
        ball.setAttribute('x', WIDTH / 4 * 3 - CIRCLE_RADIUS);
        ball.setAttribute('y', HEIGHT / 10 - CIRCLE_RADIUS);
        ball.speedX = 0;
        ball.speedY = 0;
    }

    window.onkeydown = function (e) {

        console.dir(e.keyCode);

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
                    pl2.speedY = 4;
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
        l3.setAttribute('transform', 'translate(-90,-90) scale(1.35) rotate(' + (ball.speedX * ball.speedY) * 20 + ' 250 250)');

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

        if (!pl1.jump && ball.speedY < 10 && ballY<HEIGHT - CIRCLE_RADIUS*3 && ballY>HEIGHT/2 && ballX<WIDTH/2) {
            pl1.speedY = 4;
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
