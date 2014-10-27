function Explosion(srcX, srcY, srcWidth, srcHeight, drawX, drawY, width, height, speed, frame, framesCount, src) {
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcWidth = srcWidth;
    this.srcHeight = srcHeight;
    this.src = src;
    this.drawX = drawX;
    this.drawY = drawY;
    this.width = width;
    this.height = height;
    this.speed = speed;

    this.frame = frame;
    this.framesCount = framesCount;
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
    if (this.frame > this.framesCount)
        this.destroy();
};

Explosion.prototype.destroy = function() {
    Explosions.splice(Explosions.indexOf(this), 1)
    clearInterval(this.frameInterval);
};

Explosion.prototype.draw = function() {
    ctxExplosion.drawImage(resources.get(this.src),
        this.srcX, this.srcY, this.srcWidth, this.srcHeight,
        this.drawX, this.drawY, this.width, this.height);
};
