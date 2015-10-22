function Game(canvasID) {
    this.canvasID = canvasID;
    this.ctx = document.getElementById(this.canvasID).getContext("2d");
    this.last = null;
    this.scene = "loading";
    this.overlay = "none";
    this.width = 800;
    this.height = 600;
    this.imageList = [
        "gfx/Backgrounds/CityBackgroundCC01.png",
        "gfx/Backgrounds/CityTreesCC01.png",
        "gfx/Backgrounds/UpgradesBackgroundCC01.png",
        "gfx/Icons/UpgradeButonCC01.png",
        "gfx/Backgrounds/BannerCC01.png",
        "gfx/Backgrounds/MiniGameBackgroundCC01.png",
        "gfx/Icons/TextBubbleCC01.png",
        "gfx/Backgrounds/MiniGameBackgroundCC01.png",
        "gfx/Backgrounds/MiniGameStairsCC01.png",
        "gfx/Backgrounds/MiniGameFireFrontCC01.png",
        "gfx/Backgrounds/MiniGameFireBackCC01.png",
        "gfx/Backgrounds/MiniGameCloudBadCC01.png",
        "gfx/Backgrounds/MiniGameCloudGoodCC01.png",
        "gfx/Icons/MiniGameHandGoodCC01.png",
        "gfx/Icons/MiniGameHandBadCC01.png",
    ];
    this.humanList = [
        "gfx/Characters/CharacterCC01.png",
        "gfx/Characters/CharacterCC02.png",
        "gfx/Characters/CharacterCC03.png",
        "gfx/Characters/CharacterCC04.png",
    ];
    this.humanList2 = [
        ["gfx/Characters/sprite_CharacterCC011.png","gfx/Characters/sprite_CharacterCC012.png","gfx/Characters/sprite_CharacterCC013.png","gfx/Characters/sprite_CharacterCC014.png"],
        ["gfx/Characters/sprite_CharacterCC021.png","gfx/Characters/sprite_CharacterCC022.png","gfx/Characters/sprite_CharacterCC023.png","gfx/Characters/sprite_CharacterCC024.png"],
        ["gfx/Characters/sprite_CharacterCC031.png","gfx/Characters/sprite_CharacterCC032.png","gfx/Characters/sprite_CharacterCC033.png","gfx/Characters/sprite_CharacterCC034.png"],
        ["gfx/Characters/sprite_CharacterCC041.png","gfx/Characters/sprite_CharacterCC042.png","gfx/Characters/sprite_CharacterCC043.png","gfx/Characters/sprite_CharacterCC044.png"],
    ];
    this.img = {};
    this.loaded = 0;
    this.current = 0;
    this.data = {
        last: Date.now(),
        blood: 500,
        updates: {
            maxHumans: 0,
            humanSpawnTime: 0,
            particlesPerHuman: 0,
            bloodPerParticle: 0,
            critical: 0,
            autokill: 0,
            humanFarm: 0,
            satanicRitual: 0,
            rainingBlood: 0,
        },
        humanSpawn: 0,
        kills: 0,
        record: 0,
        bodies: 0,
        lastkill: Date.now(),
        judge: [0,0,0],
        kill: [0,0,0,0],
    };
    this.upgrades = {
        maxHumans: {
            title: "Superpopulation",
            base: 10,
            exp: 1.1,
            ord: 0,
            eval: this.getMaxHumans.bind(this),
            unit: "Humans",
        },
        humanSpawnTime: {
            title: "Doctors",
            base: 10,
            exp: 1.1,
            ord: 1,
            eval: this.getHumanSpawnTime.bind(this),
            unit: "ms",
        },
        critical: {
            title: "Coagulation",
            base: 50,
            exp: 1.07,
            ord: 2,
            eval: this.getCritical.bind(this),
            unit: "%",
        },
        particlesPerHuman: {
            title: "Polycythemia",
            base: 10,
            exp: 1.1,
            ord: 3,
            eval: this.getParticlesPerHuman.bind(this),
            unit: "Droplets",
        },
        bloodPerParticle: {
            title: "Leukocytosis",
            base: 10,
            exp: 1.1,
            ord: 4,
            eval: this.getBloodPerParticle.bind(this),
            unit: "Blood",
        },
        autokill: {
            title: "Sickness",
            base: 10,
            exp: 1.1,
            ord: 5,
            eval: this.getAutokill.bind(this),
            unit: "ms/kill",
        },
        humanFarm: {
            title: "Human farm",
            base: 10,
            exp: 1.1,
            ord: 6,
            eval: this.getHumanFarms.bind(this),
            unit: "Blood/s",
        },
        satanicRitual: {
            title: "Satanic Rituals",
            base: 10,
            exp: 1.1,
            ord: 7,
            eval: this.getSatanicRitual.bind(this),
            unit: "Blood/s",
        },
        rainingBlood: {
            title: "Raining blood",
            base: 10,
            exp: 1.1,
            ord: 8,
            eval: this.getRainingBlood.bind(this),
            unit: "Blood/s",
        },
    };
    this.humans = [];
    this.hqueue = [];
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
            img: "gfx/Icons/ButtonCityCC01.png",
            onclick: function () {
                this.moveTo("town");
            }.bind(this),
        },
        {
            x: this.width*0.1,
            y: this.height*0.0,
            w: this.width*0.1,
            h: this.height*0.1,
            img: "gfx/Icons/ButtonGameCC01.png",
            onclick: function () {
                this.moveTo("minigame");
            }.bind(this),
        },
        {
            x: this.width*0.2,
            y: this.height*0.0,
            w: this.width*0.1,
            h: this.height*0.1,
            img: "gfx/Icons/ButtonUpgradesCC01.png",
            onclick: function () {
                this.moveTo("upgrade");
            }.bind(this),
        },
        {
            x: this.width*0.7,
            y: this.height*0.0,
            w: this.width*0.1,
            h: this.height*0.1,
            img: "gfx/Icons/ButtonAchievementsCC01.png",
            onclick: function () {
                this.moveTo("achievement");
            }.bind(this),
        },
        {
            x: this.width*0.8,
            y: this.height*0.0,
            w: this.width*0.1,
            h: this.height*0.1,
            img: "gfx/Icons/ButtonCreditsCC01.png",
            onclick: function () {
                this.moveTo("credits");
            }.bind(this),
        },
        {
            x: this.width*0.9,
            y: this.height*0.0,
            w: this.width*0.1,
            h: this.height*0.1,
            img: "gfx/Icons/ButtonOptionsCC01.png",
            onclick: function () {
                this.moveTo("options");
            }.bind(this),
        },
    ];
    for (var i=0; i<this.menu.length; ++i) this.imageList.push(this.menu[i].img);
    for (var i=0; i<this.humanList.length; ++i) this.imageList.push(this.humanList[i]);
    for (var i=0; i<this.humanList2.length; ++i) {
        for (var j=0; j<this.humanList2[i].length; ++j) {
            this.imageList.push(this.humanList2[i][j]);
        }
    }
    this.particlesa = [];
    this.particlesb = [];
    this.ps = 4;
    this.mgb = [
        {
            x: 0,
            y: this.height*0.8,
            w: this.height*0.2,
            h: this.height*0.2,
            img: "gfx/Icons/MiniGameHandGoodCC01.png",
            onclick: function () {
                this.judge(true);
            }.bind(this),
        },{
            x: this.width-this.height*0.2,
            y: this.height*0.8,
            w: this.height*0.2,
            h: this.height*0.2,
            img: "gfx/Icons/MiniGameHandBadCC01.png",
            onclick:function () {
                this.judge(false);
            }.bind(this),
        }
    ];
    this.achievements = [
        {
            title: "First of many",
            cond: "Kill your first innocent",
            comment: "rando",
            eval: function () {
                return this.data.kills>0;
            }.bind(this),
            bonus: 2,
        },
        {
            title: "Open wound",
            cond: "Kill 10 innocents",
            comment: "rando",
            eval: function () {
                return this.data.kills>=10;
            }.bind(this),
            bonus: 2,
        },
        {
            title: "Mass murder",
            cond: "Kill 100 innocents",
            comment: "rando",
            eval: function () {
                return this.data.kills>=100;
            }.bind(this),
            bonus: 2,
        },
        {
            title: "Bloodbath",
            cond: "Kill 1000 innocents",
            comment: "rando",
            eval: function () {
                return this.data.kills>=1000;
            }.bind(this),
            bonus: 2,
        },
        {
            title: "The rivers will run red",
            cond: "Kill 10000 innocents",
            comment: "rando",
            eval: function () {
                return this.data.kills>=10000;
            }.bind(this),
            bonus: 2,
        },
        {
            title: "Genocide",
            cond: "Kill 100000 innocents",
            comment: "rando",
            eval: function () {
                return this.data.kills>=100000;
            }.bind(this),
            bonus: 2,
        },
        {
            title: "Red planet",
            cond: "Kill 1000000 innocents",
            comment: "rando",
            eval: function () {
                return this.data.kills>=1000000;
            }.bind(this),
            bonus: 2,
        },
        {
            title: "Friendly fire",
            cond: "Kill 10 metalheads",
            comment: "rando",
            eval: function () {
                return this.data.kill[1]>=10;
            }.bind(this),
            bonus: 2,
        },
        {
            title: "England’s finest",
            cond: "Kill 10 chavs",
            comment: "rando",
            eval: function () {
                return this.data.kill[3]>=10;
            }.bind(this),
            bonus: 2,
        },
        {
            title: "Deal with the devil",
            cond: "Kill 10 bussinessmen",
            comment: "rando",
            eval: function () {
                return this.data.kill[2]>=10;
            }.bind(this),
            bonus: 2,
        },
        {
            title: "Hip to be squashed",
            cond: "Kill 10 hipsters",
            comment: "rando",
            eval: function () {
                return this.data.kill[0]>=10;
            }.bind(this),
            bonus: 2,
        },
        {
            title: "Heaven",
            cond: "Send your first soul to heaven",
            comment: "rando",
            eval: function () {
                return this.data.judge[0]>0;
            }.bind(this),
            bonus: 2,
        },
        {
            title: "Hell",
            cond: "Send your first soul to hell",
            comment: "rando",
            eval: function () {
                return this.data.judge[1]>0;
            }.bind(this),
            bonus: 2,
        },
        {
            title: "Judge…",
            cond: "Judge correctly 10 people",
            comment: "rando",
            eval: function () {
                return this.data.judge[0]+this.data.judge[1]>=10;
            }.bind(this),
            bonus: 2,
        },
        {
            title: "Jury…",
            cond: "Judge correctly 100 people",
            comment: "rando",
            eval: function () {
                return this.data.judge[0]+this.data.judge[1]>=100;
            }.bind(this),
            bonus: 2,
        },
        {
            title: "And executor",
            cond: "Judge incorrectly 10 people",
            comment: "rando",
            eval: function () {
                return this.data.judge[2]>=10;
            }.bind(this),
            bonus: 2,
        },
    ];
}

