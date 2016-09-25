

// 第一页显示2秒后，进入第一题
$(document).ready(function(){
	setTimeout(function(){
		$('.index').hide('slow');
		$('.question').show('slow');


	},2000);
})

var anser = [];
var result;
$('.choice-info').click(function(){
	var type = $(this).attr('type');
	var data = $(this).parent().attr('data');
	anser.push(data);
	// console.log('anser'+ anser);
	// $('.step-1').addClass('hide');
	// $('.step-2').removeClass('hide');
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
		sessionStorage.setItem('result',anser);
		alert(result);
		// window.location.href='result';
	}
})








