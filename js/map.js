var Map = function(){
	var canvas ; 
	var ctx ; 
	var init = function(_canvas,options){
		canvas = _canvas;
		ctx = canvas.getContext('2d');
	}

	var clear = function(){
		ctx.clearRect(0,0,getW(),getH());
	}

	var render = function(){
		clear();
		ctx.beginPath();
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0,getW(),getH());
	}

	var getW = function(){
		return canvas.width ; 
	}

	var getH = function(){
		return canvas.height ;
	}

	this.init = init ; 
	this.clear = clear ; 
	this.render = render ;
	this.width = getW ; 
	this.height = getH ;
}