Game.prototype.getMaxHumans = function (extra) {
    if (typeof extra == "undefined") extra = 0;
    return this.data.updates.maxHumans+extra+10;
}
Game.prototype.getHumanSpawnTime = function (extra) {
    if (typeof extra == "undefined") extra = 0;
    return (100/(this.data.updates.humanSpawnTime+extra+33))*1000;
}
Game.prototype.getParticlesPerHuman = function (extra) {
    if (typeof extra == "undefined") extra = 0;
    return this.data.updates.particlesPerHuman+extra+1;
}
Game.prototype.getBloodPerParticle = function (extra) {
    if (typeof extra == "undefined") extra = 0;
    return this.data.updates.bloodPerParticle+1+extra;
}
Game.prototype.getCritical = function (extra) {
    if (typeof extra == "undefined") extra = 0;
    return (this.data.updates.critical+extra)/100+(this.data.updates.critical+extra);
}
Game.prototype.getAutokill = function (extra) {
    if (typeof extra == "undefined") extra = 0;
    if (this.data.updates.autokill+extra==0) return Infinity;
    else return (200/(this.data.updates.autokill+extra+33))*1000;
}
Game.prototype.getHumanFarms = function (extra) {
    if (typeof extra == "undefined") extra = 0;
    return (this.data.updates.humanFarm+extra)*10;
}
Game.prototype.getSatanicRitual = function (extra) {
    if (typeof extra == "undefined") extra = 0;
    return (this.data.updates.satanicRitual+extra)*100;
}
Game.prototype.getRainingBlood = function (extra) {
    if (typeof extra == "undefined") extra = 0;
    return (this.data.updates.rainingBlood+extra)*1000;
}

