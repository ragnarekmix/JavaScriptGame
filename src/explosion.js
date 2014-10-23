function Explosion(x, y, speed) {
    this.srcX = 0;
    this.srcY = 0;
    this.srcWidth = 39;
    this.srcHeight = 37;
    this.drawX = x;
    this.drawY = y;
    this.width = 32;
    this.height = 32;
    this.speed = speed;

    this.frame = 0;
    this.frames = 12;
    this.frameTime = 50;

    this.frameInterval = setInterval(function(obj) {
        obj.updateFrame();
    }, this.frameTime, this);
};

Explosion.prototype.updateFrame = function() {
    this.frame++;
};

Explosion.prototype.update = function() {
    this.drawX -= this.speed;
    this.srcX = this.srcWidth * this.frame;
    if (this.frame > frames)
        this.destroy();
};

Explosion.prototype.destroy = function() {
    explosions.splice(explosions.indexOf(this), 1)
    clearInterval(this.frameInterval);
};

Explosion.prototype.draw = function() {
    ctxExplosion.drawImage(resources.get('images/explosn.png'),
        this.srcX, this.srcY, this.srcWidth, this.srcHeight,
        this.drawX, this.drawY, this.width, this.height);
};
