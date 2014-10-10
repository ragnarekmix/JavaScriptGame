function checkKeyDown(e) {
    var keyId = e.KeyCode || e.which;
    var keyChar = String.fromCharCode(keyId);

    if (keyChar == 'W') {
        player.isUp = true;
        e.preventDefault();
    };
    if (keyChar == 'S') {
        player.isDown = true;
        e.preventDefault();
    };
    if (keyChar == 'A') {
        player.isLeft = true;
        e.preventDefault();
    };
    if (keyChar == 'D') {
        player.isRight = true;
        e.preventDefault();
    };
};

function checkKeyUp(e) {
    var keyId = e.KeyCode || e.which;
    var keyChar = String.fromCharCode(keyId);

    if (keyChar == 'W') {
        player.isUp = false;
        e.preventDefault();
    };
    if (keyChar == 'S') {
        player.isDown = false;
        e.preventDefault();
    };
    if (keyChar == 'A') {
        player.isLeft = false;
        e.preventDefault();
    };
    if (keyChar == 'D') {
        player.isRight = false;
        e.preventDefault();
    };
};
