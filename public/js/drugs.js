function GetGreaterUnit(unit)
{
	if (unit[0] == 'µ')
		unit = 'm' + unit
	else if (unit[0] == 'm')
		return unit.substr(1);
	else
		unit = "k"+unit
	
	return unit;
}
function GetSmallerUnit(unit)
{
	if (unit[0] == 'm')
		unit = 'µ'+unit;
	else
		unit = 'm'+unit
	
	return unit;
}

var Drugs = 
{
	drugs : [],
	loaded: false,
	drugsLeft: 0,
	drugLoadSize: 36,
	asyncRequestRunning: false,
	load : function (sync)
	{
		//while (Drugs.asyncRequestRunning);
		
		if (sync)
			Drugs.asyncRequestRunning = true;
		Drugs.loaded = false;
		
		var get = new XMLHttpRequest();
		get.onreadystatechange = function(event)
		{
			if (get.readyState==4)
			{
				Drugs.asyncRequestRunning = false;
				if (get.status==200)
				{
					console.log("Added "+Drugs.drugLoadSize+" to the pool "+Drugs.drugsLeft);
					//console.log(get.responseText);
					Drugs.drugs.splice(Drugs.drugsLeft,Drugs.drugs.length -Drugs.drugsLeft);
					Drugs.drugsLeft += Drugs.drugLoadSize;
					if (Drugs.drugs.length > 0)
						Drugs.drugs = JSON.parse(get.responseText)["drugs"].concat(Drugs.drugs);	
					else
						Drugs.drugs = JSON.parse(get.responseText)["drugs"];
					
					for (var i = 0; i < Drugs.drugLoadSize; i++)
					{
						var spl = Drugs.drugs[i]["strength"].replace("mikro",'µ').split(" ");
						Drugs.drugs[i]["strengthNum"] = Number(spl[0]);
						
						Drugs.drugs[i]["unit"] = "";
						for (var i2 = 1; i2 < spl.length; i2++)
							Drugs.drugs[i]["unit"] += spl[i2];
					}
					Drugs.loaded = true;
					
					
				}
				else
				{
					alert("Error loading drugs... it's sort of a big deal");
					Drugs.loaded = false;
				}
			}
		}
		get.open("GET","http://medicutor.herokuapp.com/api/random.php?n="+Drugs.drugLoadSize+"&form=tablet",sync);
		get.send(null);
	},
	popDrug : function ()
	{
		Drugs.drugsLeft--;
		var retDrug = Drugs.drugs[Drugs.drugsLeft];
		
		if (Drugs.drugsLeft == Drugs.drugLoadSize/2)
		{
			Drugs.load(true);
		}
		if (Drugs.drugsLeft <= 0)
		{
			Drugs.load(false);
		}
		
		return retDrug;
	}
	
}


function GetCalculation()
{
	var ak = {};
	ak.drug = Drugs.popDrug();
	ak.agent = ak.drug["drug"];
	
	var bunchOfRandomNumbers = [];
	for (var i = 0; i < 125; i++)
	{
		bunchOfRandomNumbers.push((i+1)/8);
	}
	bunchOfRandomNumbers = ShuffleArray(bunchOfRandomNumbers);
	
	var vcount = 4;
	var varray = [];
	var mgCount = ak.drug["strengthNum"]; 
	for (var i = 0; i < vcount; i++)
	{
		var k = (bunchOfRandomNumbers[i]);
		varray.push(k);
	}
	
	ak.correctAnswer = Math.floor(Math.random()*vcount);
	
	ak.choices = varray;
	ak.wanted = (varray[ak.correctAnswer]*mgCount)+" "+ak.drug.unit;
	return ak;
}


Drugs.load(true);

AssetLoadFunctions.push(function()
{
	return Drugs.loaded;
});

var currentCalculation = "";

function PrepareForNextCustomer()
{

	//defined in cabinet.js
	currentCalculation = GetCalculation();
	var seld = Math.floor(Math.random()*mboBoxes.length);
	
	var i = 0;
	for (var asd = 0; asd < mboBoxes.length; asd++)
	{
		var tdrug;
		if (i == seld)
			tdrug = currentCalculation.drug;
		else
			tdrug = Drugs.popDrug();
		
		
		mboBoxes[asd].label = GenerateRandomLabel(tdrug["name"],"",tdrug["labeltext"],Math.random());
		i++;
	}
}
