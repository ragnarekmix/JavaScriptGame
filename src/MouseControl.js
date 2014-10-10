function mouseMove(e) {
    if (!mouseControl)
        return;
    mouseX = e.pageX - map.offsetLeft;
    mouseY = e.pageY - map.offsetTop;
    player.drawX = mouseX - player.width / 2;
    player.drawY = mouseY - player.height / 2;

    document.getElementById("gameName").innerHTML = "X: " + mouseX + " Y: " + mouseY;
}

function mouseClick(e) {
    if (!mouseControl)
        return;
    document.getElementById("gameName").innerHTML = "Clicked";
}
