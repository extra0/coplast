$(function() {

	// вызов фенсибокса
	$('.fancybox').fancybox();

	// маска на телефон
	$('.mask').mask('+9 (999) 999-99-99');

	//  открываем список городов
	$('.toggle').click(function() {
		$('.header__city-list').slideToggle();
	});

	// слайдер на главной
	$('.slider__list').bxSlider({
		pager: false,
		// auto: true,
		pause: 7000,
		adaptiveHeight: true
	});

	$('.slider__img').bxSlider({
		pager: true,
		controls: false
	});

	// ф-я разбивки на разряды
	function numberWithCommas(number) {
		return number.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, "\$1 ");
	}

	$('.replace').each(function() {
		$(this).html(numberWithCommas($(this).html()));
	});

	// переключатель ссылок в инфоблоке
	$('.inform__link').click(function() {
		// стилизация ссылки
		$('.inform__link').removeClass('active');
		$(this).addClass('active');

		// меняем задний фон блока
		$('.inform__block').attr('style', $(this).attr('data-style'));

		// анимация
		$('.inform__number').addClass('active');
		$('.inform__text').addClass('active');
		setTimeout(function() {
			$('.inform__number').removeClass('active');
			$('.inform__text').removeClass('active');
		}, 300);

		// меняем контент в блоке
		$('.inform__number').attr('data-text', $(this).find('.inform__link-number').html()); // вносим в дата атрибут текст текущей ссылки
		$('.inform__text').attr('data-text', $(this).find('.inform__link-text').html());

		setTimeout(function() {
			$('.inform__number').html($('.inform__number').attr('data-text')); // меняем текст в основном блоке
			$('.inform__text').html($('.inform__text').attr('data-text'));
		}, 400);
	});

	// ползунок квадратуры
	$(".calculation__slider").slider({
		range: "min",
		value: 20,
		min: 20,
		max: 400,
		slide: function(event, ui) {
			$(".calculation__amount").val(ui.value);
		},
		stop: function(event, ui) {
			calculation();
		}
	});
	$(".calculation__amount").val($(".calculation__slider").slider("value"));

	// только цифры в инпуте даты
	$('.only-numbers').bind("change keyup input click", function() {
		if (this.value.match(/[^0-9]/g, '')) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
	});

	// проставляем индексы для "лампочек"
	var numLight = $('.calculation__light-circle').length,
		light = $('.calculation__light-circle'),
		inputNumber = $('.calculation__lights-input'),
		label = $('.calculation__light-label'),
		num = numLight,
		cNum = numLight;

	// проставляем индексы и for на label
	label.each(function(i) {
		$(this).attr('data-number', numLight);
		$(this).attr('for', 'light-' + (i + 1) + '')
		numLight -= 1;
	});

	// проставляем индексы и id на input
	light.each(function(k) {
		$(this).attr('data-number', cNum);
		$(this).attr('id', 'light-' + (k + 1) + '')
		cNum -= 1;
	});

	//  меняем значение инпута по клику на "лампочку"
	label.click(function() {
		inputNumber.val(parseInt($(this).attr('data-number')));
		calculation();
	});

	// закрашиваем лампочки при изменении значения инпута
	inputNumber.keyup(function() {
		if ($(this).val() >= num) {
			$(this).val(num);
		}
		if ($(this).val() == '') {
			$(this).val('1');
		}
		calculation();
		$('.calculation__light-block input[data-number=' + $(this).val() + ']').prop("checked", true);
	});

	// закрашиваем лампочки по умолчанию
	$('.calculation__light-block input[data-number=' + inputNumber.val() + ']').prop("checked", true);

	// просчет калькулятора
	var totalSum = $('.calculation__total-price'),
		oldSum = $('.calculation__total-old-price'),
		oneLightSum = 1000,
		metrSum = 75;

	$('.calculation__material-input').change(function(){ calculation();	}); // пересчитываем при отмеченном радобаттоне материала

	function calculation() {

		$('.replace').each(function() {	$(this).html(numberWithCommas($(this).html()));	});

		sum = 0;
		sumSquare = parseInt($(".calculation__amount").val()) * metrSum;
		sumLights = $('.calculation__lights-input').val() * oneLightSum;
		sumMaterial = 0;

		$('.calculation__material-input').each(function(){
			if ($(this).is(':checked')) {
				sumMaterial = parseInt($(this).val());
			}
		});

		sum += sumLights + sumSquare + sumMaterial; // подсчитываем общую сумму

		oldSum.html(sum * 5); // заносим общую сумму в html

		var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');

		totalSum.animateNumber({ number: sum, numberStep: comma_separator_number_step });
		oldSum.animateNumber({ number: sum * 5, numberStep: comma_separator_number_step });

		totalSum.html(sum);
	}

	calculation();

	// карта
	function init() {
		var MapPlaces = new ymaps.Map('map', {
			center: offices[0].center,
			zoom: 11,
			controls: ['zoomControl']
		});

		MapPlaces.geoObjects
			
				.add(new ymaps.Placemark([55.777697023347606, 37.70197299999995], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([55.6701370232536, 37.77420299999994], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([55.6701370232536, 37.57420299999994], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([54.6701370232536, 37.77420299999994], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([55.6701370232536, 37.77440299999994], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([55.6501370232536, 37.77420299999994], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([55.6401370232536, 37.77420299999994], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([55.81326802337879, 37.48407599999996], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([55.6701370232536, 37.77440299999994], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([55.1501370232536, 37.77420299999994], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([55.5501370232536, 37.77420299999994], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([55.51326802337879, 37.48407599999996], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))



			.add(new ymaps.Placemark([54.777697023347606, 37.70197299999995], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([54.5701370232536, 37.77420299999994], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([55.6701370232536, 36.57420299999994], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([54.6701370232536, 36.23420299999994], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([54.6701370232536, 34.77440299999994], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([55.0501370232536, 37.17420299999994], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([55.4401370232536, 37.47420299999994], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([55.86326802337879, 37.68407599999996], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([55.6301370232536, 37.87440299999994], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([55.6601370232536, 37.17420299999994], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([55.2201370232536, 37.17420299999994], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))
				.add(new ymaps.Placemark([55.71326802337879, 37.45407599999996], {
					hintContent: 'Собственный значок метки'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/marker.png',
					iconImageSize: [35, 42],
					iconImageOffset: [-31, -42]
				}))

		for (var i = 0, l = offices.length; i < l; i++) {
			createGroup(offices[i]);
		}

		function createGroup(office) {
			collection = new ymaps.GeoObjectCollection(null, {
				iconLayout: 'default#image',
				iconImageHref: 'img/marker.png',
				iconImageSize: [35, 42],
				iconImageOffset: [-31, -42]
			});

			MapPlaces.geoObjects.add(collection);

			for (var j = 0, m = office.address.length; j < m; j++) {
				createPlacemark(office.address[j], collection);
			}
		}

		function createPlacemark(item, collection) {
			placemark = new ymaps.Placemark(item.center, {
				balloonContent: item.contacts
			});

			collection.add(placemark);

		}

		// изменение города по клику на главной 
		$('.map__tab-link, .city-list__link').click(function() {
			$('.map__tab-link, .city-list__link').removeClass('active');
			$(this).addClass('active');
			var city = $(this).html();
			for (var i = 0, l = offices.length; i < l; i++) {
				if (city == offices[i].city) {
					MapPlaces.panTo(offices[i].center, {
						delay: 1500
					});
				}
			}
		});

		// изменения города по клику на скписок в контактах
		$('.city-list__link').click(function() {
			$('.city-list__link').removeClass('active');
			$('.contact__office-name').html($(this).children('span').html());
			$(this).addClass('active');
			var city = $(this).children('span').html();
			for (var i = 0, l = offices.length; i < l; i++) {
				if (city == offices[i].city) {
					MapPlaces.panTo(offices[i].center, {
						delay: 1500
					});
				}
			}
		});

		MapPlaces.behaviors.disable('scrollZoom'); 
		MapPlaces.setBounds(MapPlaces.geoObjects);

	};

	var offices = [
		// ВАЖНО ПРОПИСЫВАТЬ название городов как в HTML
		// офисы на главной
		{
			city: 'Москве и МО,',
			center: [55.725045, 37.646961],
			address: [
				{
				center: [55.725045, 37.646961],
				},
			]},
		{
			city: 'Питеру и Ленинградской области!',
			center: [59.934439, 30.301115],
			address: [
				{
				center: [59.934439, 30.301115],
				},
			]},
		// офисы в контактах
		{
			city: 'Барнаул',
			center: [53.277283, 83.532717],
			address: [
				{
				center: [53.277283, 83.532717],
				},
			]},
		{
			city: 'Москва',
			center: [55.725045, 37.646961],
			address: [
				{
				center: [55.725045, 37.646961],
				},
			]},
		{
			city: 'Балашиха',
			center: [55.769323, 37.910039],
			address: [
				{
				center: [55.769323, 37.910039],
				},
			]},
		{
			city: 'Асбест',
			center: [53.277283, 83.532717],
			address: [
				{
				center: [53.277283, 83.532717],
				},
			]}
	];

	ymaps.ready(init);

	// фикс шапки при скролле
	var $header = $(".header");
	$(window).scroll(function() {
		if ($(this).scrollTop() > 50) {
			$header.addClass('fixed');

			$('.header__fixed-menu-btn, .header__logo-text, .header__phone, .header__menu-list, .header__menu-list-block, .header__top, .header__btn').addClass('fixed');

			$('.header__menu-list').removeClass('static');

			$('.header__city-block').hide();
		} else if ($(this).scrollTop() <= 50) {
			$header.removeClass('fixed');

			$('.header__fixed-menu-btn, .header__logo-text, .header__phone, .header__menu-list, .header__menu-list-block, .header__top, .header__btn').removeClass('fixed');

			$('.header__menu-list').addClass('static');

			$('.header__city-block').show();
		}
	});

	// закрываем меню по клику вне его области
	$(document).mouseup(function (e) {
	    var container = $(".header__menu-list");
	    if (container.has(e.target).length === 0){
	    	$('.header__fixed-menu-btn').removeClass('active');
	        container.slideUp('500');
	        container.removeClass('active');
	    }
	});

	// показываем меню по клику на кнопку при минимизированной шапке
	$('.header__fixed-menu-btn').click(function(){

		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}

		if ($('.header__menu-list.fixed').hasClass('active')) {
			$('.header__menu-list.fixed').removeClass('active');
		} else {
			$('.header__menu-list.fixed').addClass('active');
		}

		$('.header__menu-list.fixed').slideToggle(500);
	});

	// ------  организация табов на странице клиентов
	$('.univ__tab-link').each(function(i){$(this).attr('data-index', 'tab-'+ (i+1) +'');}); // проставление индексов
	$('.univ__tab-inner').each(function(i){$(this).attr('data-index', 'tab-'+ (i+1) +'');}); // проставление индексов

	$('.univ__tab-link').click(function(){
		$('.univ__tab-link').removeClass('active');
		$(this).addClass('active');
		$('.univ__tab-inner').removeClass('active');
		$('.univ__tab-inner[data-index='+$(this).attr('data-index')+']').addClass('active');

	});

    // закрываем меню по ESC
	$(document).keyup(function(d) {
		if (d.keyCode == 27) {
			$('.header__menu-list').slideUp(500);
			$('.header__menu-list').removeClass('active');
			$('.header__fixed-menu-btn').removeClass('active');
		}
	});

});