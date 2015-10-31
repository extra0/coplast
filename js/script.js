$(function(){

	// вызов фенсибокса
	$('.fancybox').fancybox();

	//  открываем список городов
	$('.toggle').click(function(){
		$('.header__city-list').slideToggle();
	});

	// слайдер на главной
	$('.slider__list').bxSlider({
		pager: false,
		auto: true,
		pause: 3000

	});

	// ф-я разбивки на разряды
	function numberWithCommas(x) {
		return x.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, "\$1 ");
	}

	$('.replace').each(function(){
		$(this).html(numberWithCommas($(this).html()));
	});

	// переключатель ссылок в инфоблоке
	$('.inform__link').click(function(){
		// стилизация ссылки
		$('.inform__link').removeClass('active');
		$(this).addClass('active');

		// меняем задний фон блока
		$('.inform__block').attr('style', $(this).attr('data-style'));

		// анимация
		$('.inform__number').addClass('active');
		$('.inform__text').addClass('active');
		setTimeout(function(){
			$('.inform__number').removeClass('active');
			$('.inform__text').removeClass('active');
		}, 300);

		// меняем контент в блоке
		$('.inform__number').attr('data-text', $(this).find('.inform__link-number').html());
		$('.inform__text').attr('data-text', $(this).find('.inform__link-text').html());

		setTimeout(function(){
			$('.inform__number').html($('.inform__number').attr('data-text'));
			$('.inform__text').html($('.inform__text').attr('data-text'));
		},400);
		

	});


});