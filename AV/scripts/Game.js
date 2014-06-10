window.onload = function () {
    var WIDTH = 320;
    var HEIGHT = 200;
    var КПД = 0.8;
    var CIRCLE_RADIUS = HEIGHT / 20;
    var G_ACCELERATION_FOR_FRAME = 9.8 / 60;
    var RUN_ACCELERATION_FOR_FRAME = 4 / 60;
    var svgNS = 'http://www.w3.org/2000/svg';
    var ball = document.createElementNS(svgNS, 'circle');
    ball.setAttribute('cx', WIDTH / 4 * 3);
    ball.setAttribute('cy', HEIGHT / 10);
    ball.setAttribute('r', CIRCLE_RADIUS);
    ball.setAttribute('fill', '#F00');
    ball.speedX = 0;
    ball.speedY = 0;
    var pl1 = document.createElementNS(svgNS, 'circle');
    pl1.setAttribute('cx', WIDTH / 4);
    pl1.setAttribute('cy', HEIGHT / (1 + (1 / 20)));
    pl1.setAttribute('r', CIRCLE_RADIUS);
    pl1.setAttribute('fill', '#0F0');
    pl1.speedX = 0;
    var pl2 = document.createElementNS(svgNS, 'circle');
    pl2.setAttribute('cx', WIDTH / 4 * 3);
    pl2.setAttribute('cy', HEIGHT / (1 + (1 / 20)));
    pl2.setAttribute('r', CIRCLE_RADIUS);
    pl2.setAttribute('fill', '#00F');
    pl2.speedX = 0;
    var net = document.createElementNS(svgNS, 'rect');
    net.setAttribute('x', WIDTH / 2 - 1);
    net.setAttribute('y', HEIGHT / 2);
    net.setAttribute('width', 2);
    net.setAttribute('height', HEIGHT / 2);
    net.setAttribute('fill', '#888');

    var svg = document.getElementById('the-svg')
    svg.setAttribute('width', WIDTH);
    svg.setAttribute('height', HEIGHT);
    svg.appendChild(net);
    svg.appendChild(ball);
    svg.appendChild(pl1);
    svg.appendChild(pl2);

    document.onkeydown = function (e) {

        switch (e.keyIdentifier) {

            case "Left":
                pl2.movingLeft = true;
                if (pl2.speedX <= 0) pl2.speedX = 1;
                break;
            case "Right":
                pl2.movingRight = true;
                if (pl2.speedX <= 0) pl2.speedX = 1;
                break;
            default:

        }
    }

    document.onkeyup = function (e) {

        switch (e.keyIdentifier) {

            case "Left":
                pl2.movingLeft = false;
                pl2.speedX = 0;
                break;
            case "Right":
                pl2.movingRight = false;
                pl2.speedX = 0;
                break;
            default:

        }
    }


    function nextFrame() {

        var ballY = parseInt(ball.getAttribute('cy'));
        var ballX = parseInt(ball.getAttribute('cx'));
        var pl1x = parseInt(pl1.getAttribute('cx'));
        var pl2x = parseInt(pl2.getAttribute('cx'));
        ball.setAttribute('cx', ballX + ball.speedX);
        ball.setAttribute('cy', ballY + ball.speedY);
        ball.speedY = ball.speedY + G_ACCELERATION_FOR_FRAME;

        checkForCollision();

        aI();

        if (pl1.movingLeft) {
           
            if (pl1x >= 0 + CIRCLE_RADIUS - 1 - pl1.speedX) {
                pl1.setAttribute('cx', pl1x - pl1.speedX);
                pl1.speedX = pl1.speedX + pl1.speedX * RUN_ACCELERATION_FOR_FRAME;
            }
        }

        if (pl1.movingRight) {
            if (pl1x <= WIDTH / 2 - 2 - CIRCLE_RADIUS - pl1.speedX ) {
                pl1.setAttribute('cx', pl1x + pl1.speedX);
                pl1.speedX = pl1.speedX + pl1.speedX * RUN_ACCELERATION_FOR_FRAME;
            }
        }

        if (!pl2.movingLeft || !pl2.movingRight) {

            if (pl2.movingLeft) {
                if (pl2x >= WIDTH / 2 + 2 + CIRCLE_RADIUS + pl2.speedX) {
                    pl2.setAttribute('cx', pl2x - pl2.speedX);
                    pl2.speedX = pl2.speedX + pl2.speedX * RUN_ACCELERATION_FOR_FRAME;
                    //console.log(pl2.speedX);
                }
            }

            if (pl2.movingRight) {
                if (pl2x <= WIDTH - CIRCLE_RADIUS - 1 - pl2.speedX) {
                    pl2.setAttribute('cx', pl2x + pl2.speedX);
                    pl2.speedX = pl2.speedX + pl2.speedX * RUN_ACCELERATION_FOR_FRAME;
                }
            }

            requestAnimationFrame(nextFrame);
        }
    }

    function aI() {

        var pl1x = parseInt(pl1.getAttribute('cx'));
        var ballX = parseInt(ball.getAttribute('cx'));

        if (ballX-CIRCLE_RADIUS/2 < pl1x) {
            if (pl1.speedX == 0 || pl1.movingRight) pl1.speedX = 1;
            
            pl1.movingLeft = true;
            pl1.movingRight = false;
        }
        else {
            if (pl1.speedX == 0 || pl1.movingLeft) pl1.speedX = 1;
            pl1.movingRight = true;
            pl1.movingLeft = false;
        }

    }
    function checkForCollision() {
        var ballY = parseInt(ball.getAttribute('cy'));
        var ballX = parseInt(ball.getAttribute('cx'));
        var pl2Y = parseInt(pl2.getAttribute('cy'));
        var pl2X = parseInt(pl2.getAttribute('cx'));
        var pl1Y = parseInt(pl1.getAttribute('cy'));
        var pl1X = parseInt(pl1.getAttribute('cx'));

        // collision with pl1
        if ((ballX - pl1X) * (ballX - pl1X) + (ballY - pl1Y) * (ballY - pl1Y) <= (CIRCLE_RADIUS * 2) * (CIRCLE_RADIUS * 2)) {
            ball.speedY = -ball.speedY * КПД;
            ball.speedX = (ballX - pl1X) * КПД;
            return;
        }

        // collision with pl2
        if ((ballX - pl2X) * (ballX - pl2X) + (ballY - pl2Y) * (ballY - pl2Y) <= (CIRCLE_RADIUS * 2) * (CIRCLE_RADIUS * 2)) {
            ball.speedY = -ball.speedY * КПД;
            ball.speedX = (ballX - pl2X) * КПД;
            return;
        }

        if ((ballX - CIRCLE_RADIUS) <= 1) {
            ball.speedX = Math.abs(ball.speedX * КПД);
        }

        if ((WIDTH - 1) <= (ballX + CIRCLE_RADIUS)) {
            ball.speedX = -ball.speedX * КПД;
        }

        if ((WIDTH / 2) >= (ballX - CIRCLE_RADIUS) && (WIDTH / 2) <= (ballX + CIRCLE_RADIUS) && ballY >= HEIGHT / 2 - CIRCLE_RADIUS) {
            ball.speedX = -ball.speedX * КПД;
        }
    }

    nextFrame();

}
