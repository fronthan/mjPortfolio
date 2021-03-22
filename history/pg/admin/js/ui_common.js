document.addEventListener("click", clickEvent);
function clickEvent(e) {
  e.stopPropagation();
}

/* --------------------------------------
* 공통 레이어팝업 생성, 관련 이벤트 함수
* ----------------------------------------*/
function popupUI(page_num) {
	//생성
	var maskdiv = document.createElement("div");
	var pop_area = document.createElement("div");
  
	document.body.appendChild(pop_area);
	document.body.querySelector(".skip_navigation").before(maskdiv);
  
	maskdiv.classList.add("mask");
	pop_area.classList.add("pop_area");
  
	//파일명 가져오기
	var thisfilefullname = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.length);
	var thisfilename = thisfilefullname.substring(thisfilefullname.lastIndexOf("."), 0);
  
	var loadname = page_num.length > 1 ? page_num + ".html" : thisfilename + "_" + page_num + ".html";
  
	//파일 불러오기
	$(".pop_area").load(loadname + " .admin_pop", function () {
	  //ajax 메소드이므로 jqeury.js 필요
	  let btn_close_pop = document.querySelector(".btn_close_pop");
	  let btn_cnxl_pop = document.querySelector(".btn_cnxl");
	  
	  if(btn_cnxl_pop != null) {
		  btn_cnxl_pop.addEventListener("click", function () {
			closeModal(pop_area, maskdiv);
		  });
		}
	  
	  btn_close_pop.addEventListener("click", function () {
		closeModal(pop_area, maskdiv);
	  });
	});

	/* 공통 레이어팝업 삭제 함수 */
	function closeModal(pop_area, mask) {
	  document.body.removeChild(mask);
	  document.body.removeChild(pop_area);
	}
  }

/* ---------------------
* 디자인 커스텀 관련 공통 함수
* ---------------------*/
function setCalendar() {// 커스텀 달력 js
	$(".wrap_calendar .date").datepicker({
	  format: "yyyy-mm-dd",
	  autoHide: true,
	});
}

function tgSelectBox(e) {//셀렉트박스 온오프

	const tg = e.target;
	const toggle_tg = tg.closest(".selected_box");
	
	if (toggle_tg) {
	  //selected_box 요소를 클릭하면
	  if (toggle_tg.classList.contains("on")) {
		toggle_tg.classList.remove("on");
	  } else {
		toggle_tg.classList.add("on");
		ready_close_layer = readyCloseLayer();
	  }
	}
  }
  
  function changeText(e) {
	//선택한 li 의 글자로 바꾸기
	const tgt = e.target;
	const text = tgt.textContent;
  
	const current_on = document.querySelector(".selected_box.on");
	current_on.querySelector(".js-text").textContent = text;
  
	current_on.classList.remove("on");
	ready_close_layer = null;
  }
  
  function readyCloseLayer() {
	//셀렉트박스가 on일 때만 실행
	document.addEventListener("click", function (e) {
	  const toggle_tg = e.target.closest(".selected_box");
  
	  if (!toggle_tg) {
		document.querySelector(".selected_box").classList.remove("on");
		ready_close_layer = null;
	  }
	});
  }

/* ----------------------------
 * 가맹점 ID 검색
 * -----------------------------*/
function popVariInitCpId() {//레이어로 불러오는 가맹점 검색 팝업을 위한 초기화
	//조회조건 셀렉트박스 온오프
	const selectbox_area = document.querySelector('.js-selectbox');
	let ready_close_layer = null;
	selectbox_area.addEventListener('click', tgSelectBox);

	//조회조건 li item 선택        
	const tg_box = document.querySelector('.select_toggle_box');
	tg_box.addEventListener('click', changeText);

	//가맹점 ID 클릭하면
	const cpid_tds = document.querySelectorAll('.cpid_td');
	for(var i=0; cpid_tds.length > i; i++) {
		cpid_tds[i].addEventListener('click', insertCpid);
	}
}

