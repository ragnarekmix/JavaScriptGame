var Bullets = [];
var BullTemp = [];

function Bullet(x, y, angle) {
    this.bspeed = 7;
    this.x = x + 11 + Math.cos(angle) * 20;
    this.y = y + 11 + Math.sin(angle) * 20;
    this.dx = Math.cos(angle) * this.bspeed;
    this.dy = Math.sin(angle) * this.bspeed;
    this.destroyed = false;

    this.bcan = document.createElement('canvas');
    this.bcan.width = 10;
    this.bcan.height = 10;
    this.ctx = this.bcan.getContext('2d');
    this.ctx.beginPath();
    this.ctx.fillStyle = '#eeee00';
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#333300';
    this.ctx.arc(5, 5, 5, 0, 2 * Math.PI, true);
    this.ctx.stroke();
    this.ctx.fill();

    Bullets.push(this);
}

Bullet.prototype.tick = function(id) {
    this.x += this.dx;
    this.y += this.dy;

    if ((this.x < -10) || (this.y < -10) || (this.x > canvas.width) || (this.y > canvas.height)) {
        this.destroy(id);
    }

    //GetMacroCollision
    for (var i = 0; i < Asteroids.length; i++) {
        S = this.x - Asteroids[i].x;
        D = this.y - Asteroids[i].y;
        F = 10 + Asteroids[i].caster.width;
        if (S * S + D * D <= F * F) {
            opx = this.x + 5 - Asteroids[i].x;
            opy = this.y + 5 - Asteroids[i].y;
            cen = Asteroids[i].caster.width / 2;
            px = cen + (opx - cen) * Math.cos(-Asteroids[i].angle) + (cen - opy) * Math.sin(-Asteroids[i].angle);
            py = cen + (opx - cen) * Math.sin(-Asteroids[i].angle) + (opy - cen) * Math.cos(-Asteroids[i].angle);

            //Bound Collade
            if (pointInPoly(Asteroids[i].vertsXY, px, py)) {
                Asteroids[i].destroy(i);
                this.destroy(id);
            }
        }
    }
}

Bullet.prototype.destroy = function(id) {
    BullTemp.push(id);
}

Bullet.prototype.update = function() {
    context.drawImage(this.bcan, this.x, this.y);
}
