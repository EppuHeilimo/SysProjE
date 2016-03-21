EngineInitializationFunctions.push(function ()
{
	var recipebutton = new ButtonObject();
	recipebutton.position.x = 0;
	recipebutton.position.y = 132;
	recipebutton.depth = 400;
	
	recipebutton.drawOffset = Context.drawOffset["behindDesk"];
	recipebutton.setText("Recipe!!!!! :DDDD");
	recipebutton.update = function()
	{
		this.updateRealObject();
		
	};
	recipebutton.onClick = function()
	{
		Engine.setDrawContext(Context.map["recipeDesk"]);
        Persons.allPersons[0].isServed = true;
	};
    recipebutton.inputContext = Context.map["gstates"];
    recipebutton.drawContext = Context.map["gstates"];
	Engine.addObject(recipebutton);
    
    //menu button
	var menubutton = new ButtonObject();
	menubutton.position.x = 5;
	menubutton.position.y = 0;
	menubutton.setText("Menu");
	menubutton.size.x = context.measureText("Menu").width + 20;
	menubutton.onClick = function()
	{
		Engine.setDrawContext(1);
	}
    
    menubutton.inputContext = Context.map["gstates"];
    menubutton.drawContext = Context.map["gstates"];
	Engine.addObject(menubutton);
    
    //Whole screen invisible button when recipe is shown on desk
    var invRecipeBackButton = new InvisibleButton();
    invRecipeBackButton.position.x = 0;
    invRecipeBackButton.position.y = 0;
    invRecipeBackButton.size.x = screenSize.x;
    invRecipeBackButton.size.y = screenSize.y;
    invRecipeBackButton.depth = 100000;
    invRecipeBackButton.inputContext += Context.map["recipeDesk"];
    invRecipeBackButton.onClick = function()
    {
        Engine.setDrawContext(Context.map["gameScreenDesk"]);
    }
    Engine.addObject(invRecipeBackButton);
    
    //huge recipe object
    var recipeDrawObject = new RealObject();
    recipeDrawObject.position.x = 678;
    recipeDrawObject.position.y = 154;
    recipeDrawObject.size.x = 640;
    recipeDrawObject.size.y = 400;
    //recipeDrawObject.depth = 200;
    recipeDrawObject.drawContext += Context.map["recipeDesk"];

    recipeDrawObject.draw = function()
    {
        context.drawImage(Texture.map["prescription"], this.position.x, this.position.y, this.size.x, this.size.y);
    }
    Engine.addObject(recipeDrawObject);
    
    //audio pause button
	var pause = new RealObject();
	pause.position.x = 80;
	pause.position.y = 0;
    pause.size.x = 20;
    pause.size.y = 30;
	pause.onClick = function()
	{
		MyAudio.paused = !MyAudio.paused;
	}
	Engine.addObject(pause);
    pause.draw = function()
    {
        if(!MyAudio.paused)
            context.drawImage(Texture.map["note"], this.position.x, this.position.y, this.size.x, this.size.y);
        else
            context.drawImage(Texture.map["noteoff"], this.position.x, this.position.y, this.size.x, this.size.y);
    }
	
	//timer 
	var timerr = new Timer();
	eng.addObject(timerr);
    
});