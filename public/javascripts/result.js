// var vmodel;
// avalon.ready(function(){
// 	vmodel = avalon.define({
// 		 $id: "info",
// 		 shareInfo: shareInfo,
// 		 vestInfo: vestInfo
// 	})
// 	avalon.scan()
//   console.log(vmodel.shareInfo);
//
// 	// 匹配答案
// 	// 与分享者匹配
// 	var flag = 0;
// 	for (var i = 0; i < 10; i++) {
// 	    if (selfAnser[i] == shareAnser[i]) {
// 	        flag++;
// 	    };
// 	};
//
// 	vmodel.shareInfo.match = flag;
//
// 	// 与10个马甲匹配
// 	var num = 0;
// 	for (var j = 0; j < vestInfo.length; j++) {
// 		var flag = 0;
// 		for (var i = 0; i < 10; i++) {
// 			if (selfAnser[i] == vestInfo[j].answer[i]) {
// 				flag++;
// 			};
// 		};
// 		vestInfo[j].match = flag;
// 	};
//
//
// 	 vmodel.vestInfo = vestInfo.sort(function(a,b){
// 	 	return b.match - a.match;
// 	 })
//
//
//
// })

new Vue({
  el: '#info',
  data: {
    message: 'Hello Vue.js!',
		shareInfo: shareInfo,
		vestInfo: vestInfo
  }
})




// alert(selfInfo.answer);

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
