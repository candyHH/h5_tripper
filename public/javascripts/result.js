
// var selfInfo = sessionStorage.getItem('selfInfo');
// var shareInfo = sessionStorage.getItem('shareInfo');
// alert(selfInfo);
// alert(shareInfo);

  $('.share-text-name').html(shareInfo.name);
    $('.potrait-img').attr('src',shareInfo.img);



var vmodel;
avalon.ready(function(){
	vmodel = avalon.define('info', function(vm){
		vm.shareInfo = shareInfo;
		vm.vestInfo = vestInfo;
		vm.match = '';
	});
})

// alert(selfInfo.answer);
// 匹配答案
var selfAnser = selfInfo.answer.split('-');
var shareAnser = shareInfo.answer.split('-');
for (var i = 0; i < vestInfo.length; i++) {
	vestInfo[i].answer = vestInfo[i].answer.split(',');
};

// 与分享者匹配
var flag = 0;
for (var i = 0; i < 10; i++) {
	if (selfAnser[i] == shareAnser[i]) {
		flag++;
	};
};
vm.shareInfo.match = flag;

// var flag = 0;

// for (var i = 0; i<10; i++) {
// 	if (selfAnser[1] == shareAnser[i]) {
// 		flag++;
// 	};
// };

// vm.match = flag*10 + '%';










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
