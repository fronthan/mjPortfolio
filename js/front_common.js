   
var typed = new Typed('#typed', {
    strings: ['페이지를 불러오는 중입니다. . .'],
    typeSpeed: 0100,
    onComplete: (self) => {
        document.querySelector('#typed').remove();
        document.querySelector('.mj_header').style.zIndex = '100';
    }
  });
  
  
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
    
    $.getJSON('/js/history.json', function(data){        
        const project = data[target_alt];

        const site_name = project.name;
        const date_range = project.data_range;
        const intro = project.intro;
        const dev_tech = project.dev_tech;
        const dev_system = project.dev_system;

        const history_item = target.parentElement.parentElement;
        const site_desc = history_item.querySelector('.site_desc');

        site_desc.querySelector('.title_txt').textContent = site_name;
        site_desc.querySelector('.proj_range').textContent = date_range;
        site_desc.querySelector('.site_intro').textContent = intro;  
        site_desc.querySelector('.tech_txt').textContent = dev_tech;
        site_desc.querySelector('.sys_txt').textContent = dev_system;
    });

    
}