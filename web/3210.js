function onFileSelected(event) {
  var selectedFile = event.target.files[0];
  var reader = new FileReader();

  var temp = document.createElement("img");
  var imgtag = document.getElementById("original");
  var pixelImg = document.getElementById("img1999");
  imgtag.title = selectedFile.name;

  reader.onload = function(event) {
    temp.src = event.target.result;
    processImage(temp, imgtag, imgtag.parentNode.scrollWidth, imgtag.parentNode.scrollHeight, 1, true);
	processImage(temp, pixelImg, pixelImg.parentNode.scrollWidth, pixelImg.parentNode.scrollHeight, 5, false);
  };
  
  reader.readAsDataURL(selectedFile);
}

function processImage(src, dest, w, h, scale, smooth) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
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

	canvas.width = src.width * ratio
	canvas.height = src.height * ratio;
    ctx.drawImage(src, 0, 0, canvas.width, canvas.height);
    
    dest.src = canvas.toDataURL();
    
    if (scale > 1) {	    
	    canvas.width *= scale;
	    canvas.height *= scale;
	    ctx.drawImage(dest, 0, 0, dest.width, dest.height, 0, 0, canvas.width, canvas.height);
	}
    
    dest.src = canvas.toDataURL();
}