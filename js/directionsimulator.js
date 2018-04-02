var DirectionSimulator = function(){
	var canvas ; 
	var ctx ;
	var x,y ;
	var R = 80, r = 20 ;
	var lineWidth = 5 ; 
	var alpha = 0.3;
	this.init = function(canvas,options){
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		x = options.x ; 
		y = options.y ;
		if(options.hasOwnProperty('R'))
			R = options.R ;  // 外圆的半径
		if(options.hasOwnProperty('r'))
			r = options.r;   // 里面小圆的半径
		if(options.hasOwnProperty('alpha'))
			alpha = options.alpha;   // 透明度

		initEvent();
	}

	this.render = function(){
		this.ctx.beginPath();
		this.ctx.arc(x,y,R,0,2*Math.PI);
		this.ctx.lineWidth=lineWidth;
		this.ctx.strokeStyle="rgba(255,255,255,0.2)";
		this.ctx.stroke();
		this.ctx.closePath();

		this.ctx.beginPath();
		this.ctx.arc(x,y,r,0,2*Math.PI);
		this.ctx.fillStyle="rgba(255,255,255,0.2)";
		this.ctx.fill();//画实心圆
		this.ctx.closePath();
	}

	var initEvent = function(){
		window.addEventListener('touchstart', function(e) {
	        e.preventDefault();
        	var startX = e.touches[0].pageX;
        	var startY = e.touches[0].pageY;
        	// 计算到圆心的继续是否超出
        	var xdiff = startX - x;            // 计算两个点的横坐标之差
			var ydiff = startY - y;            // 计算两个点的纵坐标之差
			var dist = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
			if(dist < R)
			{
				log("dist = " + dist);
			}
        	
    	});
	    //手机上用位移计算位置
	    window.addEventListener('touchmove', function(e) {
	        e.preventDefault();
	    });
	}
}