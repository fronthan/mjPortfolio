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

        document.addEventListener("click", function (e) {
            e.stopPropagation();

            if (! e.target.closest('.history_detail')) {
                closeModal(pop_area, maskdiv);
            }
        });	
	  
	});

	/* 공통 레이어팝업 삭제 함수 */
	function closeModal(pop_area, maskdiv) {
	  document.body.removeChild(maskdiv);
	  document.body.removeChild(pop_area);
	}
  }


// 페이지 로딩 중 함수
var typed = new Typed('#typed', {
    strings: ['페이지를 불러오는 중입니다. . .'],
    typeSpeed: 0050,
    onComplete: (self) => {
            
        setTimeout(removeTyped, 1000);
    }
});
function removeTyped () {
    document.querySelector('#typed').remove();
    document.querySelector('.typed-cursor').remove();
    document.querySelector('.mj_header').style.zIndex = '100';  
}
  
/* -------------------
 * 디바이스 구분 
 * ----------------*/
var EiwafDevice = {
	TYPE_DESKTOP: "desktop",
	TYPE_PHONE: "phone",
	TYPE_TABLET: "tablet",

	agent: {
		mobile: (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(window.navigator.userAgent)),

		tablet: (/iPad|tablet/i.test(window.navigator.userAgent))
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
	}
};

function deviceCheck() {
    EiwafDevice.detect();

    return EiwafDevice.type;
}


  /* ----------------------
  * 스크롤 이벤트
  * ----------------------*/
  window.addEventListener('scroll', scrollEvent);
  
  let did_scroll; 
  let last_st = 0;
  let delta = 5;
  const mj_header = document.querySelector('.mj_header');
  let header_height = 0;
  
  function scrollEvent(ev) {
      did_scroll = true;
      header_height = mj_header.clientHeight;
  }
  
  setInterval(function() {
      if (did_scroll) {
          hasScrolled();
          did_scroll = false; 
      }
  }, 250);
  
  function hasScrolled() {//5만큼 보다 더 스크롤이 된다면
  
      var st = window.scrollY;
      const window_h = window.outerHeight;
      const docu_h = document.body.clientHeight;
  
      if (Math.abs(last_st - st) <= delta) return;
  
      if (st > last_st && st > header_height){ // Scroll Down
          mj_header.classList.remove('fixed');
      } else { // Scroll Up
          mj_header.classList.add('fixed');
          mj_header.classList.add('change_bg');
  
          if (st < header_height) {
              mj_header.classList.remove('fixed');
              mj_header.classList.remove('change_bg');
          }
      }
      
      last_st = st;
  }


  /* ------------------------
  * 클릭이벤트, history 업뎃
  * ------------------------ */
const history_img = document.querySelectorAll('.js-history_img');
for (let i=0; i < history_img.length; i++) {
    history_img[i].addEventListener('click', changeHistoryDetail);
}

function changeHistoryDetail(ev) {
    const target = ev.target;
    const target_alt = target.getAttribute('alt');

    const device = deviceCheck();

    if ( device != 'phone' ) {//mobile 이외 디바이스, 만들지 않고 파일을 가져와 변경한다
        popupUI();
    
        $.getJSON('/js/history.json', function(data){
            const project = data[target_alt];
    
            const site_name = project.name;
            const date_range = project.data_range;
            const intro = project.intro;
            const dev_tech = project.dev_tech;
            const dev_system = project.dev_system;
            const img_name = project.main_name;
            const code_view = project.code_view;
    
            const history_item = document.querySelector('.history_detail');
            const site_desc = history_item.querySelector('.site_desc');
    
            history_item.querySelector('.js-img').setAttribute('src', "images/history_"+img_name+".jpg");
    
            if ( code_view !== null ) {
                history_item.querySelector('.js-view_code').setAttribute('href', 'history/'+img_name+"/coding_list.html");
            } else if ( code_view == null ) {
                history_item.querySelector('.js-view_code').remove();
            }
            
            site_desc.querySelector('.title_txt').textContent = site_name;
            site_desc.querySelector('.proj_range').textContent = date_range;
            site_desc.querySelector('.site_intro').textContent = intro;  
            site_desc.querySelector('.tech_txt').textContent = dev_tech;
            site_desc.querySelector('.sys_txt').textContent = dev_system;
        });
    } else { //모바일

        if ( ! ev.target.closest('.view_mode')) {//열려있는 박스가 있으면 지우기
            const history_main = document.querySelector('.history_main');
            const msd = document.querySelector('.m_site_desc');
            const history_item = history_main.querySelector('.view_mode');
            if (history_item != null ) {
                history_item.classList.remove('view_mode');
                msd.remove();
            };
        }

        const mobile_els = makeMobileEle();
        target.after(mobile_els);

        const item_box = target.closest('.history_item');
        item_box.classList.add('view_mode');

        $.getJSON('/js/history.json', function(data){
            const project = data[target_alt];
    
            const site_name = project.name;
            const date_range = project.data_range;
            const site_type = project.site_type;
            const end_service = project.end_service;

            const m_site_desc = item_box.querySelector('.m_site_desc');
            
            m_site_desc.querySelector('.site_title').textContent = site_name;
            m_site_desc.querySelector('.proj_range').textContent = date_range;
            if (end_service == true) {
                m_site_desc.querySelector('.closed_mark').textContent = '서비스 종료';
            }

            if (site_type != null) {
                m_site_desc.querySelector('.site_type').textContent = site_type;
            }            
        });
    }    
}

function makeMobileEle() {
    //랩 생성
    const m_site_desc = document.createElement('div');
    m_site_desc.classList.add('m_site_desc');

    //컨텐츠 divs 생성
    const site_title = document.createElement('div');
    const proj_range = document.createElement('div');
    const closed_mark = document.createElement('div');
    const site_type = document.createElement('div');
    site_title.classList.add('site_title');
    proj_range.classList.add('proj_range');
    closed_mark.classList.add('closed_mark');
    site_type.classList.add('site_type');

    m_site_desc.appendChild(site_title);
    m_site_desc.appendChild(proj_range);
    m_site_desc.appendChild(closed_mark);
    m_site_desc.appendChild(site_type);

    return m_site_desc;
}