Game.prototype.moveTo = function (target) {
    if (target == "upgrade") {
        this.overlay = target;
    } else if (target == "town") {
        this.overlay = "none";
        this.scene = target;
    } else if (target == "minigame") {
        this.overlay = "none";
        if (this.scene!=target) {
            this.scene = target;
            this.current = 0;
            this.hqueue = [];
        }
    }
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
    document.getElementsByTagName("div")[0].style.cursor="url('gfx/Cursor/CursorNormalCC01.png') 32 64, auto";
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
    document.getElementsByTagName("div")[0].style.cursor="url('gfx/Cursor/CursorClickedCC01.png') 32 64, auto";
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
    document.getElementsByTagName("div")[0].style.cursor="url('gfx/Cursor/CursorNormalCC01.png') 32 64, auto";
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
    } else {
        for (var i=0; i<this.menu.length; ++i) {
            if (inside(x,y,this.menu[i].x,this.menu[i].y,this.menu[i].w,this.menu[i].h)) {
                this.menu[i].onclick();
                return;
            }
        }
        if (this.scene == "town") {
            if (this.overlay=="upgrade") {
                // close overlay
                if (!inside(x,y,50,100,this.width-100,this.height-140)) {
                    this.overlay="none";
                    return;
                }
                if (this.overlay=="upgrade") {
                    var w = 3;
                    var h = 3;
                    for (var key in this.upgrades) {
                        if (this.upgrades.hasOwnProperty(key)) {
                            var x0=50+250*(this.upgrades[key].ord%w);
                            var y0=200+100*Math.floor(this.upgrades[key].ord/h);
                            if (inside(x,y,x0,y0,225,75)) {
                                this.buyUpgrade(key);
                                return;
                            }
                        }
                    }
                }
            } else {
                var w = 64;
                var h = 128;
                for (var i=this.humans.length-1; i>=0; --i) {
                    var cx = (this.humans[i].x * this.width)-w/2;
                    var cy = (this.humans[i].y * this.height)-h;
                    if (inside(x,y,cx,cy,w,h)) {
                        this.kill(this.humans.splice(i,1)[0]);
                        return;
                    }
                }
            }
        } else if (this.scene =="minigame") {
            if (this.overlay=="upgrade") {
                // close overlay
                if (!inside(x,y,50,100,this.width-100,this.height-140)) {
                    this.overlay="none";
                    return;
                }
                if (this.overlay=="upgrade") {
                    var w = 3;
                    var h = 3;
                    for (var key in this.upgrades) {
                        if (this.upgrades.hasOwnProperty(key)) {
                            var x0=50+250*(this.upgrades[key].ord%w);
                            var y0=200+100*Math.floor(this.upgrades[key].ord/h);
                            if (inside(x,y,x0,y0,225,75)) {
                                this.buyUpgrade(key);
                                return;
                            }
                        }
                    }
                }
            } else {
                for (var i=0; i<this.mgb.length; ++i) {
                    if (inside(x,y,this.mgb[i].x,this.mgb[i].y,this.mgb[i].w,this.mgb[i].h)) {
                        this.mgb[i].onclick();
                        return;
                    }
                } 
            }
        }
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
        this.ctx.drawImage(this.img[this.imageList[0]].img,0,0,this.width,this.height);
        /*this.ctx.fillStyle = "red";
        this.ctx.fillRect(0, this.height*0.64, this.width, this.height*0.2);*/
        var w = 64;
        var h = 128;
        for (var i=0; i<this.humans.length; ++i) {
            var sid = Math.floor((Date.now()+this.humans[i].y*100)/100)%this.humanList2[this.humans[i].type].length;
            if (this.humans[i].dir==-1) {
                this.ctx.save();
                this.ctx.scale(-1,1);
                this.ctx.translate(-this.width,0);
                var x = this.width - (this.humans[i].x * this.width)-w/2;
                var y = (this.humans[i].y * this.height)-h;
                this.ctx.drawImage(this.img[this.humanList2[this.humans[i].type][sid]].img,x,y,w,h);
                this.ctx.restore();
            } else {
                var x = (this.humans[i].x * this.width)-w/2;
                var y = (this.humans[i].y * this.height)-h;
                this.ctx.drawImage(this.img[this.humanList2[this.humans[i].type][sid]].img,x,y,w,h);
            }
        }
        this.drawParticles(this.particlesa);
        this.ctx.drawImage(this.img[this.imageList[1]].img,0,0,this.width,this.height);
        this.drawHeader();
        this.drawParticles(this.particlesb);
        this.drawOverlay();
    } else if (this.scene == "minigame") {
        this.ctx.drawImage(this.img["gfx/Backgrounds/MiniGameBackgroundCC01.png"].img,0,0,this.width,this.height);
        this.ctx.drawImage(this.img["gfx/Backgrounds/MiniGameStairsCC01.png"].img,0,0,this.width,this.height);
        this.ctx.drawImage(this.img["gfx/Backgrounds/MiniGameFireBackCC01.png"].img,0,0,this.width,this.height);
        this.drawHeader();
        for (var i=this.hqueue.length-1; i>=0; --i) {
            var h = map(this.hqueue[i].y,150,450,64,256);
            if (this.hqueue[i].y>450) h = 256;
            var w = h/2;
            var x = this.width/2-w/2+this.hqueue[i].x;
            var y = this.hqueue[i].y-h;
            this.ctx.drawImage(
                this.img[this.humanList[this.hqueue[i].type]].img,
                x,y,w,h
            );
            if (this.hqueue[i].y<=450) {
                var factor = map(this.hqueue[i].y,150,450,0.25,1);
                var bw = factor*300;
                var bh = factor*150;
                var bx = 0;
                var by = y-h*0.2;
                this.ctx.save();
                if (this.hqueue[i].side==0) {
                    bx = x+w+10;
                    this.ctx.translate(bx+300*factor,by);
                    this.ctx.scale(-factor,factor);
                } else {
                    bx = x-10-bw;
                    this.ctx.translate(bx,by);
                    this.ctx.scale(factor,factor);
                }
                this.ctx.drawImage(this.img["gfx/Icons/TextBubbleCC01.png"].img,0,0,300,150);
                if (this.hqueue[i].side==0) {
                    this.ctx.scale(-1,1);
                    this.ctx.translate(-300,0);
                }
                placeTextInside(this.ctx,300*0.2,150*0.2,300*0.6,150*0.6,phrases[this.hqueue[i].text]);
                this.ctx.restore();
            }
        }
        this.ctx.font = "20px GameFont";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "left";
        this.ctx.textBaseLine = "bottom";
        this.ctx.fillText("Current: "+this.current.toString(),30,100);
        this.ctx.fillText("Record: "+this.data.record.toString(),30,140);
        for (var i=0; i<this.mgb.length; ++i) {
            this.ctx.drawImage(this.img[this.mgb[i].img].img,this.mgb[i].x,this.mgb[i].y,this.mgb[i].w,this.mgb[i].h);
        }
        this.ctx.drawImage(this.img["gfx/Backgrounds/MiniGameFireFrontCC01.png"].img,0,0,this.width,this.height);
        this.drawOverlay();
    }
}

