window.onload = init;

var map;
var ctxMap;

var pl;
var ctxPl;

var en;
var ctxEn;

var drawBtn;
var clearBtn;

var gameWidth = 800;
var gameHeight = 500;

var background = new Image();
background.src = "images/background.jpg";

var sprites = new Image();
sprites.src = "images/sprites.png";

var player;
var enemies = [];

var spawnInterval;
var spawnTime = 12000;
var spawnAmount = 5;

var isPlaying;

var requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function init() {
    map = document.getElementById("map");
    ctxMap = map.getContext("2d");

    pl = document.getElementById("player");
    ctxPl = pl.getContext("2d");

    en = document.getElementById("enemy");
    ctxEn = en.getContext("2d");

    map.width = gameWidth;
    map.height = gameHeight;

    pl.width = gameWidth;
    pl.height = gameHeight;

    en.width = gameWidth;
    en.height = gameHeight;

    drawBtn = document.getElementById("drawBtn");
    clearBtn = document.getElementById("clearBtn");

    drawBtn.addEventListener("click", drawRect, false);
    clearBtn.addEventListener("click", clearRect, false);

    player = new Player();

    drawBg();
    startLoop();

    document.addEventListener("keydown", checkKeyDown, false);
    document.addEventListener("keyup", checkKeyUp, false);
};

function startCreatingEnemies() {
    stopCreatinEnemies();
    spawnInterval = setInterval(function() {
        spawnEnemy(spawnAmount);
    }, spawnTime);
}

function stopCreatinEnemies() {
    clearInterval(spawnInterval);
}

function spawnEnemy(count) {
    for (var i = 0; i < count; i++) {
        enemies[i] = new Enemy();
    };
};

function loop() {
    if (isPlaying) {
        draw();
        update();
        requestAnimFrame(loop);
    };
};

function startLoop() {
    isPlaying = true;
    loop();
    startCreatingEnemies();
};

function stopLoop() {
    isPlaying = false;
};

function draw() {
    player.draw();
    clearCtxEn();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    };
};

function update() {
    player.update();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].update();
    };
}

function Player() {
    this.srcX = 0;
    this.srcY = 0;
    this.drawX = 0;
    this.drawY = 0;
    this.width = 30;
    this.height = 30;

    this.speed = 5;
    this.isUp = false;
    this.isDown = false;
    this.isLeft = false;
    this.isRight = false;
};

Player.prototype.draw = function() {
    clearCtxPl();
    ctxPl.drawImage(sprites, this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
};

Player.prototype.update = function() {
    if (this.drawX < 5) this.drawX = 5;
    if (this.drawX > gameWidth - this.width - 5) this.drawX = gameWidth - this.width - 5;
    if (this.drawY < 5) this.drawY = 5;
    if (this.drawY > gameHeight - this.height - 5) this.drawY = gameHeight - this.height - 5;
    this.choseDirection();
};

Player.prototype.choseDirection = function() {
    if (this.isUp)
        this.drawY -= this.speed;
    if (this.isDown)
        this.drawY += this.speed;
    if (this.isLeft)
        this.drawX -= this.speed;
    if (this.isRight)
        this.drawX += this.speed;
};

function checkKeyDown(e) {
    var keyId = e.KeyCode || e.which;
    var keyChar = String.fromCharCode(keyId);

    if (keyChar == 'W') {
        player.isUp = true;
        e.preventDefault();
    };
    if (keyChar == 'S') {
        player.isDown = true;
        e.preventDefault();
    };
    if (keyChar == 'A') {
        player.isLeft = true;
        e.preventDefault();
    };
    if (keyChar == 'D') {
        player.isRight = true;
        e.preventDefault();
    };
}

function checkKeyUp(e) {
    var keyId = e.KeyCode || e.which;
    var keyChar = String.fromCharCode(keyId);

    if (keyChar == 'W') {
        player.isUp = false;
        e.preventDefault();
    };
    if (keyChar == 'S') {
        player.isDown = false;
        e.preventDefault();
    };
    if (keyChar == 'A') {
        player.isLeft = false;
        e.preventDefault();
    };
    if (keyChar == 'D') {
        player.isRight = false;
        e.preventDefault();
    };
}

function Enemy() {
    this.srcX = 30;
    this.srcY = 0;
    this.drawX = getRandomInt(gameWidth, gameWidth + gameWidth);
    this.drawY = getRandomInt(0, gameHeight - 30);
    this.width = 30;
    this.height = 30;

    this.speed = 1;
};

Enemy.prototype.draw = function() {
    ctxEn.drawImage(sprites, this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
};

Enemy.prototype.update = function() {
    this.drawX -= this.speed;
    if (this.drawX + this.width < 0) {
        this.destroy();
    };
};

Enemy.prototype.destroy = function () {
	enemies.splice(enemies.indexOf(this),1)
	}

function clearCtxPl() {
    ctxPl.clearRect(0, 0, gameWidth, gameHeight);
};

function clearCtxEn() {
    ctxEn.clearRect(0, 0, gameWidth, gameHeight);
};

function drawRect() {
    ctxMap.fillStyle = "#3D3D3D";
    ctxMap.fillRect(10, 10, 100, 100);
};

function clearRect() {
    ctxMap.clearRect(0, 0, 800, 500);
};

function drawBg() {
    ctxMap.drawImage(background, 0, 0, 800, 500,
        0, 0, gameWidth, gameHeight);
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
