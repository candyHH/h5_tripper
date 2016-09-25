
var selfInfo = sessionStorage.getItem('selfInfo');
var shareInfo = sessionStorage.getItem('shareInfo');
alert(selfInfo);
alert(shareInfo);


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