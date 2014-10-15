function Bullet(x, y, angle) {
    this.bspeed = 7;
    this.drawX = x;
    this.drawY = y;
    this.dx = Math.cos(angle) * this.bspeed;
    this.dy = Math.sin(angle) * this.bspeed;
    this.srcX = 0;
    this.srcY = 224;
    this.width = 32;
    this.height = 32;


    Bullets.push(this);
};

Bullet.prototype.update = function() {
    this.drawX += this.dx;
    this.drawY += this.dy;

    if (this.drawX < -5 || this.drawX > gameWidth + 5 || this.drawY < -5 || this.drawY > gameHeight + 5)
        this.destroy();

    //TODO: Collision
};

Bullet.prototype.destroy = function() {
    Bullets.splice(Bullets.indexOf(this), 1)
};

Bullet.prototype.draw = function() {
    ctxBullet.drawImage(resources.get('images/sprites.png'), 
        this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
};
