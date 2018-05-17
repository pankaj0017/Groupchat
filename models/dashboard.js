var status = 0;
$(function(){
			$('.buttonBox').click(function(){
		if(status == 0){
			$('.dashArrow').attr('src','/public/img/right.png');
			$('.sideBar').removeClass('col-sm-2').addClass('col-sm-1');
			$('.mainContent').removeClass('col-sm-10').addClass('col-sm-11');
			$('.mainContent').removeClass('content_left_2').addClass('content_left_1');
			status = 1;
		}else{
			$('.dashArrow').attr('src','/public/img/left.png');
			$('.sideBar').removeClass('col-sm-1').addClass('col-sm-2');
			$('.mainContent').removeClass('col-sm-11').addClass('col-sm-10');
			$('.mainContent').removeClass('content_left_1').addClass('content_left_2');
			status = 0;
		}
	});
});