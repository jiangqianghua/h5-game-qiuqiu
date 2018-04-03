var Ball = function(){
	var canvas ; 
	var ctx ;
	var x,y ;
	var r;
	var color;
	var speedX = 0,speedY = 0;
	var k = 1;
	this.init = function(_canvas,_options){
		canvas = _canvas ; 
		ctx = canvas.getContext('2d');
		x = _options.x ;
		y = _options.y ;
		if(_options.hasOwnProperty("r"))
			r = _options.r ;
		else 
			r = 40;
		if(_options.hasOwnProperty("color"))
			color = _options.color ;
		else 
			color = "#ff00ff";
	}

	this.direct = function(angle){
		if(angle == 90){
			speedX = 0;
			speedY = -k ;
		}
		else if(angle == 270)
		{
			speedX = 0 ; 
			speedY = k ;
		}
		else if(angle == 0){
			speedY = 0 ; 
			speedX = k ;
		}
		else if(angle == 180){
			speedY = 0 ; 
			speedX = -k;
		}
		else{
			var sin = Math.abs(Math.sin(angle));
			var cos = Math.abs(Math.cos(angle));
			if((angle > 0 && angle < 90) || (angle < 360 && angle > 270))
			{
				speedX = Math.abs(k*sin);
			}
			else
			{
				speedX = -Math.abs(k*sin);
			}

			if((angle > 0 && angle < 180)){
				speedY = -Math.abs(k*cos);
			}
			else
			{
				speedY = Math.abs(k*cos);
			}
		}

	}

	this.update = function(){
		x = x + speedX ; 
		y = y + speedY ;
	}

	this.render = function(){
		ctx.beginPath();
		ctx.arc(x,y,r,0,2*Math.PI);
		ctx.fillStyle = color;
		ctx.fill();//画实心圆
		ctx.closePath();
	}

}