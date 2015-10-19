function Game(canvasID) {
    this.canvasID = canvasID;
    this.ctx = document.getElementById(this.canvasID).getContext("2d");
    this.last = null;
    this.scene = "loading";
    this.width = 800;
    this.height = 600;
    this.imageList = [];
    this.img = {};
    this.loaded = 0;
}

Game.prototype.init = function () {
    window.onkeydown = this.keydown.bind(this);
    document.getElementById(this.canvasID).onmousedown = this.mousedown.bind(this);
    document.getElementById(this.canvasID).onmousemove = this.mousemove.bind(this);
    document.getElementById(this.canvasID).onmouseup = this.mouseup.bind(this);
    document.getElementById(this.canvasID).addEventListener("touchstart", this.touchdown.bind(this), false);
    document.getElementById(this.canvasID).addEventListener("touchmove", this.touchmove.bind(this), false);
    document.getElementById(this.canvasID).addEventListener("touchend", this.touchup.bind(this), false);
    for (var i=0; i<this.imageList.length; ++i) {
        if (!this.img.hasOwnProperty(this.imageList[i])) {
            this.img[this.imageList[i]]={
                img: new Image(),
            }
            this.img[this.imageList[i]].img.src = this.imageList[i];
        }
    }
    window.requestAnimationFrame(this.update.bind(this));
}

Game.prototype.keydown = function (e) {
    console.log(e,this);
}
Game.prototype.mousedown = function (e) {
    console.log(e,this);
}
Game.prototype.mousemove = function (e) {
    console.log(e,this);
}
Game.prototype.mouseup = function (e) {
    console.log(e,this);
}
Game.prototype.touchdown = function (e) {
    console.log(e,this);
}
Game.prototype.touchmove = function (e) {
    console.log(e,this);
}
Game.prototype.touchup = function (e) {
    console.log(e,this);
}

Game.prototype.draw = function () {
    if (this.scene == "loading") {
        this.ctx.fillStyle="white";
        this.ctx.fillRect(0,0,this.width, this.height);
        this.ctx.fillStyle="black";
        var x0 = this.width * 0.3;
        var w = this.width*0.4;
        var y0 = this.height*0.8;
        var h = this.height*0.05;
        this.ctx.fillRect(x0,y0,w,h);
        this.ctx.fillStyle="red";
        var border = 2;
        this.ctx.fillRect(x0+border,y0+border,(w-border*2)*this.loaded, h-border*2);
    }
}

Game.prototype.update = function (timestamp) {
    this.updateTime(timestamp);
    this.draw();
    window.requestAnimationFrame(this.update.bind(this));
}

Game.prototype.updateTime = function (timestamp) {
    if (this.scene=="loading") {
        var done=0;
        for (var key in this.img) {
            if (this.img.hasOwnProperty(key) && this.img[key].img.completed) ++done; 
        }
        var count = Object.keys(this.img).length;
        if (count==0) {
            this.loaded = 1;
        } else {
            this.loaded = done/count; 
        }
    } else {
        if (this.last!=null) {
            var delta = timestamp - this.last
        }
        this.last = timestamp;
    }
}