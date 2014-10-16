include('src/background.js');
include('src/player.js');
include('src/bullet.js');
include('src/bulletfactory.js');
include('src/enemy.js');
include('src/keyboardcontrol.js');

resources.load([
    'images/sprites.png',
    'images/background.jpg',
    'images/background1.jpg',
    'images/explosn.bmp'
]);
resources.onReady(init);

var mapCanvas;
var ctxMap;

var playerCanvas;
var ctxPl;

var bulletCanvas;
var ctxBullet;

var enemyCanvas;
var ctxEn;

var stats;
var ctxStats;

var gameWidth;
var gameHeight

var map1X;
var map2X;

var player;
var Enemies = [];
var Bullets = [];
var bulletFactory;
var KEYS = [];
var Score;

var spawnInterval;
var spawnTime
var spawnAmount;

var isPlaying;

function init() {
    mapCanvas = document.getElementById("map");
    ctxMap = mapCanvas.getContext("2d");

    playerCanvas = document.getElementById("player");
    ctxPl = playerCanvas.getContext("2d");

    bulletCanvas = document.getElementById("bullet");
    ctxBullet = bulletCanvas.getContext("2d");

    enemyCanvas = document.getElementById("enemy");
    ctxEn = enemyCanvas.getContext("2d");

    stats = document.getElementById("stats");
    ctxStats = stats.getContext("2d");

    gameWidth = 800;
    gameHeight = 500;

    map1X = 0;
    map2X = gameWidth;

    mapCanvas.width = gameWidth;
    mapCanvas.height = gameHeight;

    playerCanvas.width = gameWidth;
    playerCanvas.height = gameHeight;


    bulletCanvas.width = gameWidth;
    bulletCanvas.height = gameHeight;

    enemyCanvas.width = gameWidth;
    enemyCanvas.height = gameHeight;

    stats.width = gameWidth;
    stats.height = gameHeight;

    ctxStats.fillStyle = 'white';
    ctxStats.font = 'bold 15pt Arial';

    player = new Player();
    bulletFactory = new BulletFactory();
    Score = 0;

    spawnTime = 5000;
    spawnAmount = 10;

    startLoop();
    updateStats();
};

function loop() {
    if (isPlaying) {
        ClearCanvases()
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

function ClearCanvases() {
    ctxPl.clearRect(0, 0, gameWidth, gameHeight);
    ctxEn.clearRect(0, 0, gameWidth, gameHeight);
    ctxBullet.clearRect(0, 0, gameWidth, gameHeight);
}

function draw() {
    player.draw();
    for (var i = 0; i < Enemies.length; i++) {
        Enemies[i].draw();
    }
    for (var i = 0; i < Bullets.length; i++) {
        Bullets[i].draw();
    }
};

function update() {
    moveBg();
    drawBg();
    updateStats();
    player.update();
    for (var i = 0; i < Enemies.length; i++) {
        Enemies[i].update();
    }
    for (var i = 0; i < Bullets.length; i++) {
        Bullets[i].update();
    }
}

function updateStats() {
    ctxStats.clearRect(0, 0, 800, 500);
    ctxStats.fillText("Health: " + player.health + " Score: " + Score, 10, 20);
};

function startCreatingEnemies() {
    stopCreatinEnemies();
    spawnInterval = setInterval(function() {
        spawnEnemy(spawnAmount);
    }, spawnTime);
};

function stopCreatinEnemies() {
    clearInterval(spawnInterval);
};

function spawnEnemy(count) {
    for (var i = 0; i < count; i++) {
        Enemies.push(new Enemy());
    };
};
