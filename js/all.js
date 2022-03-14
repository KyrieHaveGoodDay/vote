// new
(function () {
  const normal = {
    data: {
      windowWidth: 0,
      windowScrollTop: 0,
      rightNavOffsetTop: 0,
    },

    // 右邊 Go top 按鈕
    goTopShow() {
      this.data.windowScrollTop >= 100
        ? $('.goTop').addClass('show')
        : $('.goTop').removeClass('show');
    },

    // 右邊 Go top click
    goTopEvt() {
      $('.goTop').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({ scrollTop: '0px' }, 300);
      });
    },

    // 錨點點擊滑動位置
    hashLink() {
      $('a.hash[href^="#"]').on('click', function (e) {
        e.preventDefault();
        const headerH = $('.header').height();
        const sideNavH = $('.side-nav__right').height() || 0;
        const targetTop = $($(this).attr('href')).offset().top;
        const scrollPos =
          normal.data.windowWidth < 768 ? targetTop - headerH - sideNavH : targetTop;
        $('html, body').stop().animate(
          {
            scrollTop: scrollPos,
          },
          300
        );
      });
    },

    // [桌機] 側邊選單 收合
    sideNavEvent() {
      const $sideNav = $('.side-nav');
      $sideNav.on('click', '.side-nav__btn > a', function (e) {
        e.preventDefault();
        $(this).parents('.side-nav').toggleClass('side-nav--hide');
      });
    },

    // [桌機] 右選單底 輪播 / 單一貼紙判斷
    rightNavSlider() {
      let rightSwiper = new Swiper('.right-swiper', {
        autoplay: {
          disableOnInteraction: false,
        },
        loop: true,
        init: false,
      });
      $('.right-swiper .swiper-slide').length > 1 && rightSwiper.init();
    },

    // [手機] 右選單 滾動置頂
    rightNavFixedTop() {
      if (this.data.windowScrollTop > this.data.rightNavOffsetTop) {
        $('.side-nav__right').addClass('fixed');
        $('.wrap').addClass('rightNavFixed');
      } else {
        $('.side-nav__right').removeClass('fixed');
        $('.wrap').removeClass('rightNavFixed');
      }
    },

    // [手機] 底部選單面版(後台)
    footerBoard() {
      // 手機底部選單
      const $SubMenuMobile = $('#SubMenuMobile'); // 分會場 面版外框
      const $SubMenuMobileUl = $('#SubMenuMobile ul'); // 分會場 面版選項
      let tl;

      // open board
      $('.footer-board__btn[data-btn]').on('click', function (e) {
        if (!e.target.classList.contains('footer-board__btn')) {
          return;
        }
        tl = gsap.timeline();
        const board = $(this).data('btn');
        const targetCloseBtn = $(`[data-close="${board}"]`);
        const targetBoard = $(`[data-board="${board}"]`);
        const targetBoardUl = targetBoard.find('ul');
        const targetBoardHeight = targetBoard.height();
        const targetBtn = $(this).find('.txt');
        const boardBtns = $('.footer-board__btn .txt');

        $('body').addClass('board--show');
        tl.to(targetBtn, { duration: 0.3, rotate: 90, opacity: 0 });
        tl.to(boardBtns, { duration: 0.1, scale: 0, opacity: 0, ease: 'back.in(2)' }, 0.08);
        tl.to(targetBoard, { duration: 0.2, y: 0 }, 0.12);
        tl.to(
          targetCloseBtn,
          { duration: 0.2, y: -(targetBoardHeight + 10), ease: 'back.out(1)' },
          0.18
        );
        tl.to(targetBoardUl, { duration: 0.3, y: 0, opacity: 1 }, 0.2);
      });

      // close event
      $('.wrap').on('click', (e) => {
        if (e.target.classList.contains('wrap') || e.target.classList.value === 'board--close') {
          closeBoard();
        }
      });

      // close board
      function closeBoard() {
        $('body').removeClass('board--show');
        tl.reverse();
      }
    },

    // 桌手 底部輪播
    footerSlider() {
      let footerSlider = new Swiper('.footer-slider > .swiper', {
        autoplay: {
          disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 5,
        loop: true,
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        },
      });
    },

    // window scroll event
    windowScroll() {
      $(window)
        .on('scroll', () => {
          this.data.windowScrollTop = $(window).scrollTop();
          // 右側 go top 按鈕
          this.goTopShow();
          // 右選單手機滾動置頂
          this.data.windowWidth < 768 && this.rightNavFixedTop();
        })
        .scroll();
    },

    // init
    init() {
      this.data.windowWidth = $(window).width();
      this.data.rightNavOffsetTop = $('.side-nav__right').offset().top;

      // event function
      this.windowScroll();
      this.goTopEvt();
      this.hashLink();
      // this.footerSlider();

      if (this.data.windowWidth < 768) {
        this.footerBoard();
      } else {
        this.sideNavEvent();
        this.rightNavSlider();
      }
    },
  };
  normal.init();
})();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAtWTk6JPjzIDkiRGY0Od3fDSJjPzr9Gt8",
  authDomain: "test-725c3.firebaseapp.com",
  databaseURL: "https://test-725c3-default-rtdb.firebaseio.com",
  projectId: "test-725c3",
  storageBucket: "test-725c3.appspot.com",
  messagingSenderId: "526890779679",
  appId: "1:526890779679:web:d1d7da94ee82141befc12a",
  measurementId: "G-GK36XDSR9T"
};
// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.database();


let todos = db.ref('todos');

// 結算統計投票
// todos.once('value', function (snapshot) {
//   // console.log(snapshot.val());
//   let arrayData = []
//   let data = snapshot.val();
//   for (item in data) {
//     // console.log(data[item].d1);
//     let datas = data[item].d2;
//     arrayData.push(datas)

//   }
//   console.log(arrayData);

//   const total_count = arrayData.reduce((obj, item) => {
//     if (item in obj) {
      
//       obj[item]++
//     } else {
//       obj[item] = 1
//     }
//     return obj
//   }, {})

//   console.log(total_count)
// })