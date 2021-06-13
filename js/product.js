//公用方法调用
// console.log(yx.public);
yx.public.navFn();
yx.public.backUpFn();

console.log(productList);


//解析url
var params=yx.parseUrl(window.location.href);
var pageId=params.id;				//产品对应的id
var curData=productList[pageId];		//产品对应的数据
if(!pageId || !curData){
	//这个就是404页面出现在条件
	window.location.href='404.html';
}

