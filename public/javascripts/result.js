

var match_text = [
	'无法分辨你们的差异，系统已经宕机，跪求赶紧出行。',
	'系统显示差一点你们就能合体出行。',
	'还可以，缺一点也可以一起出行嘛~',
	'另外的30%大概是留在宇宙黑洞了。',
	'踏上及格线，友情勉强稳固住了！',
	'系统显示要么你的灵魂要么ta的肉体，还在旅途之中忘记归来。',
	'友情破裂拳重重袭来！接受旅途中的狂风吧！',
	'这靠谱程度简直岌岌可危，然而还可以抢救一下！',
	'不好意思，你们只是路过一下。',
	'系统显示你们离革命的成功友情仿佛破裂啊。',
	'推荐你们分开旅行'
]
match_text = match_text.reverse();

	// 匹配答案
	// 与分享者匹配
	var flag = 0;
	for (var i = 0; i < 10; i++) {
	    if (selfAnser[i] == shareAnser[i]) {
	        flag++;
	    };
	};
	shareInfo.match = flag;
	// console.log(shareInfo.match);


	// 与10个马甲匹配
	var num = 0;
	for (var j = 0; j < vestInfo.length; j++){
		var flag = 0;
		for (var i = 0; i < 10; i++) {
			if (selfAnser[i] == vestInfo[j].answer[i]) {
				flag++;
			};
		};
		vestInfo[j].match = flag;
  	}
  	vestInfo = vestInfo.sort(function(a,b){
	 return b.match - a.match;
	})
	// console.log(vestInfo,match_text);

	new Vue({
	  el: '#info',
	  data: {
	    message: 'Hello Vue.js!',
			shareInfo: shareInfo,
			vestInfo: vestInfo,
			match_text: match_text[shareInfo.match]
	  }
	})


// 点击马甲头像，跳出弹框
$('.vest').click(function(){
	$('.open-box').removeClass('hide');
})
$('.follow').click(function(){
	alert('链接到APP下载页面');
})
$('.close').click(function(){
	$('.open-box').addClass('hide');
})

// 点击分享
$('.btn-share').click(function(){
	$('.share-intro').removeClass('hide');
})
