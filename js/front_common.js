/* --------------------------------------
 * 공통 레이어팝업 생성, 관련 이벤트 함수
 * ----------------------------------------*/
function popupUI() {
  //생성
  var maskdiv = document.createElement("div");
  var pop_area = document.createElement("div");

  document.body.appendChild(pop_area);
  document.body.querySelector(".mj_header").before(maskdiv);

  maskdiv.classList.add("mask");
  pop_area.classList.add("pop_area");

  //파일명 가져오기
  var load_file_name = "history_detail.html";

  //파일 불러오기
  $(".pop_area").load(load_file_name + " .history_detail", function () {
    //ajax 메소드이므로 jqeury.js 필요
    document.addEventListener("click", eventPart);
  });

  function eventPart(e) {
    //레이어 온 상태에서만 실행되는 팝업 제거 이벤트 리스너
    e.stopPropagation();

    if (!e.target.closest(".history_detail")) {
      closeModal(pop_area, maskdiv);
    }
  }

  /* 공통 레이어팝업 삭제 함수 */
  function closeModal(pop_area, maskdiv) {
    const pop = pop_area;
    const mask = maskdiv;
    document.body.removeChild(mask);
    document.body.removeChild(pop);

    document.removeEventListener("click", eventPart); //클릭 이벤트 삭제
  }
}

// 페이지 로딩 중 함수
// var typed = new Typed("#typed", {
//   strings: ["페이지를 불러오는 중입니다. . ."],
//   typeSpeed: 0200,
//   onComplete: (self) => {
//     setTimeout(removeTyped, 500);
//   },
// });
function removeTyped() {
  document.querySelector("#typed").remove();
  document.querySelector(".typed-cursor").remove();
  // document.querySelector(".mj_header").style.zIndex = "100";

  // initAOS();
}

initAOS();
function initAOS() {
  AOS.init();
  document.querySelector(".mj_header").style.zIndex = "100";
}

/* -------------------
 * 디바이스 구분
 * ----------------*/
var EiwafDevice = {
  TYPE_DESKTOP: "desktop",
  TYPE_PHONE: "phone",
  TYPE_TABLET: "tablet",

  agent: {
    mobile: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(
      window.navigator.userAgent
    ),

    tablet: /iPad|tablet/i.test(window.navigator.userAgent),
  },

  detect: function () {
    if (this.type) {
      return;
    }

    if (this.agent.mobile) {
      var userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.search("android") > -1) {
        if (userAgent.search("mobile") == -1) {
          this.type = this.TYPE_TABLET;
        }
      }
      if (!this.type) {
        this.type = this.TYPE_PHONE;
      }
    }

    if (this.agent.tablet) {
      this.type = this.TYPE_TABLET;
    }

    if (!this.type) {
      this.type = this.TYPE_DESKTOP;
    }
  },
};

function deviceCheck() {
  //모바일과 타 디바이스의 history에서 다른 이벤트 구현
  EiwafDevice.detect();

  return EiwafDevice.type;
}

/* ---------------------------
 * 클릭이벤트, 헤더 업뎃
 * --------------------------- */
const my_tnb = document.querySelector(".my_tnb ul");
const tnb_li_items = my_tnb.querySelectorAll("li");
for (var i = 0; tnb_li_items.length > i; i++) {
  tnb_li_items[i].querySelector('a').addEventListener("click", function (e) {
    e.stopPropagation();

    const txt = this.getAttribute("data-name");
    did_scroll = false;
    setTnbActive(txt);
  });
}

/* ---------------------------
 * 클릭이벤트, 이메일 주소 복사
 * --------------------------- */
const email_address = document.querySelector(".email_address");
email_address.addEventListener("click", function (e) {
  e.preventDefault();

  const val = this.textContent;

  const temp_el = document.createElement("textarea");
  temp_el.value = val;
  document.body.appendChild(temp_el);

  temp_el.select();
  document.execCommand("copy");
  document.body.removeChild(temp_el);
});

/* ----------------------
 * 스크롤 이벤트
 * ----------------------*/
function getSectionTop() {
  //offsetTop 값 가져오기
  const introduce_height = document.querySelector(".mj_introduce").offsetTop -0;
  const skill_height = document.querySelector(".mj_skill").offsetTop - 50;
  const contact_height = document.querySelector(".mj_contact").offsetTop - 50;

  return [introduce_height, skill_height, contact_height];
}

function setTnbActive(tnb) {
  //tnb 온오프

  const nav = tnb.slice(0, 1).toUpperCase() + tnb.slice(1).toLowerCase();

  tnb_li_items.forEach(function (val) {
    val.classList.remove("on");

    const current_txt = val.querySelector('a').getAttribute('data-name');

    if (current_txt == nav) {
      val.classList.add("on");
      return false;
    }
  });
}

window.addEventListener("scroll", scrollEvent);

let did_scroll;
let last_st = 0;
let delta = 5;
const mj_header = document.querySelector(".mj_header");
let header_height = 0;

function scrollEvent(ev) {
  did_scroll = true;
  header_height = mj_header.clientHeight;
}

setInterval(function () {
  if (did_scroll) {
    hasScrolled();
    did_scroll = false;
  }
}, 250);

