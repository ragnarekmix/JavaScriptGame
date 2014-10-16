function Bullet(x, y, angle) {
    this.speed = 7;
    this.damage = 1;
    this.drawX = x;
    this.drawY = y;
    this.dx = Math.cos(angle) * this.speed;
    this.dy = Math.sin(angle) * this.speed;
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
    for (var i = 0; i < Enemies.length; i++) {
        if (isCollisionBerwen(this, Enemies[i], 0, Enemies[i].width / 2)) {
            this.destroy();
            Enemies[i].health -= this.damage;
        };
    };
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
