function moveBg() {
    var velocity = 2;
    mapX -= velocity;
    map1X -= velocity;

    if (mapX + gameWidth < 0) mapX = gameWidth - 5;
    if (map1X + gameWidth < 0) map1X = gameWidth - 5;
};

function drawBg() {
    ctxMap.drawImage(background, 0, 0, 2048, 1024,
        mapX, 0, gameWidth, gameHeight);
    ctxMap.drawImage(background1, 0, 0, 2048, 1024,
        map1X, 0, gameWidth, gameHeight);
};