function Game(canvasID) {
    this.canvasID = canvasID;
    this.ctx = document.getElementById(this.canvasID).getContext("2d");
}

Game.prototype.init = function () {
    window.requestAnimationFrame(this.update.bind(this))
}

Game.prototype.draw = function () {

}

Game.prototype.update = function (timestamp) {
    console.log(this);
}