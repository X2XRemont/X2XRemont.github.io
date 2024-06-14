$(document).ready(function(){

	$('.slider-block').slick({
		autoplay: true,
		autoplaySpeed: 5000,
		dots: true,
		adaptiveHeight: true,
		prevArrow: '.slider-arrow__prev',
		nextArrow: '.slider-arrow__next',
		appendDots: '.slider-dots',
		draggable: false
	});
	$('.slick-dots > li > button').html('');

	$('.main-menu__toggle').click(function(event) {
		event.preventDefault();
		$('.main-menu__link.open').toggle();
		$('.main-menu__link.close').toggle();
		$('.main-menu__toggle-item').slideToggle();
	});

	/* MAIN FORM - SEND MESSAGE */
	$("#main-form .form__btn").click(function () {
		var valid = true;
		var data = {};
		var t = $(this).parents('#main-form')
		data.name = $(t).find(".form__name").val();
		data.phone = $(t).find(".form__phone").val();
		data.message = $(t).find(".form__message").val();
		data.subject = 'Заявка на консультацию с сайта ';
		data.loadview = "ajax";
		if (data.name.length < 3) {
			valid = false;
			$(t).find(".form__name").addClass('invalid');
		};
		if (data.phone.length < 3) {
			valid = false;
			$(t).find(".form__phone").addClass('invalid');
		};

		if (valid) {
			$.ajax({
				type:"POST",
				url:"/action/contactform",
				data:data,
				success:function(data){
					$('.popup .modal').hide();
					// $(".popup .popup__block").append(data);
					$('.popup .popup__block').show();
					$(".popup").fadeIn();
					$(t).find(".form__name").val("");
					$(t).find(".form__phone").val("");
					$(t).find(".form__message").val("");
					goal('zayavka-online');
			   }
			});
		}
	});

	/* POPUP CLOSE */
	$('.popup-close').click(function(){
		$('.popup').fadeOut();
		// setTimeout(function(){
		// 	$(".popup__block").empty();
		// }, 2000);
		$(".form__name").val("");
		$(".form__phone").val("");
		$(".form__message").val("");
	});

	/* CALL FORM - OPEN */
	$("#call").click(function(event){
		event.preventDefault();
		$('.popup .popup__block').hide();
		$('.popup .modal').show();
		$(".popup").fadeIn();
	});
	/* CALL FORM - SEND MESSAGE */
	$("#call-form .form__btn").click(function (event) {
		var valid = true;
		var data = {};
		var t = $(this).parents('#call-form')
		data.name = $(t).find(".form__name").val();
		data.phone = $(t).find(".form__phone").val();
		data.subject = 'Заявка на звонок с сайта ';
		data.loadview = "ajax";
		if (data.phone.length < 3) {
			valid = false;
			$(t).find(".form__phone").addClass('invalid');
		};
		if (valid) {
			$.ajax({
				type:"POST",
				url:"/action/contactform",
				data:data,
				success:function(data){
					// $(".popup .popup__block").append(data);
					$('.popup .modal').fadeOut();
					$('.popup .popup__block').show();
					$(".popup").fadeIn();
					$(t).find(".form__name").val("");
					$(t).find(".form__phone").val("");
					goal('zakaz-zvonka');
				}
			});
		}
	});


	$("input").keyup(function () {
		if ($(this).val().length >= 3) {$(this).removeClass("invalid")}
	});
	$("textarea").keyup(function () {
		if ($(this).val().length >= 3) {$(this).removeClass("invalid")}
	});


	$("a[href^=tel]").click(function(){
		const tel = $(this).attr("href");
		goal('clickphone',{phone:tel});
	});
	$("a[href^=mailto]").click(function(){
		const mail = $(this).attr("href");
		goal('clickmail',{mail:mail});
	});
});


function goal(name,params) {
	if (window.gtag) {
		if (!params) {params = {}}
		gtag('event',name,params);
	}
	if (window.ym) {
		if (!params) {params = {}}
		ym(40257844, 'reachGoal',name,params);
	}
}