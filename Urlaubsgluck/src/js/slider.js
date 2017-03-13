var slides = [];
for (var i = 0; i < 3; i++) {
	slides[i] = document.querySelectorAll('.howitworks__slide' + i);
}

var currentSlide = [0, 0, 0];

function nextSlide(Slider) {
	goToSlide(Slider, currentSlide[Slider]+1);
}
function prevSlide(Slider) {
	goToSlide(Slider, currentSlide[Slider]-1);
}
 
function goToSlide(Slider, n) {
slides[Slider][currentSlide[Slider]].className = 'howitworks__slide' + Slider;
currentSlide[Slider] = (n+slides[Slider].length)%slides[Slider].length;
slides[Slider][currentSlide[Slider]].className = 'howitworks__slide' + Slider + ' showing';
}

for (var i = 0; i < 3; i++) {
	document.querySelector('.howitworks__next' + i).onclick = function() {
		nextSlide(+this.className.slice(-1));
	};
	document.querySelector('.howitworks__prev' + i).onclick = function() {
		prevSlide(+this.className.slice(-1));
	};
};
