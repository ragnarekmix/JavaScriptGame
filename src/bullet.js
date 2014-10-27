function Bullet(x, y, srcX, srcY, angle, damage, damageRadious) {
    this.speed = 7;
    this.damage = damage;
    this.damageRadious = damageRadious;
    this.drawX = x;
    this.drawY = y;
    this.dx = Math.cos(angle) * this.speed;
    this.dy = Math.sin(angle) * this.speed;
    this.srcX = srcX;
    this.srcY = srcY;
    this.width = 32;
    this.height = 32;
    this.type = 'bullet';
};

Bullet.prototype.update = function() {
    this.drawX += this.dx;
    this.drawY += this.dy;

    if (this.drawX < -5 || this.drawX > gameWidth + 5 || this.drawY < -5 || this.drawY > gameHeight + 5)
        this.destroy();
    for (var i = 0; i < Enemies.length; i++) {
        if (isCollisionBetwen(this, Enemies[i], this.damageRadious, Enemies[i].width / 2)) {
            this.destroy();
            explosionFactory.bang(this);
            Enemies[i].health -= this.damage;
        };
    };
};

Bullet.prototype.destroy = function() {
    Bullets.splice(Bullets.indexOf(this), 1);
};

Bullet.prototype.draw = function() {
    ctxBullet.drawImage(resources.get('images/sprites.png'),
        this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
};
