const swiper = new Swiper('.similar-to-search-swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    autoHeight: false,
    loop: true,
    observer: true, // Watch for DOM changes
    observeParents: true, // Watch parent elements too
    navigation: {
      nextEl: '.btn-next',
      prevEl: '.btn-prev',
    },
    breakpoints: {
      600: {
            slidesPerView: 2,
      },
      830: {
            slidesPerView: 3,
      },
      1100: {
            slidesPerView: 4,
      },
      1400: {
            slidesPerView: 4,
      }
    },
  });
  
   const additionalServicesSwiper = new Swiper('.additional-services-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      autoHeight: false,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: '.next-carousel-button',
        prevEl: '.prev-carousel-button',
      },
      breakpoints: {
        400: { slidesPerView: 2,},
        830: { slidesPerView: 3 },
        1100: { slidesPerView: 4 },
        1400: { slidesPerView: 4 },
      },
      on: {
        slideChange: function () {
          const prevButton = document.querySelector('.prev-carousel-button');
          if (this.isBeginning) {
            prevButton.style.display = 'none';
          } else {
            prevButton.style.display = '';
          }
        },
        // Инициализируем скрытие кнопки при старте
        init: function () {
          const prevButton = document.querySelector('.prev-carousel-button');
          if (this.isBeginning) {
            prevButton.style.display = 'none';
          }
        }
      }
    });
    

function changeUserStatus(){
    console.log("The status of user was changed"); 
    if($(".user-header-menu .switch input[type='checkbox']").is(':checked')){
        $(".user-header .user-header-avatar").addClass("active");
    } else {
        $(".user-header .user-header-avatar").removeClass("active");
    }
}
  
function openFillBalanceModal(){
    $(".fill-balance-modal-block-container").removeClass("hidden");
}

 function togglePassword() {
    let input = document.getElementById("password");
    if (input.type === "password") {
        input.type = "text";
        $(".toggle-password").removeClass("hidden");
    } else {
        input.type = "password";
        $(".toggle-password").addClass("hidden");
        
    }
}

 function togglePasswordLogin() {
    let input = document.getElementById("password-login");
    if (input.type === "password") {
        input.type = "text";
        $(".toggle-password-login").removeClass("hidden");
    } else {
        input.type = "password";
        $(".toggle-password-login").addClass("hidden");
        
    }
}

