/**
 	Called upon game initialization
*/
function _EngineInit(eng)
{
	for (i = 0; i < EngineInitializationFunctions.length; i++)
	{
		try
		{
			EngineInitializationFunctions[i]();
		}
		catch(err)
		{
		
			console.log("Error in engine initialization: ")
			console.log(err);
		}
	}	
	PrepareForNextCustomer();
	//Create a desk
	var ts = new TiledObject;
	
	ts.image = Texture.map["desk"];

	ts.depth = -10;
	//set the draw context 
	ts.drawContext += Context.map["menuanddesk"];
	
	//overload the update
	ts.update = function()
	{
		ts.position.x = 0;
		ts.position.y = screenSize.y-280;
		ts.size.x = screenSize.x;
		ts.size.y = 320;
		
		this.updateSize();
	};
	//add the object
	eng.addObject(ts);
	
	//Create a sky
	var sky = new PropObject;
	sky.image = Texture.map["background"];
	
	//far far behind
	sky.depth = -250;
	
	//overload da update
	sky.update = function()
	{
		
		//var aspectRatio = this.image.width / this.image.height;
		//var tasp = screenSize.x / screenSize.y;
		
		//Set the position to {0,0}
		this.position.y = 0;
		this.position.x = 0;
		
		//Maximize the size
		this.size.y = screenSize.y;
		this.size.x = screenSize.x;
		
		//this.size.y = 0;
		//this.size.x = 0;
	
		//sky.size.x = screenSize.x;
		//sky.size.y = screenSize.y;
	};
	//add the object
	eng.addObject(sky);
	
	var tocabinet = new RealObject;
	tocabinet.size = new Vector2(450,200);
	tocabinet.position = new Vector2(4,4);
	tocabinet.image = Texture.map["cabinetArrow"];
	tocabinet.draw = function()
	{
		if (this.mouseHover)
			context.drawImage(this.image, this.position.x, this.position.y-(Math.sin(Time.now/177)*24), this.size.x*(1.25+Math.sin(Time.now/100)*0.25), this.size.y);
		else
			context.drawImage(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
	};
	
	tocabinet.update = function()
	{
		this.updateRealObject();
		tocabinet.position = new Vector2(0,screenSize.y-this.size.y);
	
	};
	tocabinet.drawContext += Context.map["gameDeskContexts"];
	tocabinet.inputContext += Context.map["gameDeskContexts"];
	tocabinet.depth = 451;
	tocabinet.onClick = function()
	{
		Engine.setDrawContext(Context.map["gameMedicineCabinet"]);
	};
	Engine.addObject(tocabinet);
	
    //give radiobuttons current calc buttons
    var values = new Array();
    values.push(currentCalculation.choices[0]);
    values.push(currentCalculation.choices[1]);
    values.push(currentCalculation.choices[2]);
    values.push(currentCalculation.choices[3]);
    RadioButtons.changeButtonValues(values);
    
    RadioButtons.rePositionButtons(new Vector2(screenSize.x / 1.6, screenSize.y / 2.6));
	/*
	var i = 0;
	for (var ctx in Context.map)
	{
		var ctn = Context.map[ctx];
		var btn2 = new ButtonObject();
		btn2.position.x = 482;
		btn2.position.y = 12+i*32;
		btn2.depth = 1243;
		btn2.setText(ctx + " " + ctn);
		btn2.targetContext = ctn;
		btn2.drawOffset = Context.drawOffset["behindDesk"];
		btn2.onClick = function()
		{
			Engine.setDrawContext(this.targetContext);
		};
		i++;
		eng.addObject(btn2);
	}	
    */

}