Game.prototype.drawOverlay = function () {
    if (this.overlay=="upgrade") {
        this.ctx.drawImage(this.img["gfx/Backgrounds/UpgradesBackgroundCC01.png"].img,25,100,this.width-50,this.height-140);
        if (this.overlay=="upgrade") {
            var w=3;
            var h=3;
            for (var key in this.upgrades) {
                if (this.upgrades.hasOwnProperty(key)) {
                    var x=this.upgrades[key].ord%w;
                    var y=Math.floor(this.upgrades[key].ord/h);
                    /*this.ctx.fillStyle="black";
                    this.ctx.fillRect(50+250*x,200+100*y,200,75);*/
                    this.ctx.drawImage(this.img["gfx/Icons/UpgradeButonCC01.png"].img,50+250*x,200+100*y,225,75);
                    this.ctx.fillStyle="black";
                    this.ctx.strokeStyle="red";
                    this.ctx.font = "12px GameFont";
                    this.ctx.textAlign = "center";
                    this.ctx.textBaseLine = "bottom";
                    this.ctx.strokeText(this.upgrades[key].title,140+250*x,220+100*y)
                    this.ctx.fillText(this.upgrades[key].title,140+250*x,220+100*y)
                    this.ctx.fillStyle="white";
                    this.ctx.fillText(this.data.updates[key].toString(),252+250*x,245+100*y)
                    var price = this.calcPrice(this.data.updates[key],this.upgrades[key].base,this.upgrades[key].exp);
                    if (price>this.data.blood) {
                        this.ctx.fillStyle="black";
                        this.ctx.fillText(this.bloodToText(price),140+250*x,245+100*y);
                        this.ctx.fillStyle="white";
                    } else {
                        this.ctx.fillText(this.bloodToText(price),140+250*x,245+100*y);
                    }
                    this.ctx.fillText(this.fix(this.upgrades[key].eval())+"->"+this.fix(this.upgrades[key].eval(1))+" "+this.upgrades[key].unit,
                            140+250*x,267+100*y)
                }
            }
        }
    }
}

