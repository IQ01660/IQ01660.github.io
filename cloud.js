class Cloud
{
	constructor(size, x_pos, y_pos)
	{
		this.size = size;
		this.y_pos = y_pos;
		this.x_pos = x_pos;
	}
	render()
	{
		noStroke()
		fill(255);
		ellipse(this.x_pos, this.y_pos, 40 * this.size, 20 * this.size);
		ellipse(this.x_pos - 10 * this.size, this.y_pos - 10 * this.size, 40 * this.size, 30 * this.size);
		ellipse(this.x_pos + 10 * this.size, this.y_pos - 10 * this.size, 40 * this.size, 20 * this.size);
		ellipse(this.x_pos + 10 * this.size, this.y_pos + 10 * this.size, 40 * this.size, 20 * this.size);
		ellipse(this.x_pos - 10 * this.size, this.y_pos + 10 * this.size, 30 * this.size, 20 * this.size);
		ellipse(this.x_pos - 20 * this.size, this.y_pos, 40 * this.size, 20 * this.size);
		ellipse(this.x_pos + 20 * this.size, this.y_pos, 40 * this.size, 20 * this.size);
	}
}