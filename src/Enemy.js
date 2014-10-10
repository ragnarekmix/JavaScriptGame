function Enemy() {
    this.srcX = 30;
    this.srcY = 0;
    this.drawX = getRandomInt(gameWidth, gameWidth + gameWidth);
    this.drawY = getRandomInt(0, gameHeight - 30);
    this.width = 30;
    this.height = 30;

    this.speed = 5;
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

Enemy.prototype.destroy = function() {
    enemies.splice(enemies.indexOf(this), 1)
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
