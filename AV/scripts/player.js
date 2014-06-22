/// <reference path="Game.js" />

function Player(element, radius, color, x, y, minLeft, maxRight, xCompensation) {

    var privateMembers = this;

    privateMembers.x = x;
    privateMembers.y = y;
    privateMembers.speedX = 0;
    privateMembers.speedY = 0;

    privateMembers.scale;
    privateMembers.xCompensation = xCompensation | 0;
    privateMembers.element = element;
    privateMembers.radius = radius;

    this.getSpeedY = function () { return privateMembers.speedY; }
    this.getSpeedX = function () { return privateMembers.speedX; }
    this.getRadius = function () { return privateMembers.radius; }
    this.movingLeft = false;
    this.movingRight = false;
    this.jump = false;
    this.getX = function () { return privateMembers.x; }
    this.getY = function () { return privateMembers.y; }


    this.setX = function (x) {
        privateMembers.x = x;
        privateMembers.element.setX(privateMembers.x - privateMembers.radius + privateMembers.xCompensation * privateMembers.scale);
    };

    this.setY = function (y) {
        privateMembers.y = y;
        privateMembers.element.setY(privateMembers.y - privateMembers.radius * 2);
    };

    this.updateScale = function (radius, bottomY, minLeft, maxRight) {

        privateMembers.bottomY = bottomY;
        privateMembers.minLeft = minLeft;
        privateMembers.maxRight = maxRight;
        privateMembers.scale = radius / 35;

        this.setX((maxRight - minLeft) / 2 + minLeft);
        this.setY(bottomY);

        if (privateMembers.xCompensation < 0) {
            privateMembers.element.scaleX(privateMembers.scale);
        }
        else {
            privateMembers.element.scaleX(-privateMembers.scale);
        }

        privateMembers.element.scaleY(privateMembers.scale)
        privateMembers.radius = radius;

        this.setY(bottomY);

    };

    this.update = function () {

        this.setY(privateMembers.y);
        this.setX(privateMembers.x);
        if (this.movingLeft) {

            if (privateMembers.x - privateMembers.speedX >= privateMembers.minLeft) {

                privateMembers.element.attrs.animation = "move";

                this.setX(privateMembers.x + privateMembers.speedX);

                privateMembers.speedX = privateMembers.speedX - RUN_ACCELERATION_FOR_FRAME;
            }
            else {
                this.movingLeft = false;
                privateMembers.speedX = 0;
                this.setX(privateMembers.minLeft - 1);
                privateMembers.element.attrs.animation = "idle";
            }
        }
        else if (this.movingRight) {

            if (privateMembers.x + privateMembers.speedX <= privateMembers.maxRight) {
                privateMembers.element.attrs.animation = "move";
                this.setX(privateMembers.x + privateMembers.speedX);
                privateMembers.speedX = privateMembers.speedX + RUN_ACCELERATION_FOR_FRAME;
            }
            else {
                this.movingRight = false;
                privateMembers.speedX = 0;
                this.setX(privateMembers.maxRight + 1);
                privateMembers.element.attrs.animation = "idle";
            }
        }
        else {
            privateMembers.element.attrs.animation = "idle";
        }
        if (this.jump) {

            debugger;

            this.setY(this.getY() - this.getSpeedY());

            this.speedY = privateMembers.speedY - RUN_ACCELERATION_FOR_FRAME;

            if (privateMembers.y >= privateMembers.bottomY + 1) {

                this.jump = false;
                privateMembers.speedY = 0;
                this.setY(privateMembers.bottomY);
            }
            privateMembers.element.attrs.animation = "rotate";
        }
    }

    this.updateScale(radius, y, minLeft, maxRight);

    this.update();
}