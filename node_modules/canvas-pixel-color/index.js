function canvasPixelColor(ev, context) {
  var x = ev.offsetX || ev.layerX;
  var y = ev.offsetY || ev.layerY;
  var data = context.getImageData(x, y, 1, 1).data;
  var r = data[0];
  var g = data[1];
  var b = data[2];
  var a = data[3];

  return {
    hex: rgbToHex(r, g, b),
    rgba: [r,g,b,a]
  }
}

function rgbToHex(r, g, b) {
  return "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1);
}

module.exports = canvasPixelColor;