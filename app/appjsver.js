const canvas = document.getElementById("spriteEditor");
const ctx= canvas.getContext("2d");
ctx.fillRect(0, 0, 100, 100)

canvas.addEventListener("mousemove", _mouse_update);
canvas.addEventListener("mousedown", function(e){mouseDown = true;mouseButton = e.button;});
canvas.addEventListener("mouseup", function(e){mouseDown = false});

var mouseX;
var mouseY;
var mouseDown;
var mouseTimer = 0;
var mouseButton;

function _mouse_update(e) {
    mouseX, mouseY = e.pageX, e.pageY;

    if (mouseDown) {
        mouseTimer++;
    } else {
        mouseTimer = 0;
    }
    var in_canvas = box_has_point(
        0, 0,
        512, 512,
        mouseX, mouseY
    );
    if (in_canvas) {
        if (mouseTimer > 0 && mouseButton == 1) {
            ctx.fillRect(mouseX, mouseY, 1, 1)
        }
    }
}

function region_has_point(
x1, y1, x2, y2, xv, yv) {
    var xbtwn = clamp(xv, x1, x2) == xv;
    var ybtwn = clamp(yv, y1, y2) == yv;
    return xbtwn && ybtwn;
}

function box_has_point(x, y, h, w, xv, yv) {
    return region_has_point(x,y,x+w,y+h,xv,yv);
}

function clamp(v, min, max) {
    return Math.min(Math.max(v,min),max);
}