/**
 	Constructor for 2 component vector
	@param {Number} (x) x-component of the vector
	@param {Number} (y) y-component of the vector
	@constructor
*/
function Vector2(x, y)
{
	this.x = x;
	this.y = y;
	
	this.copy = function ()
	{
		return new Vector2(this.x,this.y);
	};
	
	//Add vector2, returns the result
	this.add = function (vec)
	{
		return new Vector2(this.x+vec.x,this.y+vec.y);
	};
	
	//Subtract vector2, returns the result
	this.sub = function (vec)
	{
		return new Vector2(this.x-vec.x,this.y-vec.y);
	};
	
	this.div = function (vec)
	{
		return new Vector2(this.x/vec.x,this.y/vec.y);
	};
	
	this.mul = function (vec)
	{
		return new Vector2(this.x*vec.x,this.y*vec.y);
	};
	
	this.addScalar = function (s)
	{
		return new Vector2(this.x+s,this.y+s);
	};
	
	this.subScalar = function (s)
	{
		return new Vector2(this.x-s,this.y-s);
	};
	
	this.mulScalar = function (s)
	{
		return new Vector2(this.x*s,this.y*s);
	};
	
	this.divScalar = function (s)
	{
		return new Vector2(this.x/s,this.y/s);
	};
	
	this.equals = function (v)
	{
		if (this.x != v.x)
			return false;
		if (this.y != v.y)
			return false;
		return true;
	};
}