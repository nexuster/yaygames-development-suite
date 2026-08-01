const canvas = document.getElementById("spriteEditor");
const ctx= canvas.getContext("2d");
ctx.fillRect(1, 1, 1, 1)

canvas.addEventListener("mousemove", _mouse_update);
canvas.addEventListener("mousedown", (e) => {
        mouseDown = true;mouseButton = e.button;
});
canvas.addEventListener("mouseup", (e) => {mouseDown = false});

var mouseX;
var mouseY;
var mouseDown;
var mouseTimer = 0;
var mouseButton;

var scale = 8/512;

var selected_color = 1;
var gfx = {
  colors: ["#000000", "#5870da", "#5627ae", "#15156e"],
  pixels: "16"
};
_setup_color_buttons()
var size = 0
size = Number("0x"+gfx.pixels.slice(0,2));
gfx.pixels = gfx.pixels+"0".repeat(size*size)

_update_canvas();
function _update_canvas() {
    
    canvas.width = size
    canvas.height = size
    scale = size/512
    const pixels = Array.from(gfx.pixels.padEnd(size*size, "0"), Number);
    for (let i = 0; i < pixels.length; i++) {
        const v = pixels[i+2];
        const x = i % size;
        const y = Math.floor(i / size);

        ctx.fillStyle = gfx.colors[v] || gfx.colors[0];
        ctx.fillRect(x, y, 1, 1);
    }
}

ctx.imageSmoothingEnabled = false;

function _mouse_update(e) {
    const rect = canvas.getBoundingClientRect();
    
    const x = (e.clientX - rect.left);
    const y = (e.clientY - rect.top);
    if (mouseDown) {
        mouseTimer++
    } else {
        mouseTimer = 0
    }
    if (mouseTimer > 0) {
        var px = Math.floor(x*scale);
        var py = Math.floor(y*scale);
        var index = px+(py*size);
        gfx.pixels = set_pixel(index);
        _update_canvas();
    }
}

function _setup_color_buttons() {
    var editor_div = document.getElementsByClassName("color");
    var div_children = [...editor_div];
    for (let i = 0; i < div_children.length; i++) {
        const v = div_children[i];
        v.style.backgroundColor = gfx.colors[i];
        v.addEventListener("click",(e) => {
            selected_color = Number(e.target.id.charAt(1))-1;
        });
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

function set_pixel(index, color = selected_color) {
    var pixelArray = Array.from(gfx.pixels)
    pixelArray[index+2] = color
    var newPixelString = pixelArray.join("")
    return newPixelString
}