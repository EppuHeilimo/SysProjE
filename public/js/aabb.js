function AABB(aa, bb)
{
	this.aa = aa.copy();
	this.bb = bb.copy();
}

//Generates an AABB from size and position (top-left)
function GenerateAABB(position, size)
{
	return new AABB(position,position.add(size));
}