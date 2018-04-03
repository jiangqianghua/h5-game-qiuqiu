// 根据id获取元素
var e = function(id){
	return document.getElementById(id);
}
// 打印日志
var log = function(s){
	console.log(s);
}

// js导入js代码
var include = function(jsname){
	document.write("<script type='text/javascript' src='../js/"+jsname+"'></script>");
}
// 0到180 ，-180 到 0
var angle1 = function(start,end){
    var diff_x = end.x - start.x,
        diff_y = start.y - end.y;
    //返回角度,不是弧度
    return Math.atan2(diff_y, diff_x) * 180 / Math.PI;
}

// 0到360
var angle2 = function(start,end){
    var diff_x = end.x - start.x,
        diff_y = start.y - end.y;
    //返回角度,不是弧度
    var angle = Math.atan2(diff_y, diff_x) * 180 / Math.PI;
    if(angle < 0)
    	angle = 360 + angle ;
    return angle;
}

var dist1 = function(start,end){
	var xdiff = start.x - end.x;            // 计算两个点的横坐标之差
	var ydiff = start.y - end.y;            // 计算两个点的纵坐标之差
	var dist = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
	return dist ;
}