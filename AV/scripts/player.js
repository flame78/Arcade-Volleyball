/// <reference path="Game.js" />
function Player(element, radius, color, x, y, minLeft, maxRight) {
    var svgNS = 'http://www.w3.org/2000/svg';
    this.element = element;
    this.element.setAttribute('r', radius);
    this.element.setAttribute('fill', color);
    this.element.setAttribute('cx', x);
    this.element.setAttribute('cy', y);
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
    this.update = function () {
        if (this.movingLeft) {

            if (this.x - this.speedX >= this.minLeft) {

                this.setX(this.x + this.speedX);

                //         if (!pl1.jump) {

                this.speedX = this.speedX - RUN_ACCELERATION_FOR_FRAME;
                //          }
            }
            else {
                this.movingLeft = false;
                this.speedX = 0;
                this.setX(this.minLeft - 1);

            }
        }

        if (this.movingRight) {
            if (this.x + this.speedX <= this.maxRight) {
                this.setX(this.x + this.speedX);
                //         if (!pl1.jump) {
                this.speedX = this.speedX + RUN_ACCELERATION_FOR_FRAME;
                //         }
            }
            else {
                this.movingRight = false;
                this.speedX = 0;
                this.setX(this.maxRight + 1);

            }
        }

        if (this.jump) {

            this.setY(this.y - this.speedY);

            this.speedY = this.speedY - RUN_ACCELERATION_FOR_FRAME;

            if (this.y >= PLAYERS_Y + 1) {
                /*       if (pl2.jumpStopMove) {
                           pl2.movingLeft = false;
                           pl2.movingRight = false;
                           pl2.speedX = 0;
                       }*/

                this.jumpStopMove = false;
                this.jump = false;
                this.speedY = 0;
                this.setY(PLAYERS_Y);
            }

        }


        // collision with ball
        var ballY = parseFloat(ball.getAttribute('y')) + CIRCLE_RADIUS;
        var ballX = parseFloat(ball.getAttribute('x')) + CIRCLE_RADIUS;
        if ((ballX - this.x) * (ballX - this.x) + (ballY - this.y) * (ballY - this.y) <= (CIRCLE_RADIUS * 2) * (CIRCLE_RADIUS * 2)) {
            ball.speedY = -ball.speedY * КПД - this.speedY;
            ball.speedX = (ballX - this.x) / 4 * КПД;
            ball.setAttribute('y', this.y - CIRCLE_RADIUS * 3 - 2);
        }

    }

    return this;
}