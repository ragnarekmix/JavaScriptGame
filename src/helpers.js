function include(url) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', url);
    document.getElementsByTagName('head').item(0).appendChild(script);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function isCollisionBetwen(object1, object2, r1, r2) {
    var x1 = object1.drawX + object1.width / 2;
    var y1 = object1.drawY + object1.height / 2;
    var x2 = object2.drawX + object2.width / 2;
    var y2 = object2.drawY + object2.height / 2;

    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)) <= (r1 + r2) * 0.7;
}

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
