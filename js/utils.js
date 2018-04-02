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