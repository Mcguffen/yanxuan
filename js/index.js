//公用方法调用
yx.public.navFn();
yx.public.lazyImgFn();
yx.public.backUpFn()

//banner图轮播
var bannerPic=new Carousel();
bannerPic.init({
	id:'bannerPic',
	autoplay:true,
	intervalTime:3000,
	loop:true,
	totalNum:5,
	moveNum:1,
	circle:true,
	moveWay:'opacity'
});

//新品首发轮播图
var newProduct=new Carousel();
newProduct.init({
	id:'newProduct',
	autoplay:false,
	intervalTime:3000,
	loop:false,
	totalNum:8,
	moveNum:4,
	circle:false,
	moveWay:'position'
});
// 在loop：false时，也就是轮播内容不循环的时候，当轮播内容到头改变按钮 < 或 > 的颜色
newProduct.on('rightEnd',function(){
	//alert('右边到头了');
	this.nextBtn.style.background='#E7E2D7';
});
newProduct.on('leftEnd',function(){
	//alert('左边到头了');
	this.prevBtn.style.background='#E7E2D7';
});
newProduct.on('leftClick',function(){
	//alert('左边点击了');
	this.nextBtn.style.background='#D0C4AF';
});
newProduct.on('rightClick',function(){
	//alert('右边点击了');
	this.prevBtn.style.background='#D0C4AF';
});

// 大家都在说首发轮播图
var sayPic=new Carousel();
sayPic.init({
	id:'sayPic',
	autoplay:false,
	intervalTime:3000,
	loop:true,
	totalNum:6,
	moveNum:3,
	circle:false,
	moveWay:'position'
});


