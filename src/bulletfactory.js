function BulletFactory() {
    this.bullets = [];
    this.angles = [];
};

BulletFactory.prototype.fire = function(count, level) {

    if (count === 1)
        this.angles = this.angles.concat([0]);
    if (count === 2)
        this.angles = this.angles.concat([-0.1, 0.1]);
    if (count === 3)
        this.angles = this.angles.concat([-0.15, 0, 0.15]);
    if (count === 4)
        this.angles = this.angles.concat([-0.3, -0.1, 0.1, 0.3]);
    if (count === 5)
        this.angles = this.angles.concat([-0.35, -0.15, 0, 0.15, 0.35]);
    if (count > 5)
        console.log('NotImplemented');

    for (var i = 0; i < this.angles.length; i++)
        this.madeNewBullet(this.angles[i], level);

    Bullets = Bullets.concat(this.bullets);
    this.clearValues();
};

BulletFactory.prototype.madeNewBullet = function(angle, level) {
    var x = player.drawX + player.width / 2;
    var y = player.drawY;
    if (level === 1)
        this.bullets.push(new Bullet(x, y, 0, 224, angle, 1, 1));
    if (level === 2)
        this.bullets.push(new Bullet(x, y, 32, 224, angle, 2, 3));
    if (level === 3)
        this.bullets.push(new Bullet(x, y, 64, 224, angle, 3, 5));
    if (level > 3)
        console.log('NotImplemented');
};

BulletFactory.prototype.clearValues = function() {
    this.bullets.splice(0, this.bullets.length);
    this.angles.splice(0, this.angles.length);
}
