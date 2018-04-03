var DirectionSimulator = function(){
	var canvas ; 
	var ctx ;
	var x,y ;
	var R = 120, r = 40 ;
	var lineWidth = 5 ; 
	var alpha = 0.3;
	var startTouch = false ;
	var onAngleListener = null ;
	var offsetX = 0, offsetY = 0;
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

	// 回调角度监听函数
	this.setOnAngleListener = function(callback){
		onAngleListener = callback ;
	}

	this.render = function(){
		this.ctx.beginPath();
		this.ctx.arc(x,y,R,0,2*Math.PI);
		this.ctx.lineWidth=lineWidth;
		this.ctx.strokeStyle="rgba(255,255,255,"+alpha+")";
		this.ctx.stroke();
		this.ctx.closePath();

		this.ctx.beginPath();
		this.ctx.arc(x+offsetX,y+offsetY,r,0,2*Math.PI);
		this.ctx.fillStyle="rgba(255,255,255,"+alpha+")";
		this.ctx.fill();//画实心圆
		this.ctx.closePath();
	}

	var initEvent = function(){
		window.addEventListener('touchstart', function(e) {
	        e.preventDefault();
        	var startX = e.touches[0].pageX;
        	var startY = e.touches[0].pageY;
        	// 计算到圆心的继续是否超出
        	var dist = dist1({x:startX,y:startY},{x:x,y:y});
        	log(dist);
			if(dist < R)
			{
				startTouch = true ;
			}
        	
    	});
	    //手机上用位移计算位置
	    window.addEventListener('touchmove', function(e) {
	        e.preventDefault();
	        if(startTouch){
	        	var moveX = e.touches[0].pageX;
        		var moveY = e.touches[0].pageY;
	        	var angle = angle1({x:x,y:y},{x:moveX,y:moveY});
	        	angle = parseInt(angle);
	        	if(onAngleListener){
	        		onAngleListener(parseInt(angle));
	        	}
	        	var dist = dist1({x:moveX,y:moveY},{x:x,y:y});
	        	if(dist > R){
	        		angle = angle + 90;
	        		var hudu = angle*2*Math.PI / 360;
	        		var px = Math.sin(hudu)*R;
	        		var py = Math.cos(hudu)*R;
	        		offsetX = px ; 
		        	offsetY = py ;
		        	//log("R="+R + " angle="+hudu +" "+offsetX + ":"+offsetY + " sin="+Math.sin(hudu) + " cos="+Math.cos(hudu) );
	        	}
	        	else{
		        	offsetX = moveX - x ; 
		        	offsetY = moveY - y ;
	        	}
	        }
	    });
	    // 手机上停止触摸
	    window.addEventListener('touchend', function(e) {
	        e.preventDefault();
	        startTouch = false ;
	        offsetX = offsetY = 0;
	    });
	}
}