function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
      
    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

function inside(x,y,x0,y0,w,h) {
    return x>=x0 && x<=x0+w && y>=y0 && y<=y0+h;
}

function map(val,min,max,a,b) {
    return (val-min)/(max-min)*(b-a)+a;
}

function randomInt(a,b) {
    return Math.floor(Math.random()*(b-a)+a);
}

function dist2d(x,y,x0,y0) {
    return Math.sqrt((x-x0)*(x-x0)+(y-y0)*(y-y0));
}