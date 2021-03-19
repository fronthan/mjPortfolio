document.addEventListener('click', clickEvent);

function clickEvent(ev) {
  ev.stopPropagation();
}

/* -----------------------
 *    pay_credit1.html
 *    신용카드결제 약관동의
 *------------------------ */
function chkTerms(e) {
  e.stopPropagation();

  const tg = e.target;
  const attr = tg.checked;

  if (tg === js_payterm_all) {
    selectTermsAll(attr);
    return;
  }

  if (attr == true) {
    //개별 약관 동의 체크
    for (var i = 0; js_payterms.length > i; i++) {
      const all_chk_no = js_payterms[i].checked == false;
      if (all_chk_no) {
        js_payterm_all.checked = false;
        return false;
      }
    }
    js_payterm_all.checked = true;
    return;
  } else {
    js_payterm_all.checked = false;
  }
}

function selectTermsAll(attr) {
  //전체약관동의 체크
  let yn = 0;
  if (attr) js_payterm_all.checked = attr;
  else if (!attr) {
    yn = js_payterm_all.checked;
  }

  for (var i = 0; js_payterms.length > i; i++) {
    const result_yn = attr ? attr : yn;
    js_payterms[i].checked = result_yn;
  }
}

/* -----------------------
 *    pay_credit2.html
 *  신용카드결제 카드정보입력
 *------------------------ */
function selectCardMost(e) {
  const tg = e.target;

    const tg_li = tg.closest(".card_item");
    const pre_li = js_select_card.querySelector(".active");

    if (pre_li != null && tg_li != pre_li) {//이전 active li가 현재 클릭한 li가 아닐 때 (null이 아닌 경우 조건은 필수)
      tg_li.classList.add("active");
      pre_li.classList.remove("active");
    } else {
      tg_li.classList.toggle("active");
    }
}

function tgSelectBox(e) {//셀렉트박스 온오프
  const tg = e.target;
  const toggle_tg = tg.closest('.selected_box');

  if (toggle_tg) {//selected_box 요소를 클릭하면
    if(toggle_tg.classList.contains('on')) {
      toggle_tg.classList.remove('on');
    } else {
      toggle_tg.classList.add('on');
    }
  } else if (!toggle_tg) {//셀렉트레이어가 열려있을 때 영역 밖을 클릭하면
    closeLayer();
  }

}

function changeText(e) {//선택한 li 의 글자로 바꾸기
  const tgt = e.target;
  const text = tgt.textContent;

  const current_on = document.querySelector('.selected_box.on');

 current_on.querySelector('.js-text').textContent = text;

 if (current_on.getAttribute('id') == 'card_company') {//기타 카드사 선택 시
   const card_items = js_select_card.querySelectorAll('.card_item');
   for(var i=0; card_items.length > i; i++) {//이미 선택된 카드 1번이 있다면
     if (card_items[i].classList.contains('active')) {
      card_items[i].classList.remove('active');
     }
   }
 }

 closeLayer();
}

function closeLayer(e) {//모든 열린 레이어 닫기
  //기타 카드사
  const yn_a = js_cmn_card.querySelector('.selected_box.on');
  const yn_b = js_inst_range.querySelector('.selected_box.on');

  if (yn_a !== null) {
    js_cmn_card.querySelector('.selected_box').classList.remove('on');
  }
  if (yn_b !== null) {
    js_inst_range.querySelector('.selected_box').classList.remove('on');
  }
}

