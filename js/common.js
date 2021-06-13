window.yx={
	g:function(name){
		return document.querySelector(name);
	},
	ga:function(name){
		return document.querySelectorAll(name);
	},
	public:{
		navFn:function(){		//导航功能
			var nav=yx.g('.nav');
			var lis=yx.ga('.navBar li');
			var subNav=yx.g('.subNav');
			var uls=yx.ga('.subNav ul');
			var newLis=[];			//存储实际有用的li
			
			//首页是没有hover状态，所以要从1开始循环，后面的三个li也没有hover状态
			for(var i=1;i<lis.length-3;i++){
				newLis.push(lis[i]);
			}
			console.log(newLis);
			for(var i=0;i<newLis.length;i++){
				newLis[i].index=uls[i].index=i;
				newLis[i].onmouseenter=uls[i].onmouseenter=function(){
					uls[this.index].style.display='block';
					newLis[this.index].className='active';
					subNav.style.opacity=1;
					
				};
				newLis[i].onmouseleave=uls[i].onmouseleave=function(){
					newLis[this.index].className='';
					subNav.style.opacity=0;
					uls[this.index].style.display='none';
				};
			}

			}
			
		}		
}