
var canvas = document.getElementById("gCanvas");
var context = canvas.getContext("2d");

/* Stores true if the window was resized during/after the last step */
var resizing = false;

/* The size canvas should be resized to. Doesn't contain actual window size */
var resizeToWidth = 0;
var resizeToHeight = 0;

/** Holds the camera screen size, not the window size **/
var screenSize = new Vector2(0,0);

/** Scale from WindowSize --> CanvasSize **/
var windowScale = 1.0;

// Scale from WindowSize --> ScreenSize
var winXScale = 1.0;
var winYScale = 1.0;

/** Scale from CanvasSize --> ScreenSize **/
var gameScreenScale = 1.0;

function CanvasResize()
{
	resizeToWidth = window.innerWidth;
	resizeToHeight = window.innerHeight;
	var scale = 1.0;
	if (resizeToWidth > 1920)
		scale = resizeToWidth / 1920;
	
	resizeToWidth /= scale;
	resizeToHeight /= scale;
	
	windowScale = scale;
	
	resizing = true;
}


function UpdateScreenSize()
{
	canvas.width = resizeToWidth;
	canvas.height = resizeToHeight;
	
	resizing = false;
	var size = new Vector2(canvas.width, canvas.height);
	
	var minSize = new Vector2(480, 480);
	
	var scale = 1;
	
	if (size.x < minSize.x)
		scale = size.x/minSize.x;
	
	if (size.y < minSize.y)
	{
		var tScale = size.y/minSize.y;
		if (tScale < scale)
		{
			scale = tScale;
			if ((size.x/scale) > 1920)
				scale = size.x/1920;
		}
		
	}
	
	screenSize.x = size.x/scale;
	screenSize.y = size.y/scale;
	
	winXScale = scale*windowScale;
	winYScale = scale*windowScale;
	gameScreenScale = scale;
}

function CanvasInitialSize()
{
	CanvasResize();
	UpdateScreenSize();
}
function CanvasDraw()
{
	if (resizing)
	{
		UpdateScreenSize();
	}
	
	
	Input.update(winXScale, winYScale);
	Engine.update();
	
	context.fillStyle = "#111811";
	context.save();
	context.scale(gameScreenScale,gameScreenScale);

	GameLogic.step();

	Engine.draw(context);

	context.restore();

	
}


var fun = function()
{
	for (var i = 0; i < AssetLoadFunctions.length;)
	{
		if (AssetLoadFunctions[i]() == false)
		{
			setTimeout(fun, 50);
			return;
		}
		//else
		//remove the first element;
		AssetLoadFunctions.splice(0,1);
	}
	Engine.init();
	
	setInterval(CanvasDraw,15);
};

CanvasInitialSize();

Input.init(canvas);
//Loads textures
Persons.initPersons();

RadioButtons.generateButtons();

RadioButtons.reSize();
//creates new person
MyAudio.loadMusic();

window.addEventListener("resize", CanvasResize, false);
CanvasResize();

Texture.initTextures();	
InitRandomNames();

fun();
