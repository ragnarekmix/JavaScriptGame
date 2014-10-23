function Player() {
    this.srcX = 0;
    this.srcY = 0;
    this.drawX = 25;
    this.drawY = gameHeight / 2;
    this.width = 32;
    this.height = 32;

    this.health = 5;
    this.isImmortal = false;

    this.currentSpeedX = 0;
    this.maxSpeedX = 3;
    this.minSpeedX = -3;

    this.currentSpeedY = 0;
    this.maxSpeedY = 3;
    this.minSpeedY = -3;

    this.accel = 0.2;
    this.antiAccel = 0.05;

    this.weaponLevel = 3;
    this.weaponCount = 5;
    this.fireRate = 300;
    this.fireRateTimer = false;

    this.autoFire = false;
    this.autoFireInterval = setInterval(function(obj) {
        obj.fire();
    }, this.fireRate, this);
};

Player.prototype.draw = function() {
    ctxPl.drawImage(resources.get('images/sprites.png'), this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
};

Player.prototype.update = function() {
    this.doNotLetPlayerGoOutOfTheBorders();
    this.checkTheCollision();
    this.move();
};

Player.prototype.resetPlayer = function() {
    Score -= Score * 0.1;
    this.health = 5;
    this.drawX = 25;
    this.drawY = gameHeight / 2;
};

Player.prototype.checkTheCollision = function() {
    for (var i = 0; i < Enemies.length; i++) {
        if (isCollisionBetwen(this, Enemies[i], this.width / 2, Enemies[i].width / 2)) {
            if (!this.isImmortal) {
                if (this.health == 1)
                    this.resetPlayer();
                else
                    this.health -= 1;
                Enemies[i].destroy();
            }
        };
    };
};

Player.prototype.doNotLetPlayerGoOutOfTheBorders = function() {
    if (this.drawX < 5)
        this.currentSpeedX = 1;
    if (this.drawX > gameWidth - this.width - 5)
        this.currentSpeedX = -1;
    if (this.drawY < 5)
        this.currentSpeedY = 1;
    if (this.drawY > gameHeight - this.height - 5)
        this.currentSpeedY = -1;
};

Player.prototype.toggleFire = function() {
    if (this.fireRateTimer == false) {
        this.fireRateTimer = true;
        setTimeout(function(obj) {
            obj.stopFireDelay();
        }, 300, this);
    };
};

Player.prototype.fire = function() {
    if (this.autoFire)
        bulletFactory.fire(this.weaponCount, this.weaponLevel);
}

Player.prototype.stopFireDelay = function() {
    this.autoFire = !this.autoFire;
    this.fireRateTimer = false;
}

Player.prototype.move = function(KEYS) {
    if (window.KEYS[68] === true || window.KEYS[39] === true)
        player.forvard();
    else if (window.KEYS[65] === true || window.KEYS[37] === true)
        player.back();
    else
        player.decelerationX();

    if (window.KEYS[87] === true || window.KEYS[38] === true)
        player.up();
    else if (window.KEYS[83] === true || window.KEYS[40] === true)
        player.down();
    else
        player.decelerationY();

    this.drawX += this.currentSpeedX;
    this.drawY += this.currentSpeedY;

    if (window.KEYS[32] === true) {
        this.toggleFire();
    }
};

Player.prototype.forvard = function() {
    if (this.currentSpeedX < this.maxSpeedX)
        this.currentSpeedX += this.accel;
    else
        this.currentSpeedX = this.maxSpeedX;
};

Player.prototype.back = function() {
    if (this.currentSpeedX > this.minSpeedX)
        this.currentSpeedX -= this.accel;
    else
        this.currentSpeedX = this.minSpeedX;
};

Player.prototype.decelerationX = function() {
    if (this.currentSpeedX > 0)
        this.currentSpeedX -= this.antiAccel;
    else if (this.currentSpeedX < 0)
        this.currentSpeedX += this.antiAccel;
};

Player.prototype.up = function() {
    if (this.currentSpeedY > this.minSpeedY)
        this.currentSpeedY -= this.accel;
    else
        this.currentSpeedY = this.minSpeedY;
};

Player.prototype.down = function(first_argument) {
    if (this.currentSpeedY < this.maxSpeedY)
        this.currentSpeedY += this.accel;
    else
        this.currentSpeedY = this.maxSpeedY;
};

Player.prototype.decelerationY = function() {
    if (this.currentSpeedY > 0)
        this.currentSpeedY -= this.antiAccel;
    else if (this.currentSpeedY < 0)
        this.currentSpeedY += this.antiAccel;
};