Game.prototype.calcPrice = function (lvl,base,exp) {
    return Math.round(Math.pow(base,Math.pow(exp,lvl)));
}

Game.prototype.bloodToText = function (amount) {
    var exp = 0;
    if (amount>0) {
        exp = Math.floor(getBaseLog(1000,amount));
    }
    if (exp==0) {
        return Math.round(amount).toString()+" "+this.units[exp];
    } else {
        return (amount/Math.pow(1000,exp)).toFixed(1).toString()+" "+this.units[Math.floor(exp)];
    }
}

Game.prototype.drawHeader = function () {
    if (this.overlay!="none") {
        this.ctx.fillStyle="rgba(255,120,120,0.5)"
        this.ctx.fillRect(0,0,this.width,this.height);
    }
    /*this.ctx.fillStyle="black";
    this.ctx.fillRect(this.width*0.3,this.height*0.0,this.width*0.4,this.height*0.1);*/
    this.ctx.drawImage(this.img["gfx/Backgrounds/BannerCC01.png"].img,0,0,this.width,128);
    this.ctx.font = "20px GameFont";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    this.ctx.textBaseLine = "middle";
    this.ctx.fillText(this.bloodToText(this.data.blood),this.width/2,this.height*0.065-5);
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
        if (this.scene=="town") {
            
        } else if (this.scene=="minigame") {
            this.updateMinigame();
        }
        this.updateHumans(now);
        this.updateParticles();
        if (this.data.last<now) {
            this.advanceTo(now);
        }
    }
}

