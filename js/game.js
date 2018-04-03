include('map.js')
include('directionsimulator.js')
include('ball.js')
var game ;
var isOver = false;
const raf = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(callback) {
    window.setTimeout(callback, 1000 / 60); //每帧1000/60ms
  };

var Game = function(){
	var map ;
	var directSimulator ;
	var balls = [];
	this.init = function(){
		canvas = e('game') ;
		width = canvas.width;
		height = canvas.height ; 
		map = new Map();
		map.init(canvas,{});

		directSimulator = new DirectionSimulator();
		directSimulator.init(canvas,{x:150,y:200});
		directSimulator.setOnAngleListener(this.onAngleCallback);

	}

	this.initData = function(){

	}

	this.initEvent = function(){
	}

	this.render = function(){
		map.render();

		for(var i = 0 ; i < balls.length ; i++){
			var ball = balls[i];
			ball.update();
			ball.render();
		}


		directSimulator.render();
	}

	this.onAngleCallback = function(angle){
		log(angle);
		for(var i = 0 ; i < balls.length ; i++){
			var ball = balls[i];
			ball.direct(angle);
		}

	}

	this.createBalls = function(){
		var ball = new Ball();
		ball.init(canvas,{x:100,y:100});
		balls.push(ball);
	}
}

var resize = function(){
	e('game').width = document.documentElement.clientWidth;
	e('game').height = document.documentElement.clientHeight;
}

window.onresize = resize;

// 程序执行入口
window.onload = function(){
	isOver = false ;	
	resize();
	game = new Game();
	game.init();
	game.initData();
	game.initEvent();
	game.createBalls();
	(function animate() {
		if(isOver)
			return ;
    	game.render();
    	raf(animate);
	})();
}