EngineInitializationFunctions.push(function ()
{
	var recipebutton = new ButtonObject();
	recipebutton.position.x = 0;
	recipebutton.position.y = 132;
	recipebutton.depth = 400;
	recipebutton.drawOffset = Context.drawOffset["behindDesk"];
	recipebutton.setText("Prescription");
	recipebutton.update = function()
	{
		this.updateRealObject();
	};
	recipebutton.onClick = function()
	{
		Engine.setDrawContext(Context.map["recipeDesk"]);
        Persons.allPersons[0].setIsServed();
        Score.updateScore();
		Score.newRound();
	};
    recipebutton.inputContext = Context.map["gstates"];
    recipebutton.drawContext += Context.map["gameScreenDesk"];
	Engine.addObject(recipebutton);
    
	
	//Restart button in game
	var restartbutton = new ButtonObject();
	restartbutton.position.x = 5;
	restartbutton.position.y = 0;
	restartbutton.depth = 1000;
	restartbutton.setText("Restart");
	restartbutton.size.x = context.measureText("Restart").width + 20;
	restartbutton.onClick = function()
	{
		Engine.setDrawContext(1);
	}
    
    restartbutton.inputContext = Context.map["gstates"];
    restartbutton.drawContext = Context.map["gstates"];
	Engine.addObject(restartbutton);
    
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
	pause.position.x = 90;
	pause.position.y = 0;
    pause.size.x = 20;
    pause.size.y = 30;
	pause.depth = 1000;
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
	timerr.depth = 1000;
	Engine.addObject(timerr);
    //scores
    var scores = new ScoreShow();
	scores.depth = 1000;
    Engine.addObject(scores);
    
    //the flower
    var flowerDrawObject = new RealObject();
    flowerDrawObject.position.x = -800;
    flowerDrawObject.position.y = 20;
    flowerDrawObject.size.x = 130;
    flowerDrawObject.size.y = 170;
    flowerDrawObject.drawOffset = Context.drawOffset["behindDesk"];
    //recipeDrawObject.depth = 200;
    flowerDrawObject.drawContext += Context.map["menuanddesk"];

    flowerDrawObject.draw = function()
    {
        context.drawImage(Texture.map["plant"], this.position.x, this.position.y, this.size.x, this.size.y);
    }
    Engine.addObject(flowerDrawObject);
    

    var medicineCalcRadio = new RadioButtons();
    
    medicineCalcRadio.position = new Vector2(100, 100);
    medicineCalcRadio.generateButtons();
    medicineCalcRadio.size = medicineCalcRadio.reSize();
    var values = new Array();
    values.push(1);
    values.push(2);
    values.push(3);
    values.push(4);
    medicineCalcRadio.changeButtonValues(values);
    medicineCalcRadio.drawContext += Context.map["gameCalculationScreen"];
   
    Engine.addObject(medicineCalcRadio);
    for(var i = 0; i < medicineCalcRadio.buttonsAmount; i++)
        Engine.addObject(medicineCalcRadio.buttons[i]);
    
});