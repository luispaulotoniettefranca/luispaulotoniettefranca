var swiperV;

$(function(){
	//SLIDER
	var swiperH = new Swiper('.swiper-container-h', {
		spaceBetween: 0,
		pagination: {
			el: '.swiper-pagination-h',
			clickable: true,
		},
		speed: 1000,
	});
	var swiperV = new Swiper('.swiper-container-v', {
		direction: 'vertical',
		spaceBetween: 0,
		pagination: {
			el: '.swiper-pagination-v',
			clickable: true,
		},
		mousewheel: true,
		speed: 1000,
	});

	swiperV.on('slideChange', function () {
		setTimeout(function(){
			if($('.swiper-container-v>.swiper-wrapper>.swiper-slide').first().hasClass('swiper-slide-active')){
				$('nav').fadeOut('fast');
			} else {
				$('nav').fadeIn('fast');
			}
			var slideActive = swiperV.activeIndex - 1;
			if(slideActive == -1){
				$('.menu ul li').removeClass('active');
			} else if (slideActive == 4){
				slideActive = 3
				$('.menu ul li').removeClass('active');
				$('.menu ul li').eq(slideActive).addClass('active');
			} else {
				$('.menu ul li').removeClass('active');
				$('.menu ul li').eq(slideActive).addClass('active');
			}
		},100);
	});

	//NAVEGADORES
	var is_opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var is_Edge = navigator.userAgent.indexOf("Edge") > -1;
    var is_chrome = !!window.chrome && !is_opera && !is_Edge;
    var is_explorer= typeof document !== 'undefined' && !!document.documentMode && !is_Edge;
    var is_firefox = typeof window.InstallTrigger !== 'undefined';
	var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

	//AJUSTES SAFARI
	if($(window).width() < 1100 && is_safari){
		var height = window.innerHeight ? window.innerHeight : $(window).height();
		$('section, .menu').height(height);
		$('.mouse-down').css({'bottom':'20px'});
	}

	//MENU MOBILE
	$('.btn-menu').on('click',function(){
		$('main').toggleClass('menu-active');
		$('.menu').toggleClass('active')
		$('header nav .btn-menu').fadeToggle('fast');
	});

	//VOLTA AO TOPO
	$('.logo').click(function() {
  		$("html, body").animate({ scrollTop: 0 }, "slow");
  	});

	//LINKS MENU
	$('.menu ul li').on('click','a',function(){
		var slide = parseInt($(this).parents('li').attr('slide'))
		swiperV.slideTo(slide, 1000, false);
		$('main').removeClass('menu-active');
		$('.menu').removeClass('active')
		$('header nav, .btn-menu').fadeIn('fast');
		$('.menu ul li').removeClass('active');
		$(this).parents('li').addClass('active');
	});

	//LINK LOGO
	$('nav').on('click','.logo',function(){
		swiperV.slideTo(0, 1000, false);
		$('.menu ul li').removeClass('active');
	});

	//VIDEO CASES
	$('video').each(function(){
		$(this).trigger('play');
	});

	$(document).on('click','.btn-play',function(){
		var id = $(this).attr('id');
		$('.video>div>iframe').attr('src','https://www.youtube.com/embed/'+id+'?rel=0');
		$('.bg-video').fadeIn('fast');
	});
	$('.video').on('click','.close-video',function(){
		$('.video>div>iframe').removeAttr('src');
		$('.bg-video').fadeOut('fast');
	});
});

