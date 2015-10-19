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
    this.data = {
        last: Date.now(),
        blood: 0,
    };
    this.secret = "Are you really going to do this? u bstrd!";
    this.units = [
        "Gallon",
        "Goats",
        "Humans",
        "Elephants",
        "Whales",
        "Your Mom",
    ];
    this.version = "0.0.0.1";
    this.menu = [
        {
            x: this.width*0.0,
            y: this.height*0.0,
            w: this.width*0.1,
            h: this.height*0.1,
            img: "gfx/town.jpeg",
            onclick: function () {

            }
        },
        {
            x: this.width*0.1,
            y: this.height*0.0,
            w: this.width*0.1,
            h: this.height*0.1,
            img: "gfx/minigame.jpg",
            onclick: function () {
                
            }
        },
        {
            x: this.width*0.2,
            y: this.height*0.0,
            w: this.width*0.1,
            h: this.height*0.1,
            img: "gfx/upgrade.gif",
            onclick: function () {
                
            }
        },
        {
            x: this.width*0.7,
            y: this.height*0.0,
            w: this.width*0.1,
            h: this.height*0.1,
            img: "gfx/achievement.png",
            onclick: function () {
                
            }
        },
        {
            x: this.width*0.8,
            y: this.height*0.0,
            w: this.width*0.1,
            h: this.height*0.1,
            img: "gfx/credits.gif",
            onclick: function () {
                
            }
        },
        {
            x: this.width*0.9,
            y: this.height*0.0,
            w: this.width*0.1,
            h: this.height*0.1,
            img: "gfx/options.png",
            onclick: function () {
                
            }
        },
    ];
    for (var i=0; i<this.menu.length; ++i) this.imageList.push(this.menu[i].img);
}

Game.prototype.load = function () {
    if (true || !localStorage.getItem("data")) {
        var encrypted = CryptoJS.AES.encrypt(JSON.stringify(this.data), this.secret).toString();
        localStorage.setItem("data",encrypted);
    } else {
        this.data = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("data"), this.secret).toString(CryptoJS.enc.Utf8));
    }
}

Game.prototype.init = function () {
    this.load();
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
                completed: false,
            }
            this.img[this.imageList[i]].img.onload = function (img) {
                img.completed = true;
            }.bind(null,this.img[this.imageList[i]])
            this.img[this.imageList[i]].img.src = this.imageList[i];
        }
    }
    window.requestAnimationFrame(this.update.bind(this));
}

Game.prototype.keydown = function (e) {
    this.key(e.keyCode);
}

Game.prototype.mousedown = function (e) {
    var parentPosition = getPosition(e.currentTarget);
    var x = e.clientX - parentPosition.x;
    var y = e.clientY - parentPosition.y;
    this.press(x,y,0);
}
Game.prototype.mousemove = function (e) {
    var parentPosition = getPosition(e.currentTarget);
    var x = e.clientX - parentPosition.x;
    var y = e.clientY - parentPosition.y;
    this.move(x,y,0);
}
Game.prototype.mouseup = function (e) {
    var parentPosition = getPosition(e.currentTarget);
    var x = e.clientX - parentPosition.x;
    var y = e.clientY - parentPosition.y;
    this.release(x,y,0);
}
Game.prototype.touchdown = function (e) {
    var obj=event.changedTouches||event.originalEvent.changedTouches;
    for (var i=0; i<obj.length; ++i) {
        var x = obj[i].pageX-obj[i].target.offsetLeft;
        var y = obj[i].pageY-obj[i].target.offsetTop;
        var id= i;
        this.press(x,y,id);
    }
}
Game.prototype.touchmove = function (e) {
    var obj=event.changedTouches||event.originalEvent.changedTouches;
    for (var i=0; i<obj.length; ++i) {
        var x = obj[i].pageX-obj[i].target.offsetLeft;
        var y = obj[i].pageY-obj[i].target.offsetTop;
        var id=i;
        this.move(x,y,id);
    }
}
Game.prototype.touchup = function (e) {
    var obj=event.changedTouches||event.originalEvent.changedTouches;
    for (var i=0; i<obj.length; ++i) {
        var x = obj[i].pageX-obj[i].target.offsetLeft;
        var y = obj[i].pageY-obj[i].target.offsetTop;
        var id= i;
        this.release(x,y,id);
    }
}

Game.prototype.key = function (key) {
    console.log("Pressed: "+key);
}
Game.prototype.press = function (x,y,id) {
    console.log("M begin",x,y,id);
}
Game.prototype.move = function (x,y,id) {
    //console.log("M move",x,y,id);
}
Game.prototype.release = function (x,y,id) {
    console.log("M end",x,y,id);
    if (this.scene=="loading" && this.loaded==1) {
        this.scene = "town";
    }
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
        this.ctx.font = "20px GameFont";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "right";
        this.ctx.textBaseLine = "bottom";
        this.ctx.fillText(this.version,this.width-10,this.height-10)
    } else if (this.scene == "town") {
        this.ctx.fillStyle="red";
        this.ctx.fillRect(0,0,this.width, this.height);
        this.drawHeader();
    }
}

Game.prototype.bloodToText = function () {
    var exp = 0;
    if (this.data.blood>0) {
        exp = Math.floor(getBaseLog(1000,this.data.blood));
    }
    if (exp==0) {
        return this.data.blood.toString()+" "+this.units[exp];
    } else {
        console.log(this.data.blood,Math.pow(1000,exp))
        return (this.data.blood/Math.pow(1000,exp)).toFixed(1).toString()+" "+this.units[Math.floor(exp)];
    }
}

Game.prototype.drawHeader = function () {
    this.ctx.fillStyle="black";
    this.ctx.fillRect(this.width*0.3,this.height*0.0,this.width*0.4,this.height*0.1);
    this.ctx.font = "20px GameFont";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    this.ctx.textBaseLine = "middle";
    this.ctx.fillText(this.bloodToText(),this.width/2,this.height*0.065);
    for (var i=0; i<this.menu.length; ++i) {
        this.ctx.drawImage(this.img[this.menu[i].img].img,this.menu[i].x,this.menu[i].y,this.menu[i].w,this.menu[i].h);
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
            if (this.img.hasOwnProperty(key) && this.img[key].completed) ++done; 
        }
        var count = Object.keys(this.img).length;
        if (count==0) {
            this.loaded = 1;
        } else {
            this.loaded = done/count; 
        }
    } else {
        var now = Date.now();
        if (this.data.last<now) {
            this.advanceTo(now);
        }
    }
}

Game.prototype.advanceTo = function (timestamp) {
    var delta = timestamp - this.data.last;
    this.data.last = timestamp;
    this.data.blood += Math.ceil(delta);
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(this.data), this.secret).toString();
    localStorage.setItem("data",encrypted);
}