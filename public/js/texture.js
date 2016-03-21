var Texture = {
	
	maxTextures: 0,
	loadedTextures: 0,
	map: new Array(),
	initTextures: function ()
	{
		Texture.addTexture("desk","assets/img/desk.png");
		Texture.addTexture("barcode","assets/img/barcode.png");
<<<<<<< HEAD
		Texture.addTexture("sky_day","assets/img/sky_day.png");
        Texture.addTexture("prescription","assets/img/prescription.png");
        Texture.addTexture("note","assets/img/note.png");
        Texture.addTexture("noteoff","assets/img/noteoff.png");
=======
		Texture.addTexture("background","assets/img/background.png");
		Texture.addTexture("cabinet","assets/img/cabinet.png");
		Texture.addTexture("backArrow","assets/img/back.png");
>>>>>>> origin/master
	},
	
	addTexture: function(name,source)
	{
		this.maxTextures+=1;
		
		var img = new Image();
		
		var capt = this;
		
		img.onload = function()
		{
			capt.textureLoaded(img, name);
		};
		
		img.onerror = function()
		{
			console.log("Failed to load texture " + name + " from "+ source);
			capt.textureFailedToLoad(name);
		};
		
		img.src = source;
	},
	


	textureLoaded: function(image, name)
	{
		Texture.map[name] = image;
		Texture.loadedTextures++;
	},
	textureFailedToLoad: function(name)
	{
		Texture.map[name] = null;
		Texture.loadedTextures++;
	}
}

AssetLoadFunctions.push(function()
{
	return (Texture.loadedTextures == Texture.maxTextures);
});
