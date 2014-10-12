function Player() {
    this.srcX = 0;
    this.srcY = 0;
    this.drawX = 0;
    this.drawY = gameHeight / 2;
    this.width = 30;
    this.height = 30;

    this.health = 5;
    this.isImmortal = false;

    this.speed = 5;
    this.maxspeed = 5;
    this.minspeed = -3;
    this.cspeed = 0;
    this.accel = 0.3;
    this.backaccel = 0.2;
    this.antiaccel = 0.1;
    
    this.isUp = false;
    this.isDown = false;
    this.isLeft = false;
    this.isRight = false;
};

Player.prototype.resetPlayer = function() {
    this.isImmortal = true;
    this.health = 5;
    this.drawX = 0;
    this.drawY = gameHeight / 2;
};

Player.prototype.draw = function() {
    clearCtxPl();
    ctxPl.drawImage(sprites, this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
};

Player.prototype.update = function() {
    if (this.health <= 0) {
        this.resetPlayer();
    };
    this.doNotLetPlayerGoOutOfTheBorders();
    this.checkTheCollision();
    this.choseDirection();
};

Player.prototype.checkTheCollision = function() {
    for (var i = 0; i < enemies.length; i++) {
        if (this.drawX >= enemies[i].drawX &&
            this.drawY >= enemies[i].drawY &&
            this.drawX <= enemies[i].drawX + enemies[i].width &&
            this.drawY <= enemies[i].drawY + enemies[i].height && !this.isImmortal) {
            this.health--;
            console.log('collision');
        };
    };
};

Player.prototype.doNotLetPlayerGoOutOfTheBorders = function() {
    if (this.drawX < 5) this.drawX = 5;
    if (this.drawX > gameWidth - this.width - 5) this.drawX = gameWidth - this.width - 5;
    if (this.drawY < 5) this.drawY = 5;
    if (this.drawY > gameHeight - this.height - 5) this.drawY = gameHeight - this.height - 5;

};

Player.prototype.choseDirection = function() {
    if (this.isUp)
        this.drawY -= this.speed;
    if (this.isDown)
        this.drawY += this.speed;
    if (this.isLeft)
        this.drawX -= this.speed;
    if (this.isRight)
        this.drawX += this.speed;
};

Player.prototype.keydown = function(KEYS) {
    if (window.KEYS[65] === true) {
        this.angle -= 0.1;
        this.drawPlayer();
    }
    if (window.KEYS[68] === true) {
        this.angle += 0.1;
        this.drawPlayer();
    }

    if (window.KEYS[87] === true) {

        if (this.cspeed < this.maxspeed) {
            this.cspeed += this.accel;
        } else {
            this.cspeed = this.maxspeed;
        }
    } else if (window.KEYS[83] === true) {
        if (this.cspeed > this.minspeed) {
            this.cspeed -= this.accel;
        } else {
            this.cspeed = this.minspeed;
        }
    } else {
        if (this.cspeed > 0) {
            this.cspeed -= this.antiaccel;
        } else if (this.cspeed < 0) {
            this.cspeed += this.antiaccel;
        }
    }
};
