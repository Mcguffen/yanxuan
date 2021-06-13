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

//创建规格DOM
var format=yx.g('#productImg .fomat');
var dds=[];			//把所有的dd标签存起来，为了后面要用
for(var i=0;i<curData.skuSpecList.length;i++){
	var dl=document.createElement("dl");
	var dt=document.createElement("dt");
	dt.innerHTML=curData.skuSpecList[i].name;
	dl.appendChild(dt);
	
	for(var j=0;j<curData.skuSpecList[i].skuSpecValueList.length;j++){
		var dd=document.createElement("dd");
		dd.innerHTML=curData.skuSpecList[i].skuSpecValueList[j].value;
		dd.setAttribute('data-id',curData.skuSpecList[i].skuSpecValueList[j].id)
		
		dd.onclick=function(){
			changeProduct.call(this);
		};
		
		dds.push(dd);
		dl.appendChild(dd);
	}
	
	format.appendChild(dl);
}

	//点击规格功能
	function changeProduct(){
		//如果不能点击的话就返回
		if(this.className.indexOf('noclick')!=-1){
			return;
		}
		
		var curId=this.getAttribute('data-id');		//点的那个id
		var othersDd=[];			//对方所有的dd（操作他们的class）
		var mergeId=[];			//与点击的id组合到的所有id（用来去数据里查一下这个组合的产品余量是否为0）
		
		//找对方的dd以及组合后的id
		//数据对象里的key是“点击的id;对方的id”，所以只要能查到点的id的，它就包含了所有对方的id。
		for(var attr in curData.skuMap){
			if(attr.indexOf(curId)!=-1){
				//这个条件成立，说明在数据里找到了当前点的id能组合到的所有id
				
				//1132095;1132097		1132097
				var otherId=attr.replace(curId,'').replace(';','');
				
				//通过对方的id找到对方的dd
				for(var i=0;i<dds.length;i++){
					if(dds[i].getAttribute('data-id')==otherId){
						othersDd.push(dds[i]);
					}
				}
				
				mergeId.push(attr);		//把找到的所有组合的id放在数组里
			}
		}
		
		
	//点击的功能
	/*
	 * 点击的时候判断
	 * 	1、自己是末选中状态
	 * 		1、兄弟节点
	 * 			有选中的话要取消选中，有不能点击的不用处理
	 * 		2、自己选中
	 * 		3、对方节点
	 * 			先去掉有noclick的class的元素，再给不能点击的加上noclick
	 * 		
	 * 	2、自己是选中状态
	 * 		1、取消自己选中
	 * 			（兄弟节点不用处理）
	 * 		2、对方节点
	 * 			如果有不能点击的要去掉noclick的class
	 */
	
	var brothers=this.parentNode.querySelectorAll('dd');		//兄弟节点
	if(this.className=='active'){
		//选中状态
		this.className='';
		
		for(var i=0;i<othersDd.length;i++){
			if(othersDd[i].className=='noclick'){
				othersDd[i].className='';
			}
		}
	}else{
		//末选中状态
		for(var i=0;i<brothers.length;i++){
			if(brothers[i].className=='active'){
				brothers[i].className='';
			}
		}
		
		this.className='active';
		
		for(var i=0;i<othersDd.length;i++){
			if(othersDd[i].className=='noclick'){
				othersDd[i].className='';
			}
			if(curData.skuMap[mergeId[i]].sellVolume==0){
				othersDd[i].className='noclick';
			}
		}
	}
	
	addNum();
}