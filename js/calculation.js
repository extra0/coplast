// анимация на айпаде
$(function(){

	window.onload = function () { // вся прелесть после загрузки документа
		var messageBlock = $('.estimation__message'),
			btn = $('.estimation__btn[type="button"]'),
			n = 1;

		// заносим название города в сообщение
		$('#city').change(function(){
			$('.result-city').html($(this).val());
		});	

		// устанавливаем якоря на сообщения
		messageBlock.each(function(k){
			$(this).attr('data-number', k+1);
		});

		$('html, body').scrollTo($('.estimation__header'), 1000); // доскролл при загрузке на странице калькулятора

		// функция докрутки до нового сообщения
		function scrolling() {
			$('html, body').stop().animate({
				scrollTop: $($('.estimation__message[data-number="'+n+'"]')).offset().top - 150
			}, 1000);
		}

		// функция показа сообщения
		function get_message() {
			$('.estimation__message[data-number="'+n+'"]').addClass('active');
			scrolling();
			n++;
		}

		setTimeout(function(){
			$('.estimation__header').fadeIn(800);
		},1000);

		
		setTimeout(function(){get_message();},2500); // показ первого сообщение от админа
		setTimeout(function(){get_message();},5000); // вопрос о выборе материалов

		btn.click(function(){
			// $(this).prop('disabled', true);
			if (n == 3) {
				setTimeout(function(){get_message();},1000); // сообщение пользователя о выбранном материале
				setTimeout(function(){get_message();},4000); // вопрос админа
				setTimeout(function(){get_message();},6500); // сообщение о выборе площади
				$(this).parent().parent().parent().find('.transparent').slideUp(500); // скрываем сообщение вопроса
			}
			if (n == 6) {
				setTimeout(function(){get_message();},1000); // сообщение пользователя с площадью
				setTimeout(function(){get_message();},2500); // сообщение от админа
				setTimeout(function(){get_message();},4000); // выбор подробного или сокращенного вариантов расчета
				$(this).parent().parent().parent().parent().find('.transparent').slideUp(500); // скрываем сообщение вопроса
			}
			if (n == 12) {
				setTimeout(function(){get_message();},1000); // сообщение от пользователя
				setTimeout(function(){get_message();},4000); // вопрос от админа с указанием города
				setTimeout(function(){get_message();},7000); // форма указания города
				$(this).parent().parent().parent().parent().parent().find('.transparent').slideUp(500); // скрываем сообщение вопроса
			}
			if (n == 15) {
				setTimeout(function(){get_message();},1000); // сообщение о выбранном городе от пользователя
				setTimeout(function(){get_message();},2000); // небольшое сообщение с суммой
				setTimeout(function(){get_message();},4000); // детальное указание суммы
				setTimeout(function(){get_message();},7500); // дополнительное сообщение после расчетов
				setTimeout(function(){get_message();},10000); // вывод формы
				$(this).parent().parent().parent().parent().find('.transparent').slideUp(500); // скрываем сообщение вопроса
			}
		});

		// кликаем на показать приблизительный рассчет
		$('#result').click(function(){
			$('.result-message').html($(this).attr('data-text')); // пишем сообщение ответа
			$(this).parent().parent().find('.transparent').slideUp(500); // скрываем сообщение вопроса
			setTimeout(function(){get_message();},1000); // сообщение от пользователя
			setTimeout(function(){get_message();},2000); // вывод небольшого сообщения с суммой
			// $('#detail').prop('disabled', true);
			n = 12;
			setTimeout(function(){get_message();},3000); // вывод общей суммы
			setTimeout(function(){get_message();},7500); // короткое сообщение
			setTimeout(function(){get_message();},9000); // вывод формы
		});

		// кликаем на подробный рассчет
		$('#detail').click(function(){
			$(this).parent().parent().find('.transparent').slideUp(500); // скрываем сообщение вопроса
			$('.result-message').html($(this).attr('data-text')); // пишем сообщние ответа
			setTimeout(function(){get_message();},1000); // сообщение от пользователя
			setTimeout(function(){get_message();},2000); // сообщение от админа
			// $('#result').prop('disabled', true);
			setTimeout(function(){get_message();},4000); // выбор дополнительных опций
		});
	}

	// формируем показ отмеченных дополнительных опций
	$('.extra-option div').each(function(n){$(this).attr('data-type', n+1);}); // назначаем индексы 
	$('.estimation__input.only-numbers').each(function(k){$(this).attr('data-type', k+1);}); // назначаем индексы 

	// изменяем чекбоксы и показываем соответствующие опции в итоговом сообщении
	$('.estimation__checkbox').change(function(){
		if ($(this).is(":checked")) {
			$('.extra-option div[data-type='+ $(this).parent().find('.estimation__input.only-numbers').attr('data-type')+']').removeClass('hidden');
			$('.extra-option div[data-type='+ $(this).parent().find('.estimation__input.only-numbers').attr('data-type')+'] span').html($(this).parent().find('.estimation__input.only-numbers').val());
		} else {
			$('.extra-option div[data-type='+ $(this).parent().find('.estimation__input.only-numbers').attr('data-type')+']').addClass('hidden');
		}
	});

	//  записываем данные в сообщение
	$('.estimation__input.only-numbers').keyup(function(){
		$('.extra-option div[data-type='+ $(this).attr('data-type')+'] span').html($(this).val());
	});

});