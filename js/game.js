include('map.js')
include('directionsimulator.js')
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
	this.init = function(){
		canvas = e('game') ;
		width = canvas.width;
		height = canvas.height ; 
		map = new Map();
		map.init(canvas,{});

		directSimulator = new DirectionSimulator();
		directSimulator.init(canvas,{x:100,y:100});


	}

	this.initData = function(){

	}

	this.initEvent = function(){
	}

	this.render = function(){
		map.render();
		directSimulator.render();
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
	(function animate() {
		if(isOver)
			return ;
    	game.render();
    	raf(animate);
	})();
}