Game.prototype.updateHumans = function (now) { 
    if (this.humans.length<this.getMaxHumans() && this.data.humanSpawn<now) {
        this.spawnHuman();
        this.data.humanSpawn = now + this.getHumanSpawnTime();
    }
    for (var i=this.humans.length-1; i>=0; --i) {
        this.humans[i].x += this.humans[i].dir * this.humans[i].speed;
        if ((this.humans[i].dir==-1 && this.humans[i].x<-0.2) || (this.humans[i].dir==1 && this.humans[i].x>1.2)) {
            this.humans.splice(i,1);
        }
    }
}

Game.prototype.updateMinigame = function () {
    if ((this.hqueue.length!=0 && this.hqueue[this.hqueue.length-1].y>200 && this.data.bodies>0) || (this.hqueue.length==0 && this.data.bodies>0)) {
        this.hqueue.push({
            y:150,
            x: map(Math.random(),0,1,-20,20),
            text: randomInt(0,phrases.length/2)*2,
            type: randomInt(0,this.humanList.length),
            side: ((this.hqueue.length==0)?0:(this.hqueue[this.hqueue.length-1].side+1)%2),
        });
        --this.data.bodies;
    }

    for (var i=this.hqueue.length-1; i>=0; --i) {
        if (this.hqueue[i].y<450) {
            this.hqueue[i].y+=map(this.hqueue[i].y,150,450,0.8,1.6)*(1-1/(this.current/50+1.5));
        } else if (this.hqueue[i].y<this.height+256) {
            this.hqueue[i].y+=(this.hqueue[i].y-400)*0.02;
        } else {
            this.current = 0;
            this.hqueue = [];
            //this.hqueue.splice(i,1);
        }
    }
}

Game.prototype.advanceTo = function (timestamp) {
    var delta = timestamp - this.data.last;
    this.data.last = timestamp;
    this.data.blood += ((this.getHumanFarms()+this.getSatanicRitual()+this.getRainingBlood())*this.getRecordMul()*(delta/1000));
    var delta2 = timestamp - this.data.lastkill;
    var extra = delta2%this.getAutokill();
    var times = Math.floor(delta2/this.getAutokill());
    if (times>=2) {
        this.data.lastkill = timestamp - extra;
        this.data.blood += times * this.getParticlesPerHuman() * this.getBloodPerParticle() * this.getRecordMul();
        this.data.kills+=times;
        this.data.bodies+=times;
    } else if (times>=1 && this.humans.length>0) {
        this.data.lastkill = timestamp - extra;
        this.kill(this.humans.splice(randomInt(0,this.humans.length),1)[0]);
    }
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(this.data), this.secret).toString();
    localStorage.setItem("data",encrypted);
}