function searchFrch(e) {
  popupUI("cp_account_pop");

  setTimeout(popVariInitCpId, 1000);
}

function insertCpid(e) {//가맹점 ID 클릭하면 input에 입력하고 레이어 닫기 
	const cp_id = e.target.textContent;
	const input_cpid = document.querySelector('.js-cp_id');

	input_cpid.value = cp_id;

	//닫기 버튼 트리거
	const evt = new MouseEvent('click');
	const click_btn = document.querySelector('.admin_pop .btn_close_pop');
	
	click_btn.dispatchEvent(evt);
}

/* ----------------------------
 *     가맹점 > 계약관리
 * -----------------------------*/
function popFrchNew(e) {//가맹점 계정관리, 계약관리 신규
	popupUI('1');
	setTimeout(popVariInitNormal, 1000);
}
function popFrchInfo(e) {//가맹점 계약관리 상세 보기
	popupUI('3');
}
function popVariInitNormal() {//가맹점 계정, 계약관리 신규 팝업 초기화
	const select_boxes = document.querySelectorAll('.js-selectbox');
	for (var i=0; select_boxes.length > i; i++) {
		select_boxes[i].addEventListener('click', tgSelectBox);
	}

	const toggle_boxes = document.querySelectorAll('.select_toggle_box');
	for (var i=0; toggle_boxes.length > i; i++) {
		toggle_boxes[i].addEventListener('click', changeText);
	}
}

function popVariInitCpInfo() {
	const js_search_frch_name = document.querySelector('.js-search_frch_name'); //가맹점명 검색버튼
	const js_search_menu_group = document.querySelector('.js-search_menu_group'); //메뉴그룹 검색 버튼
	if (js_search_frch_name !=null ){
		js_search_frch_name.addEventListener('click', popFrchName);
		
		js_search_menu_group.addEventListener('click', popMenuGroup);
	}

	//접근권한, 사용여부 셀렉트박스 클릭 온오프
	const selectbox_area = document.querySelectorAll('.js-selectbox');
	let ready_close_layer = null;
	for (var i=0; selectbox_area.length > i; i++) {
		selectbox_area[i].addEventListener('click', function(e){
			tgSelectBox(e, i);
		});
	}

	//셀렉트 li item 선택        
	const tg_boxes = document.querySelectorAll('.select_toggle_box');
	for (var i=0; tg_boxes.length > i; i++) {
		tg_boxes[i].addEventListener('click', changeText);
	}
}

/* ----------------------------
 *  대사관리 > 신용카드 대사
 * -----------------------------*/
function creditDaesaShow(e) {//상세보기
	popupUI('1');
}

/* ----------------------------
 *  시스템 > 공통코드 관리
 * -----------------------------*/
function sysCodeNew(e) {//신규코드 생성
	popupUI('1');
	setTimeout(popVariInitNormal, 1000);
}
function sysCodeModify(e) {//코드 수정
	popupUI('2');
	setTimeout(popVariInitNormal, 1000);
}

/* ----------------------------
 *  시스템 > 휴일관리
 * -----------------------------*/
function holidayNew(e) {//휴일 신규 생성
	popupUI('1');
	setTimeout(setCalendar, 1000);
	setTimeout(popVariInitNormal, 1000);
	
}
function holidayModify(e) {//휴일 수정
	popupUI('2');
	setTimeout(setCalendar, 1000);
	setTimeout(popVariInitNormal, 1000);
}

/* ----------------------------
 *  시스템 > 메뉴관리
 * -----------------------------*/
function menuNew(e) {//메뉴 신규 생성
	popupUI('2');
	setTimeout(popVariInitNormal, 1000);
}
function menuModify(e) {//메뉴 수정
	popupUI('3');
	setTimeout(popVariInitNormal, 1000);
}
function menuShow(e) {//메뉴 상세보기
	popupUI('1');
}