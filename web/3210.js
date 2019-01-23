function onFileSelected(event) {
  var selectedFile = event.target.files[0];
  var reader = new FileReader();

  var temp = document.createElement("img");
  var imgtag = document.getElementById("original");
  var pixelImg = document.getElementById("img1999");
  imgtag.title = selectedFile.name;

  reader.onload = function(event) {
	temp.onload = function() {
    	processImage(temp, imgtag, imgtag.parentNode.scrollWidth, imgtag.parentNode.scrollHeight, 1, true);
		processImage(temp, pixelImg, pixelImg.parentNode.scrollWidth, pixelImg.parentNode.scrollHeight, 4, false);
	}
	temp.src = event.target.result;
};
  
  reader.readAsDataURL(selectedFile);
  
}

function processImage(src, dest, w, h, scale, smooth) {
	var canvas = document.createElement("canvas");
	var canvasScaled = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var ctxScaled = canvasScaled.getContext("2d");
    ctx.mozImageSmoothingEnabled = smooth;
	ctx.webkitImageSmoothingEnabled = smooth;
	ctx.imageSmoothingEnabled = smooth;

	var ratioW = 1, ratioH = 1;
	w /= scale;
	h /= scale;

	if(src.width > w)
		ratioW = w / src.width;
	if(src.height > h)
		ratioH = h / src.height;

	var ratio = ratioW > ratioH ? ratioH : ratioW;

	canvas.width = src.width * ratio;
	canvas.height = src.height * ratio;
    ctx.drawImage(src, 0, 0, canvas.width, canvas.height);
	
	if(scale != 1) {
    	canvasScaled.width = canvas.width * scale;
		canvasScaled.height = canvas.height * scale;
		ctxScaled.drawImage(canvas, 0, 0, w, h, 0, 0, canvasScaled.width, canvasScaled.height);
	} else {
		canvasScaled = canvas;
	}
	dest.src = canvasScaled.toDataURL();
}