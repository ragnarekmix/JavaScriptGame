window.onkeydown = function(event) {
    KEYS[event.which] = true;
    console.log(event.which);
};

window.onkeyup = function(event) {
    KEYS[event.which] = false;
};