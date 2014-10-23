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
    if (window.KEYS[65] === true) { //65 = A, Back
        if (this.currentSpeedX > this.minSpeedX)
            this.currentSpeedX -= this.accel;
        else
            this.currentSpeedX = this.minSpeedX;
    } else if (window.KEYS[68] === true) { //68 = D, Forward
        if (this.currentSpeedX < this.maxSpeedX)
            this.currentSpeedX += this.accel;
        else
            this.currentSpeedX = this.maxSpeedX;
    } else {
        if (this.currentSpeedX > 0)
            this.currentSpeedX -= this.antiAccel;
        else if (this.currentSpeedX < 0)
            this.currentSpeedX += this.antiAccel;

    }

    if (window.KEYS[87] === true) { //87 = W, Up
        if (this.currentSpeedY > this.minSpeedY)
            this.currentSpeedY -= this.accel;
        else
            this.currentSpeedY = this.minSpeedY;
    } else if (window.KEYS[83] === true) { //83 = S, Down
        if (this.currentSpeedY < this.maxSpeedY)
            this.currentSpeedY += this.accel;
        else
            this.currentSpeedY = this.maxSpeedY;
    } else {
        if (this.currentSpeedY > 0)
            this.currentSpeedY -= this.antiAccel;
        else if (this.currentSpeedY < 0)
            this.currentSpeedY += this.antiAccel;
    }

    this.drawX += this.currentSpeedX;
    this.drawY += this.currentSpeedY;


    if (window.KEYS[32] === true) {
        this.toggleFire();
    }
};
