$(function() {
	$('.wrapper_gamburger').on('click', function() {
		$(this).next().css({"right": "0"});
	});

	$('.wrapper_cross').on('click', function() {
		$(this).parent().css({"right": "-21vh"});
	});

	$('.search__del').on('click', function() {
		$(this).prev().val("");
	});
});