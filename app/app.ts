const canvas: HTMLCanvasElement = 
    document.getElementById("spriteEditor") as HTMLCanvasElement;
if (canvas) {
    const ctx = canvas.getContext("2d");
}

requestAnimationFrame(_global_update)
canvas.addEventListener("mousemove", _mouse_update);
canvas.addEventListener("mousedown", function(e){mouseDown = true;mouseButton = e.button;});
canvas.addEventListener("mouseup", function(e){mouseDown = false});

var mouseX: number;
var mouseY: number;
var mouseDown: boolean;
var mouseTimer: number = 0;
var mouseButton: number;

function _mouse_update(e: MouseEvent) {
    mouseX = e.pageX;
    mouseY = e.pageY;
}

function _global_update() {
    if (mouseDown) {
        mouseTimer++;
    } else {
        mouseTimer = 0;
    }
    requestAnimationFrame(_global_update);
}

function region_has_point(
x1: number, y1: number, x2: number, y2: number, xv: number, yv: number) {
    var xbtwn = clamp(xv, x1, x2) == xv;
    var ybtwn = clamp(yv, y1, y2) == yv;
    return xbtwn && ybtwn;
}

function box_has_point(x: number, y: number, h: number, w: number, xv: number, yv: number) {
    return region_has_point(x,y,x+w,y+h,xv,yv);
}

function clamp(v: number, min: number, max: number) {
    return Math.min(Math.max(v,min),max);
}