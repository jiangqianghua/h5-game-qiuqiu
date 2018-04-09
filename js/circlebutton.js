var CircleButton = function(){
	var canvas ; 
	var ctx ;
	var x,y ;
	var r = 40 ;
	var alpha = 0.3;
	var startTouchId = -1;
	var onTouchUpListener , onTouchDownListener , onTouchCancelListener;
	this.init = function(canvas,options){
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		x = options.x ; 
		y = options.y ;
		if(options.hasOwnProperty('r'))
			r = options.r;   // 里面小圆的半径
		this.initEvent();
	}

	// 回调角度监听函数
	this.setOnUpListener = function(callback){
		onTouchUpListener = callback ;
	}

	this.setOnDownListener = function(callback){
		onTouchDownListener = callback ;
	}

	this.setOnCancelListener = function(callback){
		onTouchCancelListener = callback ;
	}

	this.initEvent = function(){
		window.addEventListener('touchstart', function(e) {
	        e.preventDefault();
	        // 增加多点触控
	        for(var i = 0 ; i < e.targetTouches.length ; i++){
	        	var touch = e.targetTouches[i];
		        //log("touchstart:"+touch.identifier);
	        	var startX = e.touches[i].pageX;
	        	var startY = e.touches[i].pageY;
	        	// 计算到圆心的继续是否超出
	        	var dist = dist1({x:startX,y:startY},{x:x,y:y});
	        	//log(dist);
				if(dist < r)
				{
					startTouchId = touch.identifier;
					if(onTouchDownListener)
						onTouchDownListener(this);
					break;
				}
	        }
	    });

	    // 手机上停止触摸
	    window.addEventListener('touchend', function(e) {
	        e.preventDefault();
	        if(startTouchId == -1)
	        	return ;
	        for(var i = 0 ; i < e.changedTouches.length ; i++){
	        	if(e.changedTouches[i].identifier == startTouchId)
	        	{
	        		// 通知是否再
	        		var startX = e.changedTouches[i].pageX;
		        	var startY = e.changedTouches[i].pageY;
		        	// 计算到圆心的继续是否超出
		        	var dist = dist1({x:startX,y:startY},{x:x,y:y});
		        	//log(dist);
					if(dist < r)
					{
						if(onTouchUpListener)
							onTouchUpListener(this);
					}
					else{
						if(onTouchCancelListener)
							onTouchCancelListener(this);
					}
	        		// 通知外界
					startTouchId = -1;
					break;
	        	}
	        }
	    });
	}

	this.render = function(){
		this.ctx.beginPath();
		this.ctx.arc(x,y,r,0,2*Math.PI);
		this.ctx.fillStyle="rgba(255,255,255,"+alpha+")";
		this.ctx.fill();//画实心圆
		this.ctx.closePath();
	}


}