function ExplosionFactory() {};

ExplosionFactory.prototype.bang = function(obj) {
    if (obj.type === 'player')
        Explosions.push(new Explosion(0, 0, 39, 37, obj.drawX, obj.drawY, obj.width, obj.height, -obj.currentSpeedX, 0, 12, 'images/explosn.png'));
    if (obj.type === 'enemy')
        Explosions.push(new Explosion(0, 0, 39, 37, obj.drawX, obj.drawY, obj.width, obj.height, obj.speed, 0, 12, 'images/explosn.png'));
    if (obj.type === 'bullet')
        Explosions.push(new Explosion(0, 224, 32, 32, obj.drawX, obj.drawY, obj.width, obj.height, 0, 3, 5, 'images/sprites.png'));
};
