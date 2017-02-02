$(function(){

    function change(){
     	var current = $('.showing'),
			next = current.next(); 
		if(!next.length) next = $('.slider__img:first');
		next.addClass('showing');
		current.removeClass('showing');
	}

    setInterval(change, 3000);

    $('.isotope').isotope({
		itemSelector: '.isotope_img',
		layoutMode: 'fitRows'
	});

	$('.filtres_item').click(function(){
		$('.filtres_item').removeClass('active');
		$(this).addClass('active');

		var selector = $(this).attr('data-filter');
		$('.isotope').isotope({
			filter: selector
		});
	});

	$(".conteiner").hover(function() {
		$(this).find(".img_text").css("opacity", 1);
		$(this).find("img").css("opacity", .5);
	}, function() {
		$(this).find(".img_text").css("opacity", 0);
		$(this).find("img").css("opacity", 1);
	});

	$(".portfolio").masonry({
		itemSelector:'.conteiner',
		columnWidth: 50,
	});

	$(".gamburger").click(function(){
		$("nav").css("right", "20px");
	});

	$(".close").click(function(){
		$("nav").css("right", "-140px");
	});

});