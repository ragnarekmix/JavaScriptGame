function moveBg() {

    var velocity = 2;
    map1X -= velocity;
    map2X -= velocity;

    if (map1X + gameWidth < 0)
        map1X = gameWidth - 5;
    if (map2X + gameWidth < 0)
        map2X = gameWidth - 5;
};

function drawBg() {
    ctxMap.drawImage(resources.get('images/background.jpg'), 0, 0, 2048, 1024,
        map1X, 0, gameWidth, gameHeight);
    ctxMap.drawImage(resources.get('images/background1.jpg'), 0, 0, 2048, 1024,
        map2X, 0, gameWidth, gameHeight);
};
