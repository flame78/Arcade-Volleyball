/// <reference path="_references.js" />

window.onload = function () {
    "use strict";

    var stage = new Kinetic.Stage({
        container: 'container',
        width: 1020,
        height: 650
    });

    var layer = new Kinetic.Layer();

    var imageObj = new Image();

    imageObj.onload = function () {
        var superSonic = new Kinetic.Sprite({
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
                  7, 110, 110, 120,
                 // 100, 240, 110, 120,
                ]
            },
            frameRate: 60,
            frameIndex: 0
        });

        // add the shape to the layer
        layer.add(superSonic);

        // add the layer to the stage
        stage.add(layer);

        // start sprite animation
        superSonic.start();

        var frameCount = 0;

        superSonic.on('frameIndexChange', function (evt) {
            if (superSonic.animation() === 'move' ) {
                superSonic.animation('idle'); // restore original animation
             //   superSonic.scaleX(1); // restore original animation
                frameCount = 0;
            }
        });

        function onKeyDown(evt) {
            switch (evt.keyCode) {
                case 37:  // left arrow
                    superSonic.setX(superSonic.attrs.x -= 50);
                    superSonic.scaleX(-1);    // this scale reverses the mario
                    superSonic.attrs.animation = "move";
                    break;
                case 39:  // right arrow
                    superSonic.setX(superSonic.attrs.x += 50);
                    superSonic.attrs.animation = "move";
                    break;
                case 38:  // up arrow
                    superSonic.setY(superSonic.attrs.y -= 50);
                    superSonic.attrs.animation = "move";
                    break;
                case 40:  // down arrow
                    superSonic.setY(superSonic.attrs.y += 50);
                    superSonic.attrs.animation = "move";
                    break;
            }
        }

        window.addEventListener('keydown', onKeyDown);
    };

    imageObj.src = "image/sonic_hd_sprite_by_moongrape-d54boq6.png";

    var paper = new Raphael(0, 0, 1020, 650);

    paper.image("image/beach.jpg", 0, 0, 1020, 650);
}