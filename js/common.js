window.yx={
	g:function(name){
		return document.querySelector(name);
	},
	ga:function(name){
		return document.querySelectorAll(name);
	},
	addEvent:function(obj,ev,fn){
		if(obj.addEventListener){
			obj.addEventListener(ev,fn);
		}else{
			// ie
			obj.attachEvent('on'+ev,fn);
		}
	},
	removeEvent:function(obj,ev,fn){
		if(obj.removeEventListener){
			obj.removeEventListener(ev,fn);
		}else{
			obj.detachEvent('on'+ev,fn);
		}
	},
	getTopValue:function(obj){		//获取元素离html的距离
		var top=0;
		while(obj.offsetParent){
			top+=obj.offsetTop;
			obj=obj.offsetParent;
		}
		
		return top;
	},
	cutTime:function(target){	//倒计时
		var currentDate=new Date();
		var v=Math.abs(target-currentDate);
		
		return {
			d:parseInt(v/(24*3600000)),
			h:parseInt(v%(24*3600000)/3600000),
			m:parseInt(v%(24*3600000)%3600000/60000),
			s:parseInt(v%(24*3600000)%3600000%60000/1000)
		};
	},
	format:function(v){		//给时间补0
		return v<10?'0'+v:v;
	},
	formatDate:function(time){
		var d=new Date(time);
		return d.getFullYear()+'-'+yx.format(d.getMonth()+1)+'-'+yx.format(d.getDate())+' '+yx.format(d.getHours())+':'+yx.format(d.getMinutes());
	},
	parseUrl:function(url){		//把url后面的参数解析成对象
		//id=1143021
		var reg=/(\w+)=(\w+)/ig;
		var result={};
		
		url.replace(reg,function(a,b,c){
			result[b]=c;
		});
		
		return result;
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
			// console.log(newLis);
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
			
			yx.addEvent(window,'scroll',setNavPos);
			setNavPos();
			var top=nav.offsetTop;		//这是新加的，解决bug
			function setNavPos(){
				nav.id=window.pageYOffset>nav.offsetTop?'navFix':'';
			}
			

		},

		shopFn(){// 购物车功能
			
			// 购物车的滚动条功能
			scrollFn()
			function scrollFn(){
				var contentWrap=yx.g('.cart .list');
				var content=yx.g('.cart .list ul');
				var scrollBar=yx.g('.cart .scrollBar');
				var slide=yx.g('.cart .slide');
				var slideWrap=yx.g('.cart .slideWrap');
				var btns=yx.ga('.scrollBar span');
				var timer;
				
				//倍数（用来设置滚动条的高度）
				var beishu=content.offsetHeight/contentWrap.offsetHeight;
				//设置滚动条显示与否
				scrollBar.style.display=beishu<=1?'none':'block';
				
				//给倍数一下最大值
				if(beishu>20){
					beishu=20;
				}
				
				//内容与内容的父级的倍数与滑块与滑块父级的倍数是相等的
				slide.style.height=slideWrap.offsetHeight/beishu+'px';
				
				
			}		
		},
		lazyImgFn:function(){		//图片懒加载功能
			yx.addEvent(window,'scroll',delayImg);
			delayImg();
			function delayImg(){
				// console.log(1)
				var originals=yx.ga('.original');		//所有要懒加载的图片
				var scrollTop=window.innerHeight+window.pageYOffset;		//这个距离是可视区的高度与滚动条的距离之和
				
				for(var i=0;i<originals.length;i++){
					//如果图片离html的上边的距离小于滚动条的距离与可视区的距离之和的话，就表示图片已经进入到可视区了
					if(yx.getTopValue(originals[i])<scrollTop){
						originals[i].src=originals[i].getAttribute('data-original');
						originals[i].removeAttribute('class');	//如果这个图片的地址已经换成真实的地址了，那就把它身上的class去掉，为了再次获取不到这张图片
					}
				}
				
				if(originals[originals.length-1].getAttribute('src')!='images/empty.gif'){
					//当这个条件成立的时候，说明现在所有的图片的地址都已经换成真实的地址了，这个时候就不需要再执行这个函数了
					yx.removeEvent(window,'scroll',delayImg);
				}
			}
		},
		backUpFn:function(){			//回到顶部功能
			var back=yx.g('.back');
			var timer;
			back.onclick=function(){
				var top=window.pageYOffset;
				
				timer=setInterval(function(){
					top-=150;
					if(top<=0){
						top=0;
						clearInterval(timer);
					}
					
					window.scrollTo(0,top);
				},16);
			};
		}
			
	}		
}