function Enemy() {
    this.srcX = 32;
    this.srcY = 0;
    this.srcWidth = 32;
    this.srcHeight = 32
    this.drawX = getRandomInt(gameWidth, gameWidth + gameWidth);
    this.drawY = getRandomInt(0, gameHeight - 32);
    this.width = 40;
    this.height = 40;
    this.health = 5;
    this.scoreCost = 10;
    this.speed = 1;
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
        this.srcX, this.srcY, this.srcWidth, this.srcHeight,
        this.drawX, this.drawY, this.width, this.height);
};
