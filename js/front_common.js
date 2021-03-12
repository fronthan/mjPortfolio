   
var typed = new Typed('#typed', {
    strings: ['페이지를 불러오는 중입니다. . .'],
    typeSpeed: 0100,
    onComplete: (self) => {
        document.querySelector('#typed').remove();
        document.querySelector('.mj_header').style.zIndex = '100';
    }
  });
  
  
  
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