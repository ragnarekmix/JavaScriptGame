function Enemy() {
    this.srcX = 32;
    this.srcY = 0;
    this.drawX = getRandomInt(gameWidth, gameWidth + gameWidth);
    this.drawY = getRandomInt(0, gameHeight - 32);
    this.width = 32;
    this.height = 32;
    this.health = 1;
    this.scoreCost = 10;
    this.speed = 2.5;
};

Enemy.prototype.update = function() {
    if (this.health <= 0) {
        Score += this.scoreCost;
        this.destroy();
    };
    if (this.drawX + this.width < 0)
        this.destroy();
    this.drawX -= this.speed;
};

Enemy.prototype.destroy = function() {
    Enemies.splice(Enemies.indexOf(this), 1)
};

Enemy.prototype.draw = function() {
    ctxEn.drawImage(resources.get('images/sprites.png'),
        this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
};
