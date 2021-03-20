document.addEventListener('click', clickEvent);
function clickEvent(e) {
	e.stopPropagation();
}

// 커스텀 달력 js
function setCalendar() {
	$(".wrap_calendar .date").datepicker({
		format: 'yyyy-mm-dd',
		autoHide: true
	});
}

/* 공통 레이어팝업 생성, 관련 이벤트 함수 */
function popupUI(page_num) {
	//생성
	var maskdiv = document.createElement('div');	
	var pop_area = document.createElement('div');	
	
	document.body.appendChild(pop_area);
	document.body.querySelector('.skip_navigation').before(maskdiv);
	
	maskdiv.classList.add('mask');
	pop_area.classList.add('pop_area');

	//파일명 가져오기
	var thisfilefullname = document.URL.substring(document.URL.lastIndexOf('/') + 1, document.URL.length);
	var thisfilename = thisfilefullname.substring(thisfilefullname.lastIndexOf('.'), 0);

	var loadname = page_num.length > 1 ? page_num+'.html' : thisfilename+'_'+page_num+'.html';
	
	//파일 불러오기
	$('.pop_area').load(loadname+' .cp_admin_pop', function(){//ajax 메소드이므로 jqeury.js 필요
		let btn_close_pop = document.querySelector('.btn_close_pop');	
		btn_close_pop.addEventListener('click', function(){
			closeModal(pop_area, maskdiv);
		});
	});
}

/* 공통 레이어팝업 삭제 함수 */
function closeModal(pop_area, mask) {
	document.body.removeChild(mask);
	document.body.removeChild(pop_area);
}


/* ------------------------
*  메인 - 로그인 
* -------------------------*/
function onCerti(off) {//로그인 버튼 클릭
	const js_layer_certi = document.querySelector('.js-layer_certi');
	if (off == undefined) {
		js_layer_certi.classList.add('on');
	
		var fiveMinutes = 60 * 5,
			display = document.querySelector('#time');
		repeatTime(fiveMinutes, display);
	}
	if (off) {
	 	js_layer_certi.classList.remove('on');
		clearInterval(control_timer);
	 }
}

function repeatTime(duration, display) {//5분 타이머
	var timer = duration, minutes, seconds;
	control_timer = setInterval(function () {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		display.textContent = minutes + ":" + seconds;

		if (--timer < 0) {
			timer = duration;
		}
	}, 1000);
}

function popFrchInfo(e) {//가맹점 기본정보, 계약관리
	popupUI('1');
}

/* ----------------------------
* 계약관리 > 가맹점 ID 검색
* -----------------------------*/
function searchFrch(e) {
	popupUI('cp_account_pop');
}




// function cpid_pop() {//가맹점 > 기본정보 검색 (mj 추가)
//     $mask.addClass('mask');
//     $('.pop_area').load('/cp/view/cp_account_pop.php', function () {
//         $(document).on('click', '.cpid_td', function(){
//             var cp_id = $(this).text();
//             $('.pop_area .btn_close').trigger('click');
//             $('.mt_id').val(cp_id);
//         });
        
//     });
// }