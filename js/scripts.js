var canvasPixelColor = require("canvas-pixel-color");

var spaces = "&nbsp;&nbsp;&nbsp;";
var dropbox, cvs, ctx, listener;

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("paste", paste, false);

dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("dragleave", dragleave, false);
dropbox.addEventListener("drop", drop, false);

canvasInit();

cvs.addEventListener("click", function(ev) {
	if (listener == true) {
	  var hex = canvasPixelColor(ev, ctx)["hex"].toUpperCase();
	  var rgba = canvasPixelColor(ev, ctx)["rgba"];
	  if (rgba[3] == 0) {
			document.getElementById("reply").innerHTML = "<span class=\"hex\">It is transparent.</span><br/>R: " + rgba[0] + spaces + "B: " + rgba[1] + spaces + "G: " + rgba[2] + spaces + "A: " + rgba[3];
	  } 
    else {
	  	document.getElementById("reply").innerHTML = "<span class=\"hex\">It is <span style=\"color:" + hex + "\">" + hex + "</span></span>.<br/>R: " + rgba[0] + spaces + "B: " + rgba[1] + spaces + "G: " + rgba[2] + spaces + "A: " + rgba[3];
	  }
	}
}, false)

function canvasInit() {
	cvs = document.getElementById("canvas");
	ctx = cvs.getContext("2d");
	listener = false;
}

function dragenter(e) {
  document.getElementById("intro").className = document.getElementById("intro").className.replace(/(?:^|\s)introMsg(?!\S)/g, 'uploadMsg');
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragleave(e) {
  document.getElementById("intro").className = document.getElementById("intro").className.replace(/(?:^|\s)uploadMsg(?!\S)/g, 'introMsg');
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;

  document.getElementById("intro").style.display = "none";
  document.getElementById("reply").innerHTML = "";
  dropFile(files);
}

function paste(e) {
  e.stopPropagation();
  e.preventDefault();

  var cd = e.clipboardData;

  document.getElementById("intro").style.display = "none";
  document.getElementById("reply").innerHTML = "";
  pasteFile(cd);
}

function dropFile(files) {
  var imageType = /^image\//;
  
  if (!imageType.test(files[0].type))
  	invalidMsg();
  else
		createImage(files[0]);
}

function pasteFile(files) {
  var imageType = /^image\//;
  var textType = /^text\//;

  if (textType.test(files.types))
    invalidMsg();
  else if (!imageType.test(files.items[0].getAsFile().type))
    invalidMsg();
  else
    createImage(files.items[0].getAsFile());
}

function createImage(image) {
  var img = document.createElement("img");
  img.src = window.URL.createObjectURL(image);
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    listener = true;
    window.URL.revokeObjectURL(this.src);
  }
}

function invalidMsg() {
  canvas.width, canvas.height = 0;
  document.getElementById("reply").innerHTML = "<span class=\"hex\">This is not a valid image file.</span>";
}