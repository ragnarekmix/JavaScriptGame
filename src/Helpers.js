function include(url) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', url);
    document.getElementsByTagName('head').item(0).appendChild(script);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function ifCollisionBetwen(object1, object2) {
    var xColl = false;
    var yColl = false;

    if ((object1.drawX + object1.width >= object2.drawX) && (object1.drawX <= object2.drawX + object2.width)) 
        xColl = true;
    if ((object1.drawY + object1.height >= object2.drawY) && (object1.drawY <= object2.drawY + object2.height)) 
        yColl = true;

    if (xColl & yColl)
        return true;

    return false;
};

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
