function include(url) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', url);
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include('src/background.js');
include('src/player.js');
include('src/enemy.js');
include('src/helpers.js');
include('src/keyboardcontrol.js');
include('src/mousecontrol.js');


window.onload = init;

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

var background = new Image();
background.src = "images/background.jpg";

var background1 = new Image();
background1.src = "images/background1.jpg";

var sprites = new Image();
sprites.src = "images/sprites.png";

var player;
var KEYS = [];
var enemies = [];

var spawnInterval;
var spawnTime = 5000;
var spawnAmount = 10;

var mouseX;
var mouseY;
var mouseControl = false;

var isPlaying;

var mapX = 0;
var map1X = gameWidth;

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

    document.addEventListener("mousemove", mouseMove, false);
    document.addEventListener("click", mouseClick, false);
    document.addEventListener("keydown", checkKeyDown, false);
    document.addEventListener("keyup", checkKeyUp, false);
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
