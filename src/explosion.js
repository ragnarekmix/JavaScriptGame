function Explosion(x, y) {
    this.srcX = 32;
    this.srcY = 0;
    this.drawX = x;
    this.drawY = y;
    this.width = 32;
    this.height = 32;
};

Explosion.prototype.update = function() {

};

Explosion.prototype.destroy = function() {
    explosions.splice(explosions.indexOf(this), 1)
};

Explosion.prototype.draw = function() {
    ctxEn.drawImage(sprites, this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
};
