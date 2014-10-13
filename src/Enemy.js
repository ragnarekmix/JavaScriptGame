function Enemy() {
    this.srcX = 32;
    this.srcY = 0;
    this.drawX = getRandomInt(gameWidth, gameWidth + gameWidth);
    this.drawY = getRandomInt(0, gameHeight - 32);
    this.width = 32;
    this.height = 32;

    this.speed = 3;
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

Enemy.prototype.draw = function() {
    ctxEn.drawImage(resources.get('images/sprites.png'), this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
};
