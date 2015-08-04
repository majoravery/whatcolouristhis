# Canvas-pixel-color

[![NPM](https://nodei.co/npm/canvas-pixel-color.png?downloads=true)](https://npmjs.org/package/canvas-pixel-color)

pass an event and canvas context and get back rgba and hex data.

## Usage
``` javascript
var canvasPixelColor = require('canvas-pixel-color');
var cvs = document.getElementById('myCanvas');
var ctx = cvs.getContext('2d');

cvs.addEventListener('mousemove', function(ev) {
  // returns {
  //   hex: ##ff0beb,
  //   rgba: [255, 11, 235, 115] // this is an actual Array
  // }
  console.log(canvasPixelColor(ev, ctx));
});

```

## Info
This is basically just pulled from [canvas-color-picker](https://github.com/JamesKyburz/canvas-colorpicker).
With some slight changes.

## License
(same as original project's) MIT License
