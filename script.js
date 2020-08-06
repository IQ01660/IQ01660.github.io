//initial variables
const canvasWidth = 800;
const canvasHeight = 400;
const groundHeight = 50;
const topBarrier = 30;
const holeHeight = 150;

//game displays
let obstacleSpeed = -3;
const speedIncrement = 0.1;
let currentScore = 0;

//constrol if a game is over
let isGameOver = false;

class Obstacle
{
	constructor(x_pos, speed, width, hole_height)
	{
		this.x_pos = x_pos;
		this.speed = speed;
		this.width = width;
		this.hole_height = hole_height;
		this.hole_y_pos = Math.floor(Math.random() * (canvasHeight - groundHeight * 2 - this.hole_height) + groundHeight + this.hole_height / 2);
		//this will be used to establish if the obstacel was passed already
		this.passed = false;
	}

	move()
	{
		this.x_pos += this.speed;
	}

	render() 
	{
		fill(15, 48, 168);
		rect(this.x_pos - this.width / 2, 0, this.width, this.hole_y_pos - this.hole_height / 2);
		rect(this.x_pos - this.width / 2, this.hole_y_pos + this.hole_height / 2, this.width, canvasHeight - this.hole_y_pos + this.hole_height / 2)
	}
}

class Bird
{
	constructor(size, init_x, init_y, speed, jump_height)
	{
		this.size = size;
		this.xCoor = init_x;
		this.yCoor = init_y;
		this.speed = speed;
		this.jump_height = jump_height;
	}

	render()
	{
		noStroke();
		//body
		fill(193, 99, 255);
		ellipse(this.xCoor, this.yCoor, 40 * this.size, 30 * this.size);
		//head
		fill(212, 195, 89);
		ellipse(this.xCoor + (10 * this.size), this.yCoor - (10 * this.size), 20 * this.size, 20 * this.size);
		//eye
		fill(0),
		ellipse(this.xCoor + (12 * this.size), this.yCoor - (12 * this.size), 5 * this.size, 5 * this.size);
		//beak
		fill(191, 103, 8);
		triangle(this.xCoor + (17 * this.size), this.yCoor - (10 * this.size), this.xCoor + (25 * this.size), this.yCoor - (5 * this.size), this.xCoor + (17 * this.size), this.yCoor - (5 * this.size));
	}

	fall() {
		if (this.yCoor <= canvasHeight - groundHeight)
		{
			this.yCoor += this.speed;
		}
	}

	jump = () => {
		if (keyIsPressed)
		{
			if (this.yCoor - this.jump_height <= topBarrier)
			{
				this.yCoor = topBarrier;
			}
			else{
				this.yCoor -= this.jump_height;
			}
			
		}
	};
}

//creating the bird
const myBird = new Bird(1, 300, 50, 3, 10);

const cloud1 = new Cloud(1, 300, 50);
const cloud2 = new Cloud(1, 600, 60);

//all obstacles will be here
const obstacles = new Queue();

//putting the first two obstacles into the game
obstacles.enqueue(new Obstacle(800, obstacleSpeed, 60, holeHeight));
obstacles.enqueue(new Obstacle(1200, obstacleSpeed, 60, holeHeight));

function setup() {
	//creating the canvas
	createCanvas(canvasWidth, canvasHeight);
}

function draw() {
	//enqueue new obstacles if the last one is far on the left
	if (obstacles.list()[obstacles.list().length - 1].x_pos <= 400)
	{
		obstacles.enqueue(new Obstacle(800, obstacleSpeed, 60, holeHeight));
	}

	//remove useless obstacles from queue
	if (obstacles.list()[0].x_pos < -100)
	{
		obstacles.dequeue();
	}

	for (const obstacle of obstacles.list())
	{
		//if you pass an obstacle then
		if (!obstacle.passed && obstacle.x_pos <= myBird.xCoor)
		{
			obstacle.passed = true;
			currentScore++;
			obstacleSpeed -= speedIncrement;
		}

		//controlling if the bird hits the obstacle
		if (obstacle.x_pos - obstacle.width / 2 - 20 <= myBird.xCoor &&
		!(myBird.yCoor > obstacle.hole_y_pos - obstacle.hole_height / 2 && 
		  myBird.yCoor < obstacle.hole_y_pos + obstacle.hole_height / 2) &&
		!(obstacle.x_pos + obstacle.width / 2 + 20 <= myBird.xCoor)
	    )
		{
			isGameOver = true;
		}
	}

	if (currentScore % 10 === 0)
	{
		
	}
	

	if (!isGameOver)
	{
		//this where we setup the background
		background(135, 247, 255);

		//clouds
		cloud1.render();
		cloud2.render();

		//ground
		fill(54, 163, 65);
		rect(0, canvasHeight - groundHeight, canvasWidth, groundHeight);

		//make the bird fall
		myBird.fall();

		myBird.jump();

		for (const obstacle of obstacles.list())
		{
			obstacle.move();
			obstacle.render();
		}

		//rendering the bird
		myBird.render();

		textSize(30);
		text("Score: " + currentScore, 50, 50);		
		textSize(25);
		text("Speed: " + (obstacleSpeed * (-1)).toFixed(2), 50, 100);
	}
}



