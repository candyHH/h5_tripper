

// 第一页显示2秒后，进入第一题
$(document).ready(function(){
	setTimeout(function(){
		$('.index').hide('slow');
		$('.question').show('slow');
	},2000);
})
// 点击音乐开关,音乐开启，图片转动，音乐暂停，图片复位
// $('.music-box').click(function(){
// 	$('#audio').

// })

var answer = [];
// var result;
$('.choice-info').click(function(){
	var type = $(this).attr('type');
	var data = $(this).parent().attr('data');
	console.log(data);
	answer.push(data);
	if (type == '1') {
		$('.step-1').hide('slow');
		$('.step-2').show('slow');
	}else if(type == '2') {
		$('.step-2').hide('slow');
		$('.step-3').show('slow');
	}else if(type == '3') {
		$('.step-3').hide('slow');
		$('.step-4').show('slow');
	}else if(type == '4') {
		$('.step-4').hide('slow');
		$('.step-5').show('slow');
	}else if(type == '5') {
		$('.step-5').hide('slow');
		$('.step-6').show('slow');
	}else if(type == '6') {
		$('.step-6').hide('slow');
		$('.step-7').show('slow');
	}else if(type == '7') {
		$('.step-7').hide('slow');
		$('.step-8').show('slow');
	}else if(type == '8') {
		$('.step-8').hide('slow');
		$('.step-9').show('slow');
	}else if(type == '9') {
		$('.step-9').hide('slow');
		$('.step-10').show('slow');
	}else if(type == '10') {
		// alert(anser);
		console.log(answer);
		answer = answer.join("-");
		// sessionStorage.setItem('result',anser);

		$.ajax({
			type : 'post'
			,url : 'post'
			,data : {
				name : selfInfo.nickname
				,answer : answer
				,img : selfInfo.img
				,openid : selfInfo.openid
			}
			,dataType : 'json'
			,success : function(data){
				alert('yes');
				window.location.href = 'result?selfid='+data.selfId+'&&shareid='+shareId+'&&flag=0';
				// sessionStorage.setItem('shareInfo', JSON.stringify(shareInfo));
				// sessionStorage.setItem('selfInfo',JSON.stringify(selfInfo));

			}
		})
	}
})
