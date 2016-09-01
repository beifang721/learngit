$(function() {
	var loadingimgs = ["../img/0.png", "../img/1.png", "../img/2.png", "../img/3.png", "../img/4.png", "../img/5.png", "../img/6.png", "../img/7.png", "../img/8.png", "../img/9.png", "../img/award-bg.png", "../img/award.png", "../img/backgame.png", "../img/baike-b.png", "../img/baike-off.png", "../img/baike-on.png", "../img/baike.png", "../img/baoxiang.png", "../img/bg.png", "../img/bomb.png", "../img/bombeffect.png", "../img/button-off.png", "../img/button-on.png", "../img/cake1.png", "../img/cake2.png", "../img/cake3.png", "../img/checkcake1.png", "../img/checkcake2.png", "../img/choose-1.png", "../img/choose-2.png", "../img/choose-3.png", "../img/choose-4.png", "../img/choose-5.png", "../img/choose-bg.png", "../img/choose-on.png", "../img/click-here.png", "../img/cover-bg.png", "../img/enter-on.png", "../img/faguang.png", "../img/gameover-bg.png", "../img/goods1.png", "../img/goods2.png", "../img/goods3.png", "../img/goods4.png", "../img/goods5.png", "../img/goods6.png", "../img/goods7.png", "../img/gunzi.png", "../img/hanxue-b.png", "../img/hanxue-off.png", "../img/hanxue-on.png", "../img/hanxue.png", "../img/liuyuxi-b.png", "../img/liuyuxi-off.png", "../img/liuyuxi-on.png", "../img/liuyuxi.png", "../img/loading.gif", "../img/lookscore-btn.png", "../img/mingdao-b.png", "../img/mingdao-off.png", "../img/mingdao-on.png", "../img/mingdao.png", "../img/playagain.png", "../img/rank.png", "../img/rusuan3.png", "../img/score-bg.png", "../img/score.png", "../img/share.png", "../img/shop-btn.png", "../img/start-bg.png", "../img/sugar1.png", "../img/sugar2.png", "../img/sugar3.png", "../img/t0.png", "../img/t1.png", "../img/t2.png", "../img/t3.png", "../img/t4.png", "../img/t5.png", "../img/t6.png", "../img/t7.png", "../img/t8.png", "../img/t9.png", "../img/time.png", "../img/title.png", "../img/xipan.png", "../img/xukaipin-b.png", "../img/xukaipin-off.png", "../img/xukaipin-on.png", "../img/xukaipin.png", "../img/yun1.png", "../img/yun2.png", "../img/yun3.png", "../img/yun4.png", "../img/yun5.png", "../img/yun6.png", "../img/yun7.png"];
	//加载图片的数目
	/*
	var imgNum = 0;
	console.log(loadingimgs.length)
	for(var i = 0; i < loadingimgs.length; i++){
		var objimg = new Image();
		objimg.src = loadingimgs[i];
		objimg.onload = function() {
			imgNum++;
			$(".loading").html(parseInt((imgNum / loadingimgs.length) * 100)+"%")
			if(imgNum > loadingimgs.length-1) {
				$('.loading-wrap').hide();
			}
		}
	}
	*/
	//阻止默认事件
	function stopEvent(evt) {
		var evt = evt || window.event;
		if(evt.preventDefault) {
			evt.preventDefault();
			evt.stopPropagation();
		} else {
			evt.returnValue = false;
			evt.cancelBubble = true;
		}
	}
	var srcName;
	//选定人物
	$(".player-herder img").click(function() {
		//获取索引值
		var i = $(this).index();
		var playername = $(".player-name span");
		//轮播图
		$(".select-person").css("left",-32.0 * i + "rem");
		playername.css('color',"#888888")
		playername.eq(i).css('color',"#f61")
		//点击之后把图片变为on
		$(this).attr('src',$(this).attr('src').replace('off','on'));
		//遍历除了点击之外的图片  将其变为off
		$(this).siblings().each(function() {
			$(this).attr('src',$(this).attr('src').replace('on','off'));
		})
		srcName = $(this).attr('alt');
//		console.log($(this).attr('alt'));
		//点击选定人物按钮  跳转到游戏界面
		$(".choose-btn").click(function(){
		$(".second-page").hide();
		$(".third-page").show();
		$("#select-perone").attr('src',"../img/"+ srcName + ".png" );
		})
	})
	//直接点击按钮时
	$(".choose-btn").click(function(){
		$(".second-page").hide();
		$(".third-page").show()
	})
	//武器伸长的方法
	var flag = true; //棍子是否收缩
	var gunzi = 0;
	var timer;
	var originalLegth = $(".gunzi").height();
	function changegunzi(){
		console.log(gunzi+"--"+originalLegth);
		gunzi = 0;
		timer =	setInterval(function(){	
			if (flag == true) {
				gunzi = gunzi + 10;
			}else{
				gunzi = gunzi - 10;
				$(".button-on").attr("src","../img/button-on.png");
			}
			//棍子变化的距离
			$(".gunzi").height(originalLegth + gunzi);
			if ($(".gunzi").height() <= originalLegth){
				$(".gunzi").height(originalLegth);
//				flag = true;
				$(".wuqi-wrap").css("-webkit-animation-play-state","running");
				clearInterval(timer);
				$(".wuqi-wrap .chuangjian").remove();
			}
			
		},10)
	}	

	//礼物
	var prizeImgArr = ["../img/bomb.png","../img/rusuan3.png","../img/sugar1.png","../img/sugar2.png","../img/sugar3.png","../img/baoxiang.png","../img/cake1.png","../img/cake2.png","../img/cake3.png","../img/checkcake1.png","../img/checkcake2.png","../img/baoxiang.png","../img/goods1.png","../img/goods2.png","../img/goods3.png","../img/goods4.png","../img/goods5.png","../img/goods6.png","../img/goods7.png"];
	function random(min,max){
		return parseInt(Math.random()*(max - min) + min);
	}
	//碰撞的方法
	function pengzhuang(){
		setInterval(function(){	
		//获取窗口的宽度
		var W = $(window).width();
		//获取吸盘到left的距离
		var xipanX = $(".xipan").offset().left;
		//获取窗口的高度
		var H = $(window).height();
		//获取吸盘距top的距离
		var xiPanY = $(".xipan").offset().top;
		//吸盘距离right距离
		var xipanRight = $(".xipan").offset().left + $(".xipan").width();
		if(xipanX <= 0 || W - $(".xipan").width() <= xipanX || H - $(".xipan").height() <= xiPanY) {
			flag = false;
		}
		//与云的碰撞
		$(".yun-wrap img").each(function() {
		//获取图片的距上距离
		var imgTop = $(this).offset().top;
		var imgLeft = $(this).offset().left;
		var imgRight = $(this).offset().left + $(this).width();
		
		var xipanRight = $(".xipan").offset().left + $(".xipan").width();
		var xiPanY = $(".xipan").offset().top + $(".xipan").height();
		if (xipanRight < imgRight && xipanX > imgLeft && xiPanY > imgTop && flag == true) {
			flag = false;
			var parent = $(this).parent();
			$(this).appendTo($(".wuqi-wrap"));
			//创建img
			var img = $("<img class = 'chuangjian' src = " + prizeImgArr[random(0,prizeImgArr.length)] + ">")
			setTimeout(function(){	
			$(img).appendTo(parent);
			},3000)
		}
		})
		},100)
		
	}
	
	
	//点击开始游戏按钮
	$(".button-on").click(function(){
		flag = true;
		changegunzi();
		pengzhuang();
		$(".button-on").attr("src","../img/button-off.png");
		$(".wuqi-wrap").css("-webkit-animation-play-state","paused");
	})	
	
	
	
	
	
	
	//倒计时 封装
	//function daojishi() {
	var timerImg = ["../img/t0.png", "../img/t1.png" ,"../img/t2.png","../img/t3.png","../img/t4.png","../img/t5.png","../img/t6.png","../img/t7.png","../img/t8.png","../img/t9.png"];
	var timering =300;
	var dingshiqi = setInterval(function() {
		timering--;
		//把时间转化为字符串
		var timerString = String(timering);
		//console.log(timerString = "0000");
		timering < 1000 && timering >= 100 ? timerString = "0" + timerString : timering < 100 && timering >= 10 ? timerString = "00" + timerString : timering < 10 && timering >= 0 ? timerString = "000" + timerString : timering < 0 ? timerString = "0000" : "";
		if(timering <= 0){
			clearInterval(dingshiqi);
		}
		var a = timerString.split("");
		//console.log(a[1]);
		$(".onetime").attr("src", timerImg[a[0]]);
		$(".twotime").attr("src", timerImg[a[1]]);
		$(".threetime").attr("src", timerImg[a[2]]);
		$(".fourtime").attr("src", timerImg[a[3]]);
		//console.log(timering);
	},10)
//	}
	
	//分数
	var scorImg = ["../img/0.png","../img/1.png","../img/2.png","../img/3.png","../img/4.png","../img/5.png","../img/6.png","../img/7.png","../img/8.png","../img/9.png"];
	
	
	
	
	
	
})
