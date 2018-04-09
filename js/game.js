include('map.js')
include('directionsimulator.js')
include('ball.js')
include('circlebutton.js')
include('textview.js')
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
	var myBalls = [];
	var splitBtn ;
	var titleView ;
	this.init = function(){
		canvas = e('game') ;
		width = canvas.width;
		height = canvas.height ; 
		map = new Map();
		map.init(canvas,{});

		directSimulator = new DirectionSimulator();
		directSimulator.init(canvas,{x:150,y:200});


	}

	this.initData = function(){

	}

	this.initEvent = function(){
		directSimulator.setOnAngleListener(this.onAngleCallback);

		splitBtn.setOnDownListener(function(e){
			log("splitBtnTouchDown...");
		});
		splitBtn.setOnUpListener(function(e){
			log("splitBtnTouchUp...");
		});
		splitBtn.setOnCancelListener(function(e){
			log("splitBtnTouchCancle...");
		});
	}

	this.render = function(){
		map.render();
		for(var i = 0 ; i < myBalls.length ; i++){
			var ball = myBalls[i];
			ball.update();
			ball.render();
		}

		titleView.render();
		directSimulator.render();
		splitBtn.render();
	}

	this.onAngleCallback = function(angle){
		//log(angle);
		for(var i = 0 ; i < myBalls.length ; i++){
			var ball = myBalls[i];
			ball.direct(angle);
		}
	}

	this.createBalls = function(){
		var ball = new Ball();
		ball.init(canvas,{x:100,y:100});
		myBalls.push(ball);
	}

	this.createSplitBtn = function(){
		splitBtn = new CircleButton();
		splitBtn.init(canvas,{x:100,y:900});
	}

	this.createTitleView = function(){
		titleView = new TextView();
		titleView.init(canvas,{x:100,y:300});
		titleView.text("qiuqiudazuozan");
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
	game.createBalls();
	game.createSplitBtn();
	game.createTitleView();
	game.initEvent();
	(function animate() {
		if(isOver)
			return ;
    	game.render();
    	raf(animate);
	})();
}