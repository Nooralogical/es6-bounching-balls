/* 
* Noora Etula
* ECMAScript 6 Bubble Generator 2
* 2018
*/

//class from one bubble
class Bubble {

	constructor(id, x, y, velocityX, velocityY) {
		//all bubbles have unique number
		this.id = id;
		//set bubble color
		this.color = 'white';
		//set radius of the circle
		this.radius = 20;
		//set place on canvas
		this.x = x;
		this.y = y;
		//set travel speed
		this.velocityX = velocityX;
		this.velocityY = velocityY;

	}
	draw(draw) {
		//start the path drawing
		draw.beginPath();
		//add color to the bubble
		draw.fillStyle = this.color;
		//draw the bubble
		draw.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		//fill the bubble
		draw.fill();
	}
	move(width, height, max, min) {
		//check if right wall is hit
		if ((this.x + this.radius) >= width) {
			//calculate new speed
			let newVel = random(min, -1);
			this.velocityX = newVel;
		}
		//check if left wall is hit
		if ((this.x - this.radius) <= 0) {
			//calculate new speed
			let newVel = random(1, max);
			this.velocityX = newVel;
		}
		//check if bottom wall is hit
		if ((this.y + this.radius) >= height) {
			//calculate new speed
			let newVel = random(min, -1);
			this.velocityY = newVel;
		}
		//check if top wall is hit
		if ((this.y - this.radius) <= 0) {
			//calculate new speed
			let newVel = random(1, max);
			this.velocityY = newVel;
		}
		this.x += this.velocityX;
		this.y += this.velocityY;
	}
	clicked() {
		//show details when ball is clicked
		console.log('You hit bubble: ' + this.id + ' at location x:' + this.x + ' and y:' + this.y);
	}
}
//class for canvas with all bubbles
class DrawCanvas {

	constructor(count, intervalSpeed, max) {
		//array for bubbles
		this.bubbles = [];
		//amout of bubbles and interval speed
		this.bubbleCount = count;
		this.intervalSpeed = intervalSpeed;
		//set canvas and 2d drawing
		this.canvas = document.querySelector('canvas');
		this.drawing = this.canvas.getContext('2d');
		//set canvas size
		this.width = this.canvas.width = 1000;
		this.height = this.canvas.height = 600;
		//max and min for speed
		this.max = max;
		this.min = -(max);
		//checkity check
		console.log('Canvas configuration done!');

	}
	setInfo() {
		//add info to html elements
		document.getElementById('bubbles').innerHTML = this.bubbleCount;
		document.getElementById('interval').innerHTML = this.intervalSpeed;
		document.getElementById('speed').innerHTML = '1 - ' + this.max;

	}
	animate() {
		//number for bubble ids
		let n= 1;
		//set canvas color and draw
		this.drawing.fillStyle = 'rgb(211,211,211)';
		this.drawing.fillRect(0,0,this.width,this.height);
		//loop until enough bubbles
		while (this.bubbles.length < this.bubbleCount) {
			let bubble = new Bubble(
				[n], //set id
				random(0,this.width), //set x
				random(0,this.height), //set y
				random(this.min,this.max), //set velocity x
				random(this.min,this.max) //set velocity y
			)
			//place bubbles to array
			this.bubbles.push(bubble);
			//checkity check
			console.log('Bubble-'+ n +' created!');
			n++;
		}
		//loop through the array and draw/move all bubbles
		for (var i = 0; i < this.bubbles.length; i++) {
			this.bubbles[i].draw(this.drawing); //draw to canvas
			this.bubbles[i].move(this.width, this.height, this.max, this.min); //move with canvas width and height
		}
	}
	start() {
		//need that for interval function
		let that = this;
		window.setInterval(function () {
			//start animating with given interval speed
			that.animate(); //draws the bubbles + canvas continouesly
		}, this.intervalSpeed)
	}
	checkClicks() {
		//add event listener to canvas that checks for clicks
		this.canvas.addEventListener('click', (event) => {
			const position = {
				//get click coordinates
				x: event.offsetX,
				y: event.offsetY
			};
			//checkity check
			console.log(position);
			//check through all bubbles for same coordinates
			this.bubbles.forEach(bubble => {
				//check x-coordinates
				//radius + 5 added to clicked position - easier to hit
				let min = position.x - 25;
				let max = position.x + 25;
				//compare agaist all bubble x-coordinates
				if (bubble.x > min && bubble.x < max) {
					//check y-coordinates
					let min = position.y - 25;
					let max= position.y + 25;
					if (bubble.y > min && bubble.y < max) {
						bubble.clicked(); //call bubbles click-function
					}
				}
			});
		});
	}
}
window.onload = function () {
	console.log('Starting the bubble drawing!');
	//give bubble amount, interval speed, max speed
	const bubbleDrawing = new DrawCanvas(10, 30, 15);
	//start
	bubbleDrawing.start();
	//start checking clicks and update html elements
	bubbleDrawing.checkClicks();
	bubbleDrawing.setInfo();
}
//get random number for speed
function random(min, max) {
	let number = Math.floor(Math.random() * (max-min)) + min;
	//check if number is 0
	if (number == 0) {
		//calculate again
		number = random(min, max);
	}
	return number;
}