window.onload=function(){
    changeUserStatus();
    /*$(".swiper-hidden").removeClass("swiper-hidden");*/

    $(".registration-and-login-block .register-button, .mobile-menu-register-button").on("click",function(){
       $(".fiwork-register-modal-container").css("opacity",0).removeClass("hidden").animate({"opacity": 1},300);
    });

    $(".close-fiwork-register-modal").on("click",function(){
        $(".fiwork-register-modal-container").animate({"opacity":0},300,function(){
            $(this).addClass("hidden");
        });
    });
    
    $(".registration-and-login-block .login-button").on("click",function(){
       $(".fiwork-login-modal-container").css("opacity",0).removeClass("hidden").animate({"opacity":1},300); 
    });

    $(".close-fiwork-login-modal").on("click",function(){
        $(".fiwork-login-modal-container").animate({"opacity":0},300,function(){
            $(this).addClass("hidden");
        });
    });
    
    $(".close-check-register-modal").on("click",function(){
        $(".check-register-modal-container").animate({"opacity":0},300,function(){
            $(this).addClass("hidden"); 
        });
    });
    
    $(".close-check-login-modal").on("click",function(){
       $(".check-login-modal-container").animate({"opacity":1},300,function(){
           $(this).addClass("hidden"); 
       });
    });
    
    if (localStorage.getItem('cookieAccepted') === 'true') {
        $('.cookies-policy-wrapper').hide();
    }else{
        $('.cookies-policy-wrapper').css("display","flex");
    }
    
    $(".footer-mobile-menu .footer-mobile-elem").on("click",function(){
        $(".footer-mobile-elem.active").removeClass("active");
        $(this).addClass("active");
    });
    

    // При клике — сохраняем и скрываем
    $('.cookie-ok-button').on('click', function () {
        localStorage.setItem('cookieAccepted', 'true');
        $('.cookies-policy-wrapper').fadeOut(300);
    });
    
    $(".user-header-menu .orderer-user-type").on("click",function(){
        $(".user-header-menu .user-type").removeClass("selected");
        $(this).addClass("selected");
        $(".user-header-menu .receive-orders").removeClass("active");
        $(".balance-select-text").addClass("hidden");
        $(".balance-select-text.get-out-money").removeClass("hidden");
    });
    
    $(".user-header-menu .freelancer-user-type").on("click",function(){
        $(".user-header-menu .user-type").removeClass("selected");
        $(this).addClass("selected");
        $(".user-header-menu .receive-orders").addClass("active");
        $(".balance-select-text").addClass("hidden");
        $(".balance-select-text.fill-money").removeClass("hidden");
    });
    
    
    $(".go-to-register-link").on("click",function(){
       $(".fiwork-register-modal-container").css("opacity",0).removeClass("hidden").animate({"opacity": 1},300);
        $(".fiwork-login-modal-container").animate({"opacity":0},300,function(){
            $(this).addClass("hidden");
        });
    });
    
    $(".go-to-login-link").on("click",function(){
        $(".fiwork-register-modal-container").animate({"opacity":0},300,function(){
            $(this).addClass("hidden");
        });
        $(".fiwork-login-modal-container").animate({"opacity":0},300,function(){
            $(this).addClass("hidden");
        });
    });
    
    $(".mobile-login-link").on("click",function(){
        $(".fiwork-login-modal-container").css("opacity",0).removeClass("hidden").animate({"opacity":1},300); 
    });
    
    $(".phone-header .burger-icon").on("click",function(){
        $(".phone-header").addClass("menu-activated"); 
        openMenu('menu-main'); 
    });
    
    $(".phone-header .close-menu-icon").on("click",function(){
        $(".phone-header").removeClass("menu-activated");
        $(".phone-header").css("max-width","100%");
    });
    
    $(".user-header-avatar, .balance-text .chevron-down").on("mouseenter",function(e){
        e.stopPropagation();
        $(".user-header-menu-container").toggleClass("hidden");
    });
    
    $(".user-header").on("mouseleave",function(){
        $(".user-header-menu-container").addClass("hidden");
    });
    
    $(".user-header .copy-icon").on("click", function () {
        const $icon = $(this);
        const username = $icon.closest(".user-username").text().trim();
    
        navigator.clipboard.writeText("https://fiwork.ru/"+username).then(() => {
            $icon.attr("src", "/img/icons/check.svg");
            $(".user-header .copy-icon").hide();
            $(".user-header .checkmark-icon").show();
            setTimeout(() => {
                $icon.attr("src", "/img/icons/copy.svg");
                $(".user-header .copy-icon").show();
                $(".user-header .checkmark-icon").hide();
            }, 3000);
        });
    });


    $(".user-header-menu").on("click",function(e){
        e.stopPropagation();
    });
    
    $(".user-header-menu .switch input").on("change", function() {
        $(".user-header-menu .receive-orders-text .receive-order-text").removeClass("active");
        
        if ($(this).is(":checked")) {
            $(".user-header-menu .receive-orders-text .receiving-orders").addClass("active"); 
        } else {
            $(".user-header-menu .receive-orders-text .not-working").addClass("active");
        }
    });
    
    $(".search-service-input").on("input", function () {
        if ($(this).val().trim().length > 0) {
            $(".search-button-container").removeClass("hidden");
        } else {
            $(".search-button-container").addClass("hidden");
        }
    });
    
    $(".clear-search-icon").on("click",function(){
        $(".search-button-container").addClass("hidden");
        $(".search-service-input").val('');  
    }); 

    
    /*Check-register-modal logic*/
    const inputs = document.querySelectorAll('.check-register-modal-container .code-input');

    inputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === "Backspace" && input.value === '' && index > 0) {
          inputs[index - 1].focus();
        }
      });
    });
    
    let timerDuration = 120; // кол. секунд
    let timerInterval;
    let checkRegisterTimerGoing=0;
    
    function startTimer() {
        if(checkRegisterTimerGoing!=0){
            return 0;
        }
        checkRegisterTimerGoing=1;
        let timeLeft = timerDuration;
        $(".check-register-modal-container #resendBtn").addClass("disabled");
        updateTimer(timeLeft);

        timerInterval = setInterval(function() {
            timeLeft--;
            updateTimer(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                checkRegisterTimerGoing=0;
                $(".check-register-modal-container #timer").text("");
                $(".check-register-modal-container #resendBtn").removeClass("disabled");
            }
        }, 1000);
    }

    function updateTimer(sec) {
        let m = Math.floor(sec / 60);
        let s = sec % 60;
        $(".check-register-modal-container #timer").text(` (${m}:${s < 10 ? "0"+s : s})`);
    }

    // клик по кнопке "Отправить повторно"
    $(".check-register-modal-container #resendBtn").click(function(e) {
        e.preventDefault();
        if (!$(this).hasClass("disabled")) {
            console.log("Код отправлен повторно!");
            startTimer();
        }
    });

    $(".register-modal-form-next-button").on("click",function(){
        $(".fiwork-register-modal-container").animate({"opacity":0},300,function(){
            $(this).addClass("hidden");
        });
        $(".check-register-modal-container").css("opacity",0).removeClass("hidden").animate({"opacity":1},300);
        startTimer();
        
    });
    
    $(".back-to-register-form-button").on("click",function(){
        $(".check-register-modal-container").animate({"opacity":0},300,function(){
            $(this).addClass("hidden");
        });
       $(".fiwork-register-modal-container").css("opacity",0).removeClass("hidden").animate({"opacity": 1},300);
    });
    
    /*End of check-register-modal logic*/
    
    
    /*Check-login-modal logic*/
    const checkLoginInputs = document.querySelectorAll('.check-login-modal-container .code-input');

    checkLoginInputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
          checkLoginInputs[index + 1].focus();
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === "Backspace" && input.value === '' && index > 0) {
          checkLoginInputs[index - 1].focus();
        }
      });
    });
    
    let loginTimerDuration = 120; // кол. секунд
    let loginTimerInterval;
    let checkLoginTimerGoing=0;
    
    function loginStartTimer() {
        if(checkLoginTimerGoing!=0){
            return 0;
        }
        
        checkLoginTimerGoing=1;
        let loginTimeLeft = timerDuration;
        $(".check-login-modal-container #resendBtn").addClass("disabled");
        loginUpdateTimer(loginTimeLeft);

        loginTimerInterval = setInterval(function() {
            loginTimeLeft--;
            loginUpdateTimer(loginTimeLeft);

            if (loginTimeLeft <= 0) {
                clearInterval(loginTimerInterval);
                checkLoginTimerGoing=0;
                $(".check-login-modal-container #timer").text("");
                $(".check-login-modal-container #resendBtn").removeClass("disabled");
            }
        }, 1000);
    }

    function loginUpdateTimer(sec) {
        let m = Math.floor(sec / 60);
        let s = sec % 60;
        $(".check-login-modal-container #timer").text(` (${m}:${s < 10 ? "0"+s : s})`);
    }

    // клик по кнопке "Отправить повторно"
    $(".check-login-modal-container #resendBtn").click(function(e) {
        e.preventDefault();
        if (!$(this).hasClass("disabled")) {
            console.log("Код отправлен повторно!");
            loginStartTimer();
        }
    });

    $(".login-modal-form-next-button").on("click",function(){
        $(".fiwork-login-modal-container").animate({"opacity":0},300,function(){
            $(this).addClass("hidden");
        });
        
        $(".check-login-modal-container").css("opacity",0).removeClass("hidden").animate({"opacity":1},300);
        loginStartTimer();
    });
    
    $(".back-to-login-form-button").on("click",function(){
        $(".check-login-modal-container").animate({"opacity":0},300,function(){
            $(this).addClass("hidden");
        });
        $(".fiwork-login-modal-container").css("opacity",0).removeClass("hidden").animate({"opacity":1},300);
    });
    
    /*End of check-register-modal logic*/
    
    /*accordion*/
      $(".accordion-header").on("click",function(){
            $(this).closest(".accordion").find(".accordion-header").removeClass("active");
            $(this).addClass("active");
      });
    /*end of accordion*/
    
    /*garland*/
    $(".garland-container .garlands-img").on("click",function(){
        if($(this).hasClass('gray')){
            $(this).removeClass("gray");
        }else{
            $(this).addClass("gray");
        }
    });
    /*end of garland*/
    
    /*start of language switch*/
    $(".lang-switch .seg").on("click",function(){
        $(".lang-switch .seg.active").removeClass("active");
        $(this).addClass("active");
    });
    
    
    $(".fiwork-footer .select-lang-wrapper .lang-option").on("click",function(){
       $(".fiwork-footer .lang-option.selected").removeClass("selected");
       $(this).addClass("selected");
       $(".fiwork-footer .lang-container .selected-lang").html($(this).html());
    });
    /*end of language switch*/
    
    $(".user-header-menu .switch").on("click change",function(){
        changeUserStatus();
    });
    
    $(".close-fill-balance-modal-block").on("click",function(){
        $(".fill-balance-modal-block-container").addClass("hidden");
    });
    
    $(".fill-balance-modal-block .select-payment-list .payment-method-elem").on("click",function(){
        $(".fill-balance-modal-block .select-payment-list .payment-method-elem").removeClass("selected");
        $(".fill-balance-modal-block .select-payment-method .payment-method-text").html($(this).html());
        $(this).addClass("selected");
    });
    
    $(".fill-balance-modal-block .enter-sum").on("input change",function(){
        var sum=$(this).val();
        if(sum>0){
            $(".fill-balance-modal-block .additional-sum-block").removeClass("hidden");
            $(".fill-balance-modal-block .result-sum-block").removeClass("hidden");
            $(".fill-balance-modal-block .result-sum-block .result-sum-text").text(parseInt(sum)+200);
        }else{
            $(".fill-balance-modal-block .additional-sum-block").addClass("hidden");
            $(".fill-balance-modal-block .result-sum-block").addClass("hidden");
        }
    });
    
   


}