Game.prototype.getRecordMul = function () {
    return 1;
}

Game.prototype.updateParticles = function () {
    var speed = 0.09;
    var tx = 400;
    var ty = 30;
    var now = Date.now();
    for (var i=this.particlesa.length-1; i>=0; --i) {
        this.particlesa[i].vx += this.particlesa[i].ax*speed;
        this.particlesa[i].vy += this.particlesa[i].ay*speed;
        this.particlesa[i].x += this.particlesa[i].vx*speed;
        this.particlesa[i].y += this.particlesa[i].vy*speed;
        if (this.particlesa[i].y>this.particlesa[i].my) {
            var part = this.particlesa.splice(i,1)[0];
            this.particlesb.push(part);
        }
    }
    for (var i=this.particlesb.length-1; i>=0; --i) {
        var alpha = (now-this.particlesb[i].now)/1500;
        var dist = dist2d(this.particlesb[i].x,this.particlesb[i].y,tx,ty);
        if (dist>10) {
            this.particlesb[i].x += (tx-this.particlesb[i].x+this.particlesb[i].vx)/dist*alpha;
            this.particlesb[i].y += (ty-this.particlesb[i].y)/dist*alpha;
        } else {
            this.data.blood+=this.getBloodPerParticle()*this.getRecordMul();
            this.particlesb.splice(i,1)[0];
        }
    }
}

Game.prototype.spawnHuman = function () {
    var human = {
        x: ((Math.random()<0.5)?-0.2:1.2),
        y: map(Math.random(),0,1,0.64,0.84),
        type: randomInt(0,this.humanList.length),
        speed: map(Math.random(),0,1,0.001,0.003),
        dir: 0,
    }
    human.dir = (human.x==-0.2)?1:-1;
    this.humans.push(human);
    this.humans.sort(function (a, b) {
        if (a.y > b.y) {
            return 1;
        }
        if (a.y < b.y) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });
}

Game.prototype.kill = function (dead) {
    var h = 128;
    var x = (dead.x * this.width);
    var y = (dead.y * this.height)-h/2;
    var miny = (dead.y * this.height)-h/4;
    var maxy = (dead.y * this.height)+h/4;
    var now = Date.now();
    var crit = 1;
    ++this.data.kill[dead.type];
    this.data.kills+=1;
    this.data.bodies+=1;
    if (Math.random()<this.getCritical()/100) crit=3;
    for (var i=0; i<this.getParticlesPerHuman()*crit; ++i) {
        var part = {
            x: x,
            y: y,
            vx: map(Math.random(),0,1,-10,10),
            vy: map(Math.random(),0,1,-10,10),
            my: map(Math.random(),0,1,miny,maxy),
            ax: 0,
            ay: 10,
            now: now,
        }
        this.particlesa.push(part);
    }
}

Game.prototype.drawParticles = function (particles) {
    this.ctx.fillStyle = "red";
    for (var i=particles.length-1; i>=0; --i) {
        this.ctx.fillRect(particles[i].x,particles[i].y,this.ps,this.ps);
    }
}

Game.prototype.buyUpgrade = function (key) {
    var price = this.calcPrice(this.data.updates[key],this.upgrades[key].base,this.upgrades[key].exp);
    if (this.data.blood>=price) {
        if (key == "autokill" && this.data.updates[key]==0) this.data.lastkill=Date.now();
        this.data.blood-=price;
        this.data.updates[key]+=1;
    }
}

Game.prototype.fix = function (val) {
    if (val==Math.floor(val)) return val.toString();
    else return val.toFixed(1);
}

Game.prototype.judge = function (val) {
    if (this.hqueue.length!=0 && this.hqueue[0].y<450) {
        var target = phrases[this.hqueue[0].text+1];
        if (val==true) {
            if (target==0) {
                this.current = 0;
                ++this.data.judge[2];
            } else {
                ++this.data.judge[0];
                ++this.current;
                if (this.current>this.data.record) {
                    this.data.record = this.current;
                }
            }
        } else {
            if (target==2) {
                ++this.data.judge[2];
                this.current = 0;
            } else {
                ++this.data.judge[1];
                ++this.current;
                if (this.current>this.data.record) {
                    this.data.record = this.current;
                }
            }
        }
        this.hqueue.splice(0,1);
    }
}