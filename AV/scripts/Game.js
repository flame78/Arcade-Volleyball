window.onload = function () {
    var WIDTH = 320;
    var HEIGHT = 200;
    var PLAYER_RADIUS =  HEIGHT / 20;
    var G_ACCELERATION_FOR_FRAME = 9.8 / 60;
    var RUN_ACCELERATION_FOR_FRAME = 4 / 60;
    var svgNS = 'http://www.w3.org/2000/svg';
    var ball = document.createElementNS(svgNS, 'circle');
    ball.setAttribute('cx', WIDTH/4 * 3);
    ball.setAttribute('cy', HEIGHT/10);
    ball.setAttribute('r',PLAYER_RADIUS);
    ball.setAttribute('fill', '#F00');
    ball.speedX = 0;
    ball.speedY = 0;
    var pl1 = document.createElementNS(svgNS, 'circle');
    pl1.setAttribute('cx', WIDTH / 4);
    pl1.setAttribute('cy', HEIGHT / (1+(1/20)));
    pl1.setAttribute('r',PLAYER_RADIUS);
    pl1.setAttribute('fill', '#0F0');
    pl1.speedX = 0;
    var pl2 = document.createElementNS(svgNS, 'circle');
    pl2.setAttribute('cx', WIDTH / 4 * 3);
    pl2.setAttribute('cy', HEIGHT / (1 + (1 / 20)));
    pl2.setAttribute('r', PLAYER_RADIUS);
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

            case  "Left":
                pl2.movingLeft = true;
                if (pl2.speedX <= 0) pl2.speedX = 1;
                break;
            case  "Right":
                pl2.movingRight = true;
                if (pl2.speedX <= 0) pl2.speedX=1;
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
        ball.setAttribute('cy', ballY + ball.speedY);
        ball.speedY = ball.speedY + G_ACCELERATION_FOR_FRAME;
        console.log(ball.speedY);

        if (!pl2.movingLeft || !pl2.movingRight) {

            if (pl2.movingLeft) {
                var pl2x = parseInt(pl2.getAttribute('cx'));
                if (pl2x >= WIDTH / 2 + 2 + PLAYER_RADIUS + pl2.speedX) {
                    pl2.setAttribute('cx', pl2x - pl2.speedX);
                    pl2.speedX = pl2.speedX + pl2.speedX * RUN_ACCELERATION_FOR_FRAME;
                    //console.log(pl2.speedX);
                }
                else {
                    pl2.movingLeft == false;
                }
            }

            if (pl2.movingRight) {
                var pl2x = parseInt(pl2.getAttribute('cx'));
                if (pl2x <= WIDTH - PLAYER_RADIUS - 1 - pl2.speedX) {
                    pl2.setAttribute('cx', pl2x + pl2.speedX);
                    pl2.speedX = pl2.speedX + pl2.speedX * RUN_ACCELERATION_FOR_FRAME;
                }
                else {
                    pl2.movingRight == false;
                }
            }
        }


        requestAnimationFrame(nextFrame);
    }

    nextFrame();

}