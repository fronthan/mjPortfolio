$(function(){
	$(".date").datepicker({
		format: 'yyyy-mm-dd'
	});
	$('.depth1').on('mouseover', function () {
		$('.depth2, .bg_depth2').show();
	});
	$('.bg_depth2').on('mouseleave', function () {
		$('.depth2, .bg_depth2').hide();
	});
	
});

/* 공통 레이어팝업 함수 */
function popup_ui(page_num) {
	//생성
	var maskdiv = document.createElement('div');	
	var pop_area = document.createElement('div');	
	
	document.body.appendChild(pop_area);
	document.body.querySelector('#skipnavigation').before(maskdiv);
	
	$(maskdiv).addClass('mask');
	$(pop_area).addClass('pop_area');	

	var thisfilefullname = document.URL.substring(document.URL.lastIndexOf('/') + 1, document.URL.length);
	var thisfilename = thisfilefullname.substring(thisfilefullname.lastIndexOf('.'), 0);
	var loadname = thisfilename+'_'+page_num+'.html';
	
	$('.pop_area').load(loadname, function(){
		$('.pop_area').on('click', '.btn_close_pop', function(){
			$('.pop_area').html('');
			$('.mask, .pop_area').remove();
		});
	});


}