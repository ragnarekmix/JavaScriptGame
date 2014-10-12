function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function ifCollisionWith(object1, object2) {
    return object1.drawX >= object2.drawX &&
        object1.drawY >= object2.drawY &&
        object1.drawX <= object2.drawX + object2.width &&
        object1.drawY <= object2.drawY + object2.height;
};
