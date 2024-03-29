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
      // this.data.rightNavOffsetTop = $('.side-nav__right').offset().top;

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
  apiKey: "AIzaSyD0QRE0tZs2dSKAGVmTKZOmi0mSqHrwdt8",
  authDomain: "vote-f9e4d.firebaseapp.com",
  projectId: "vote-f9e4d",
  storageBucket: "vote-f9e4d.appspot.com",
  messagingSenderId: "1072626044875",
  appId: "1:1072626044875:web:f63763350a93020ebdf04e",
  measurementId: "G-MR3DVRPR9X"
};
// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.database();

// 會員區
let member = db.ref('mainNum');

// 確認是否有會員
let memberOff = false;

//會員區
let mainNum = db.ref('mainNum');

// 投票區
let todos = db.ref('todos');

// 確認是否有投過
let todoOff = true;


// 已投幾人
// 頁面載入統計?
todos.once('value', function (snapshot) {
  let data = snapshot.val();
  let dataNum = Object.keys(data).length;
  console.log(dataNum);
  let mainNum = document.getElementById('MainNum');
  mainNum.innerText = dataNum;
})



// 取值
$('#send').on('click', function (e) {
  
  e.preventDefault();
  let NumID = $('#employeeID').val();
  let district1 = $('#district1').val();
  let district2 = $('#district2').val();
  let district3 = $('#district3').val();
  let district4 = $('#district4').val();
  let district5 = $('#district5').val();
  
  if (NumID === '') {
    alert('請輸入員工編號！')
  } else {
    $('.load-wrap').css('display', 'block');
    checkNum(NumID)
    checkVote(NumID)
    setTimeout(function () {
      // console.log(memberOff);
      // console.log(todoOff);
      // 判斷是否有會員
      if (memberOff) {
        memberOff = false;
        // 判斷是否投過票
        if (todoOff) {
          // console.log('送出...');
          vote(NumID, district1, district2, district3, district4)
          // alert('投票成功，謝謝')
        } else {
          $('.load-wrap').css('display', 'none');
          alert('查詢後，您已經投過票了。')
          $("#vote_form")[0].reset();
          todoOff = true;
        }
      } else {
        $('.load-wrap').css('display', 'none');
        alert('查詢後，您沒有投票資格。')
        $("#vote_form")[0].reset();
      }


    }, 1000)
  }




})

// 查詢會員
function checkNum(Numid) {
  member.once('value', function (snapshot) {
    let mainNum = snapshot.val();

    for (item in mainNum) {
      // console.log(mainNum[item].datas);
      if (mainNum[item].data == Numid) {
        // console.log('有一樣');
        memberOff = true
        // console.log(memberOff);

      }
    }

  })
}

// 查詢是否已投票
function checkVote(Numid) {
  todos.once('value', function (snapshot) {
    let todoNum = snapshot.val();
    // console.log(Numid);
    for (item in todoNum) {
      // console.log(todoNum[item].numm);
      if (todoNum[item].numm == Numid) {
        // console.log('有一樣');
        todoOff = false

      }
    }

  })
}
// 投票
function vote(Numid, d1, d2, d3, d4) {

  todos.push(
    {
      numm: Numid,
      d_1: d1,
      d_2: d2,
      d_3: d3,
      d_4: d4,

    }
  ).then(function () {
    $('.load-wrap').css('display', 'none');
    // vote_form
    $("#vote_form")[0].reset();
    let str = `
    <div class="btn_pic">
    <img src="img/check.png" alt="">
    <div class="pic_left"></div>
    <div class="right_box">
      <div class="pic_right"></div>
    </div>
    <div class="hideCheck"></div>
  </div>
    `;
    let btn_check = document.getElementById('btn_chenk');
    btn_check.innerHTML = str;

    setTimeout(function () {
      $('.btn_pic').remove();
    }, 4000)
  })
}



// 結算統計投票 只能一區一區統計 更改 datas的值
// todos.once('value', function (snapshot) {
//   // console.log(snapshot.val());
//   let arrayData = []
//   let data = snapshot.val();
//   for (item in data) {
//     // console.log(data[item].d1);
//     let datas = data[item].d_1;
//     arrayData.push(datas)

//   }
//   console.log(arrayData);

//   // 統計結果
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


// 匯入員工編號進資料庫
// let datas = [{"data":803583},
// {"data":805807},
// {"data":804842},
// {"data":806101},
// {"data":804820},
// {"data":805422},
// {"data":805433},
// {"data":805721},
// {"data":801719},
// {"data":805560},
// {"data":806783},
// {"data":805930},
// {"data":806475},
// {"data":806602},
// {"data":803406},
// {"data":804764},
// {"data":805987},
// {"data":806167},
// {"data":804616},
// {"data":804848},
// {"data":805749},
// {"data":800604},
// {"data":802087},
// {"data":806284},
// {"data":806201},
// {"data":801958},
// {"data":806647},
// {"data":804828},
// {"data":805176},
// {"data":806157},
// {"data":805406},
// {"data":805660},
// {"data":802869},
// {"data":805573},
// {"data":805994},
// {"data":806199},
// {"data":806766},
// {"data":805539},
// {"data":806185},
// {"data":801714},
// {"data":803940},
// {"data":804460},
// {"data":806424},
// {"data":806423},
// {"data":803413},
// {"data":802735},
// {"data":806280},
// {"data":803738},
// {"data":804759},
// {"data":806412},
// {"data":806200},
// {"data":804821},
// {"data":803862},
// {"data":806404},
// {"data":806767},
// {"data":804792},
// {"data":803439},
// {"data":802796},
// {"data":805945},
// {"data":801565},
// {"data":802347},
// {"data":805525},
// {"data":803120},
// {"data":802468},
// {"data":800655},
// {"data":801573},
// {"data":801598},
// {"data":802928},
// {"data":803912},
// {"data":804409},
// {"data":804705},
// {"data":804843},
// {"data":805153},
// {"data":805472},
// {"data":805500},
// {"data":805562},
// {"data":805695},
// {"data":805708},
// {"data":805780},
// {"data":806018},
// {"data":800652},
// {"data":801486},
// {"data":801729},
// {"data":802684},
// {"data":802826},
// {"data":802956},
// {"data":803761},
// {"data":803939},
// {"data":804928},
// {"data":805476},
// {"data":805484},
// {"data":805490},
// {"data":805995},
// {"data":801449},
// {"data":801977},
// {"data":803176},
// {"data":803209},
// {"data":803404},
// {"data":803436},
// {"data":803502},
// {"data":803814},
// {"data":804306},
// {"data":804822},
// {"data":805044},
// {"data":805541},
// {"data":805551},
// {"data":805620},
// {"data":800134},
// {"data":800312},
// {"data":801410},
// {"data":801754},
// {"data":802208},
// {"data":802313},
// {"data":806285},
// {"data":806958},
// {"data":801449}]

// mainNum.set(datas);

