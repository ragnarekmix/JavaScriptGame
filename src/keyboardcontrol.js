window.onkeydown = function(event) {
    if (event.which === 80)
        pauseGame();
    KEYS[event.which] = true;
};

window.onkeyup = function(event) {
    KEYS[event.which] = false;
};