function hasScrolled() {
  //5만큼 보다 더 스크롤이 된다면

  var st = window.scrollY;

  if (Math.abs(last_st - st) <= delta) return;

  if (st < last_st && st > header_height) {
    // Scroll Up
    mj_header.classList.add("fixed");
    mj_header.classList.add("change_bg");
  }
  if (st < header_height) {
    //스크롤이 최상단
    mj_header.classList.remove("fixed");
    mj_header.classList.remove("change_bg");
  }

  last_st = st;

  //현재 스크롤의 섹션 위치
  const offsetTops = getSectionTop();
  let tnb = 0;

  if (last_st < offsetTops[0]) {
    tnb = "history";
  } else if (last_st > offsetTops[0] && last_st < offsetTops[1]) {
    tnb = "introduce";
  } else if (last_st > offsetTops[1] && last_st < offsetTops[2]) {
    tnb = "skill";
  } else if (last_st > offsetTops[2]) {
    tnb = "contact";
  }

  setTnbActive(tnb);
}

/* ------------------------
 * 클릭이벤트, history 업뎃
 * ------------------------ */
const history_img = document.querySelectorAll(".js-history_img");
for (let i = 0; i < history_img.length; i++) {
  history_img[i].addEventListener("click", changeHistoryDetail);
}

function changeHistoryDetail(ev) {
  const target = ev.target;
  const target_alt = target.getAttribute("alt");

  const device = deviceCheck();

  const mobile_els = device != 'phone' ? popupUI() : makeMobileEle();

  $.getJSON("/js/history.json", function (data) {
    const project = data[target_alt];

    //디바이스 무관 공통 데이터
    const site_name = project.name;
    const date_range = project.data_range;
    const end_service = project.end_service;

    if (device != "phone") {
      //mobile 이외 디바이스, 만들지 않고 파일을 가져와 변경한다     
      
      const history_item = document.querySelector(".history_detail");
      const site_desc = history_item.querySelector(".site_desc");

      const link = project.link;
      const intro = project.intro;
      const dev_tech = project.dev_tech;
      const dev_system = project.dev_system;
      const img_name = project.main_name;
      const code_view = project.code_view;
      const mobile = project.mobile;
      const tablet = project.tablet;
      const desktop = project.desktop;

      history_item.querySelector(".js-img").setAttribute("src", "images/history_" + img_name + ".jpg");

      if (code_view !== null) {
        history_item.querySelector(".js-view_code").setAttribute("href", "history/" + img_name + "/coding_list.html");
      } else if (code_view == null) {
        history_item.querySelector(".js-view_code").remove();
      }

      if (link !== undefined) {
        site_desc.querySelector('.site_link').setAttribute("href", link);
        site_desc.querySelector(".site_link").textContent = site_name;
      } else if (link == undefined) {
        site_desc.querySelector(".title_txt").textContent = site_name;
      }

      site_desc.querySelector(".site_intro").textContent = intro;
      site_desc.querySelector(".tech_txt").textContent = dev_tech;
      site_desc.querySelector(".sys_txt").textContent = dev_system;

      //디바이스 아이콘
      if (!mobile) {
        history_item.querySelector(".btn_mobile").remove();
      }
      if (!tablet) {
        history_item.querySelector(".btn_tablet").remove();
      }
      if (!desktop) {
        history_item.querySelector(".btn_desktop").remove();
      }

    } else {
      //모바일
      if (!ev.target.closest(".view_mode")) {
        //열려있는 박스가 있으면 지우기
        const history_main = document.querySelector(".history_main");
        const msd = document.querySelector(".m_site_desc");
        const history_item = history_main.querySelector(".view_mode");
        if (history_item != null) {
          history_item.classList.remove("view_mode");
          msd.remove();
        }
      }     

      const site_type = project.site_type;

      target.after(mobile_els);
      
      const item_box = target.closest(".history_item");
      item_box.classList.add("view_mode");
      
      const m_site_desc = item_box.querySelector(".m_site_desc");
      m_site_desc.querySelector(".site_title").textContent = site_name;

      if (site_type != null) {
        m_site_desc.querySelector(".site_type").textContent = site_type;
      }
    }

    //디바이스 무관 공통 데이터 화면 처리
    document.querySelector(".proj_range").textContent = date_range;  
    
    if (end_service != true ) {
      document.querySelector('.closed_mark').remove();
    } else if (end_service == true) {
      document.querySelector('.closed_mark').textContent = "서비스 종료";
    }
  });
}

function makeMobileEle() {
  //랩 생성
  const m_site_desc = document.createElement("div");
  m_site_desc.classList.add("m_site_desc");

  //컨텐츠 divs 생성
  const site_title = document.createElement("div");
  const proj_range = document.createElement("div");
  const closed_mark = document.createElement("div");
  const site_type = document.createElement("div");
  site_title.classList.add("site_title");
  proj_range.classList.add("proj_range");
  closed_mark.classList.add("closed_mark");
  site_type.classList.add("site_type");

  m_site_desc.appendChild(site_title);
  m_site_desc.appendChild(proj_range);
  m_site_desc.appendChild(closed_mark);
  m_site_desc.appendChild(site_type);

  return m_site_desc;
}
