document.addEventListener("click", clickEvent);
function clickEvent(e) {
  e.stopPropagation();
}

// 커스텀 달력 js
function setCalendar() {
  $(".wrap_calendar .date").datepicker({
    format: "yyyy-mm-dd",
    autoHide: true,
  });
}

/* 공통 레이어팝업 생성, 관련 이벤트 함수 */
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
  $(".pop_area").load(loadname + " .cp_admin_pop", function () {
    //ajax 메소드이므로 jqeury.js 필요
    let btn_close_pop = document.querySelector(".btn_close_pop");
    btn_close_pop.addEventListener("click", function () {
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
function onCerti(off) {
  //로그인 버튼 클릭
  const js_layer_certi = document.querySelector(".js-layer_certi");
  if (off == undefined) {
    js_layer_certi.classList.add("on");

    var fiveMinutes = 60 * 5,
      display = document.querySelector("#time");
    repeatTime(fiveMinutes, display);
  }
  if (off) {
    js_layer_certi.classList.remove("on");
    clearInterval(control_timer);
  }
}

function repeatTime(duration, display) {
  //5분 타이머
  var timer = duration,
    minutes,
    seconds;
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

function popFrchInfo(e) {
  //가맹점 기본정보, 계약관리
  popupUI("1");
}

/* ----------------------------
 * 계약관리 > 가맹점 ID 검색
 * -----------------------------*/
function popVariInit() {//레이어로 불러오는 가맹점 검색 팝업을 위한 초기화
	//조회조건 셀렉트박스 온오프
	const selectbox_area = document.querySelector('.js-selectbox');
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

  setTimeout(popVariInit, 1000);
}

//가맹점 ID 클릭하면 input에 입력하고 레이어 닫기
function insertCpid(e) {    
	const cp_id = e.target.textContent;
	const input_cpid = document.querySelector('.js-cp_id');

	input_cpid.value = cp_id;

	//닫기 버튼 트리거
	const evt = new MouseEvent('click');
	const click_btn = document.querySelector('.cp_admin_pop .btn_close_pop');
	
	click_btn.dispatchEvent(evt);
}


function tgSelectBox(e) {
  //셀렉트박스 온오프
  const tg = e.target;
  const toggle_tg = tg.closest(".selected_box");

  if (toggle_tg) {
    //selected_box 요소를 클릭하면
    if (toggle_tg.classList.contains("on")) {
      toggle_tg.classList.remove("on");
    } else {
      toggle_tg.classList.add("on");
      readyCloseLayer();
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
}

function readyCloseLayer() {
  //셀렉트박스가 on일 때만 실행
  document.addEventListener("click", function (e) {
    const toggle_tg = e.target.closest(".selected_box");

    if (!toggle_tg) {
      document.querySelector(".selected_box").classList.remove("on");
    }
  });
}

