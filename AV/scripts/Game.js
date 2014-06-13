"use strict"

window.onload = function () {

    function Player(element, radius, color, x, y, minLeft, maxRight) {
        var svgNS = 'http://www.w3.org/2000/svg';
        this.element = element;
        this.element.setAttribute('r', CIRCLE_RADIUS);
        this.element.setAttribute('fill', color);
        this.element.setAttribute('cx', x);
        this.element.setAttribute('cy', y);
        this.element.setAttribute('r', CIRCLE_RADIUS);
        this.x = x;
        this.setX = function (x) {
            this.x = x;
            this.element.setAttribute('cx', x);
        }
        this.getX = this.x;
        this.y = y; 
        this.setY = function (y) {
            this.y = y;
            this.element.setAttribute('cy', y);
        }
        this.getY = this.y;
        this.speedX = 0;
        this.speedY = 0;
        this.movingLeft = false;
        this.movingRight = false;
        this.jump = false;
        this.jumpStopMove = false;
        this.minLeft = minLeft;
        this.maxRight = maxRight;

        return this;
    }

    var WIDTH = 320;
    var HEIGHT = 200;
    var КПД = 0.8;
    var CIRCLE_RADIUS = HEIGHT / 20;
    var PLAYERS_Y = HEIGHT / (1 + (1 / 20));
    var G_ACCELERATION_FOR_FRAME = 9.8 / 60;
    var RUN_ACCELERATION_FOR_FRAME = 9.8 / 60;
    var svgNS = 'http://www.w3.org/2000/svg';

    var svg = document.getElementById('the-svg');

    svg.setAttribute('width', WIDTH);
    svg.setAttribute('height', HEIGHT);

    var stage = new Kinetic.Stage({
        container: 'container',
        width: WIDTH,
        height: WIDTH
    });

    var layer = new Kinetic.Layer();

    var imageObj = new Image();

    imageObj.onload = function () {
        var beach = new Kinetic.Image({
            x: 0,
            y: 0,
            image: imageObj,
            width: WIDTH,
            height: HEIGHT
        });

        // add the shape to the layer
        layer.add(beach);

        // add the layer to the stage
        stage.add(layer);
    };

    imageObj.src = 'images/beach.jpg';

    document.body.style.backgroundImage.link('images/beach.jpg');

    var ball = document.getElementById('ball');
    var l3 = document.getElementById('Layer_3');

    var pl1 = new Player(document.createElementNS(svgNS, 'circle'), CIRCLE_RADIUS, '#0F0', WIDTH / 4, PLAYERS_Y);

    var pl2 = document.createElementNS(svgNS, 'circle');
    var net = document.createElementNS(svgNS, 'rect');
   
    net.setAttribute('x', WIDTH / 2 - 1);
    net.setAttribute('y', HEIGHT / 2);
    net.setAttribute('width', 2);
    net.setAttribute('height', HEIGHT / 2);
    net.setAttribute('fill', '#888');
    ball.setAttribute('width', CIRCLE_RADIUS * 2);
    ball.setAttribute('height', CIRCLE_RADIUS * 2);
    pl2.setAttribute('r', CIRCLE_RADIUS);
    pl2.setAttribute('fill', '#00F');

    intializeGame();

    svg.appendChild(net);
    svg.appendChild(ball);
    svg.appendChild(pl1.element);
    svg.appendChild(pl2);

    console.dir(pl1);

    nextFrame();

    function intializeGame() {
        ball.setAttribute('x', WIDTH / 4 * 3 - CIRCLE_RADIUS);
        ball.setAttribute('y', HEIGHT / 10 - CIRCLE_RADIUS);
        ball.speedX = 0;
        ball.speedY = 0;
        pl2.setAttribute('cx', WIDTH / 4 * 3);
        pl2.setAttribute('cy', PLAYERS_Y);
        pl2.speedX = 0;
        pl2.speedY = 0;
        pl2.movingLeft = false;
        pl2.movingRight = false;
        pl2.jump = false;
        pl2.jumpStopMove = false;
    }



    window.onkeydown = function (e) {

        console.dir(e.keyIdentifier);

        switch (e.keyIdentifier) {

            case "Left":
          //      if (!pl2.jump) {
                    if (!pl2.movingLeft) pl2.speedX = -1;
                    pl2.movingLeft = true;
          //      }
                break;
            case "Right":
            //    if (!pl2.jump) {
                    if (!pl2.movingRight) pl2.speedX = 1;
                    pl2.movingRight = true;
         //       }
                break;
            case "Up":
                if (!pl2.jump) {
                    pl2.speedY = 4;
                    pl2.jump = true;
                }
                break;
            default:

        }
    }

    window.onkeyup = function (e) {

        switch (e.keyIdentifier) {

            case "Left":

           /*     if (pl2.jump) {
                    pl2.jumpStopMove = true;
                }
                else {*/
                    pl2.movingLeft = false;
                    pl2.speedX = 0;
           //     }
                break;

            case "Right":
       /*         if (pl2.jump) {
                    pl2.jumpStopMove = true;
                }
                else {*/
                    pl2.movingRight = false;
                    pl2.speedX = 0;
            //    }
                break;
            default:

        }
    }

    function nextFrame() {
        var ballY = parseFloat(ball.getAttribute('y')) + CIRCLE_RADIUS;
        var ballX = parseFloat(ball.getAttribute('x')) + CIRCLE_RADIUS;
        var pl1x = pl1.getX;
        var pl2x = parseFloat(pl2.getAttribute('cx'));
        var pl2y = parseFloat(pl2.getAttribute('cy'));

        ball.setAttribute('x', ballX - CIRCLE_RADIUS + ball.speedX);
        ball.setAttribute('y', ballY - CIRCLE_RADIUS + ball.speedY);

        l3.setAttribute('transform', 'translate(-90,-90) scale(1.35) rotate(' + (ball.speedX * ball.speedY) * 20 + ' 250 250)');
        ball.speedY = ball.speedY + G_ACCELERATION_FOR_FRAME;

        checkForCollision();

        aI();

        if (pl1.movingLeft) {

            if (pl1x - CIRCLE_RADIUS * 2 >= 1 + pl2.speedX) {

                pl1.setX(pl1x + pl1.speedX);

       //         if (!pl1.jump) {

                    pl1.speedX = pl1.speedX - RUN_ACCELERATION_FOR_FRAME;
      //          }
            }
            else {
                pl1.movingLeft = false;
                pl1.speedX = 0;
                pl1.setX( CIRCLE_RADIUS );

            }
        }

        if (pl1.movingRight) {
            if (pl1x <= WIDTH/2 - CIRCLE_RADIUS * 2 - 1 - pl1.speedX) {
                pl1.setX( pl1x + pl1.speedX);
       //         if (!pl1.jump) {
                    pl1.speedX = pl1.speedX + RUN_ACCELERATION_FOR_FRAME;
       //         }
            }
            else {
                pl1.movingRight = false;
                pl1.speedX = 0;
                pl1.setX( WIDTH/2 - CIRCLE_RADIUS-1);

            }
        }
    /*    if (pl1.movingLeft) {

            if (pl1x >= 0 + CIRCLE_RADIUS + 1 + pl1.speedX) {
                pl1.setAttribute('cx', pl1x - pl1.speedX);
                //  pl1.setAttribute('cx', ballX+CIRCLE_RADIUS);
                pl1.speedX = pl1.speedX + RUN_ACCELERATION_FOR_FRAME;
            }
        }

       if (pl1.movingRight) {
            if (pl1x <= WIDTH / 2 - 2 - CIRCLE_RADIUS - pl1.speedX) {
                pl1.setAttribute('cx', pl1x + pl1.speedX);
                //  pl1.setAttribute('cx', ballX + CIRCLE_RADIUS);
                pl1.speedX = pl1.speedX + RUN_ACCELERATION_FOR_FRAME;
            }
        } */

        if (pl2.jump) {

            pl2.setAttribute('cy', pl2y - pl2.speedY);

            console.log(pl2y);

            pl2.speedY = pl2.speedY - RUN_ACCELERATION_FOR_FRAME;

            if (pl2y >= PLAYERS_Y + 1) {
         /*       if (pl2.jumpStopMove) {
                    pl2.movingLeft = false;
                    pl2.movingRight = false;
                    pl2.speedX = 0;
                }*/
                pl2.jumpStopMove = false;
                pl2.jump = false;
                pl2.speedY = 0;
                pl2.setAttribute('cy', PLAYERS_Y);
            }

        }

        if (pl2.movingLeft) {

            if (pl2x - CIRCLE_RADIUS*2 >= WIDTH / 2 + 3 +pl2.speedX) {

                pl2.setAttribute('cx', pl2x + pl2.speedX);

       //         if (!pl2.jump) {

                    pl2.speedX = pl2.speedX - RUN_ACCELERATION_FOR_FRAME;
       //         }
            }
            else {
                pl2.movingLeft = false;
                pl2.speedX = 0;
                pl2.setAttribute('cx', WIDTH / 2 + CIRCLE_RADIUS + 1 );

            }
        }

        if (pl2.movingRight) {
            if (pl2x <= WIDTH - CIRCLE_RADIUS*2 - 1 - pl2.speedX) {
                pl2.setAttribute('cx', pl2x + pl2.speedX);
      //          if (!pl2.jump) {
                    pl2.speedX = pl2.speedX + RUN_ACCELERATION_FOR_FRAME;
      //          }
            }
            else {
                pl2.movingRight = false;
                pl2.speedX = 0;
                pl2.setAttribute('cx', WIDTH - CIRCLE_RADIUS );

            }
        }
        requestAnimationFrame(nextFrame);
    }

    function aI() {

        var pl1x = pl1.getX;
        console.log(pl1x);
        var ballX = parseFloat(ball.getAttribute('x')) - CIRCLE_RADIUS;

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
        var pl2Y = parseFloat(pl2.getAttribute('cy'));
        var pl2X = parseFloat(pl2.getAttribute('cx'));
        var pl1Y = pl1.getY;
        var pl1X = pl1.getX;

        // collision with pl1
        if ((ballX - pl1X) * (ballX - pl1X) + (ballY - pl1Y) * (ballY - pl1Y) <= (CIRCLE_RADIUS * 2) * (CIRCLE_RADIUS * 2)) {
            ball.speedY = -ball.speedY * КПД + pl1.speedY;
            ball.speedX = (ballX - pl1X)/4 * КПД;
            ball.setAttribute('y', pl1Y - CIRCLE_RADIUS * 3);
            return;
        }

        // collision with pl2
        if ((ballX - pl2X) * (ballX - pl2X) + (ballY - pl2Y) * (ballY - pl2Y) <= (CIRCLE_RADIUS * 2) * (CIRCLE_RADIUS * 2)) {
            ball.speedY = -ball.speedY * КПД - pl2.speedY;
            ball.speedX = (ballX - pl2X)/4 * КПД;
            ball.setAttribute('y', pl2Y - CIRCLE_RADIUS * 3);
        }

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
        if ((WIDTH / 2) >= (ballX - CIRCLE_RADIUS) && ballY >= HEIGHT / 2  && ballX>WIDTH/2){
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

        //(WIDTH / 2) >= (ballX - CIRCLE_RADIUS) && 
    }


}
