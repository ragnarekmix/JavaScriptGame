include('src/background.js');
include('src/player.js');
include('src/bullet.js');
include('src/enemy.js');
include('src/keyboardcontrol.js');

resources.load([
    'images/sprites.png',
    'images/background.jpg',
    'images/background1.jpg',
    'images/explosn.bmp'
]);
resources.onReady(init);

//window.onload = init;

var map;
var ctxMap;

var pl;
var ctxPl;

var en;
var ctxEn;

var stats;
var ctxStats;

var gameWidth = 800;
var gameHeight = 500;

var player;
var KEYS = [];
var enemies = [];

var spawnInterval;
var spawnTime = 5000;
var spawnAmount = 10;

var isPlaying;

function init() {
    map = document.getElementById("map");
    ctxMap = map.getContext("2d");

    pl = document.getElementById("player");
    ctxPl = pl.getContext("2d");

    en = document.getElementById("enemy");
    ctxEn = en.getContext("2d");

    stats = document.getElementById("stats");
    ctxStats = stats.getContext("2d");

    map.width = gameWidth;
    map.height = gameHeight;

    pl.width = gameWidth;
    pl.height = gameHeight;

    en.width = gameWidth;
    en.height = gameHeight;

    stats.width = gameWidth;
    stats.height = gameHeight;

    ctxStats.fillStile = "#3D3D3D";
    ctxStats.font = "bold 15pt Arial";

    player = new Player();

    startLoop();
    updateStats();
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
    moveBg();
    drawBg();
    updateStats();
    player.update();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].update();
    };
}

function clearCtxPl() {
    ctxPl.clearRect(0, 0, gameWidth, gameHeight);
};

function clearCtxEn() {
    ctxEn.clearRect(0, 0, gameWidth, gameHeight);
};

function updateStats() {
    ctxStats.clearRect(0, 0, 800, 500);
    ctxStats.fillText("Health: " + player.health, 10, 20);
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
        enemies[i] = new Enemy();
    };
};
