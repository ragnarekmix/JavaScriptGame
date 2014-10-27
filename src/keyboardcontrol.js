window.onkeydown = function(event) {
    KEYS[event.which] = true;
};

window.onkeyup = function(event) {
    KEYS[event.which] = false;
};