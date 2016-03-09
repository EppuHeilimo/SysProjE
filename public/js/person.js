var Persons = {    
    hatids : 0,
    bodyids : 0,
    faceids : 0,
    personids : 0,
	hatscount : 4,
	facescount : 6,
	bodiescount : 3,
	allPersons : [],
    Hats : [],
    Bodies : [],
    Faces : [],
	Queue : [],
	
	update : function()
	{
		
	},
		
	addAllHatTextures : function()
	{
		var test = 1;
		var count = 0;
		for(count = 0; count < this.hatscount; count++)
		{
			test = Texture.addTexture("hat" + count, "assets/img/hat" + count + ".png");
			this.Hats.push(new Hat("hat" + count, "assets/img/hat" + count + ".png"));
		}
	},
	
	addAllFaceTextures : function()
	{
		var test = 1;
		var count = 0;
		for(count = 0; count < this.facescount; count++) 
		{
			test = Texture.addTexture("head" + count, "assets/img/head" + count + ".png");
			this.Faces.push(new Face("head" + count, "assets/img/head" + count + ".png"));
		}
	},
	
	addAllBodyTextures : function()
	{
		var test = 1;
		var count = 0;
		for(count = 0; count < this.bodiescount; count++)
		{
			test = Texture.addTexture("body" + count, "assets/img/body" + count + ".png");
			this.Bodies.push(new Body("body" + count, "assets/img/body" + count + ".png"));
		}
	},
    
	addTexture : function(name,source)
	{
		var img = new Image();
		img.onload = function()
		{
			Texture.textureLoaded(img, name);
			img.src = source;
		};
		
		img.onerror = function()
		{
			console.log("Failed to load texture " + name + " from "+ source);
		};
		img.src = source;
		return 1;

	},
	
	
	initPersons : function()
	{
		this.addAllHatTextures();
		this.addAllBodyTextures();
		this.addAllFaceTextures();
	},
	
    getRandomHat : function()
    {
        var item = this.Hats[Math.floor(Math.random()*this.Hats.length)];
        return item;
    },
    getRandomBody : function()
    {
        var item = this.Bodies[Math.floor(Math.random()*this.Bodies.length)];
        return item;
    },
    getRandomFace : function()
    {
        var item = this.Faces[Math.floor(Math.random()*this.Faces.length)];
        return item;
    },
	
	addPersonToLine : function()
	{
		this.allPersons.push(new Person());
	},
	
	renderAllPersons : function() 
	{
		for(var i = 0; i < this.allPersons.length; i++)
		{
			this.allPersons[i].render(100, 100);
		}
	}
}

function Hat(img){this.id = Persons.hatids++; this.name = img;};
function Body(img){this.id = Persons.bodyids++; this.name = img;};
function Face(img){this.id = Persons.faceids++; this.name = img;};


function Person()
{
	GameObject.call(this);
	//TODO: find positions for the parts
	this.hatoffset = new Vector2(-10, -70);
	this.bodyoffset = new Vector2(0, 0);
	this.faceoffset = new Vector2(30, 0);
	this.position = new Vector2(1000, 500);
	this.sizehat = new Vector2(120, 170);
	this.sizeface = new Vector2(130, 170);
	this.sizebody = new Vector2(200, 300);
	
	this.hat = Persons.getRandomHat();
	this.face = Persons.getRandomFace(); 
	this.body = Persons.getRandomBody();
	this.id = Persons.personids++;
	this.render = function(x, y)
	{	
		context.drawImage(Texture.map[this.body.name], this.position.x + this.bodyoffset.x, this.position.y + this.bodyoffset.y, this.sizebody.x, this.sizebody.y);
		context.drawImage(Texture.map[this.face.name], this.position.x + this.faceoffset.x, this.position.y + this.faceoffset.y, this.sizeface.x, this.sizeface.y);
		context.drawImage(Texture.map[this.hat.name], this.position.x + this.hatoffset.x, this.position.y + this.hatoffset.y, this.sizebody.x, this.sizebody.y);
	}
};

Person.prototype = new GameObject();
Person.constructor = Person.Object;



