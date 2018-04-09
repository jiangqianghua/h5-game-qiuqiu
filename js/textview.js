var TextView = function(){
	var canvas ; 
	var ctx ;
	var x,y ;
	var text ;
	var color ;
	var font ;
	this.init = function(canvas,options){
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		x = options.x ; 
		y = options.y ;

		if(options.hasOwnProperty("text"))
			text = options.text ;
		else 
			text = "";

		if(options.hasOwnProperty("color"))
			color = options.color ;
		else 
			color = "#ff0000";

		if(options.hasOwnProperty("font"))
			font = options.font ;
		else 
			font = "20px Georgia";

	}

	this.text = function(txt){
		text = txt ;
	}

	this.render = function(){
		this.ctx.beginPath();
		this.ctx.rotate( 0* Math.PI/180);
		this.ctx.fillStyle=color;
		this.ctx.font=font;
		this.ctx.fillText(text,x,y);
		this.ctx.restore();
	}
}