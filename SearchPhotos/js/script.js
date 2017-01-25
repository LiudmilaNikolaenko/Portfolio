function getXmlHttp(){
  	var xmlhttp;
  	try {
    	xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
 	} catch (e) {
    	try {
      		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    	} catch (E) {
      		xmlhttp = false;
    	}
  	}
  	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    	xmlhttp = new XMLHttpRequest();
  	}
  	return xmlhttp;
};

var request = getXmlHttp();

var dataIdeasTile = {
	tileImage: [],
	tileText: []
};

var searchText = 'holiday';
var currentPageNumber = 1;

var dataIdeasPage = {
	pageNumber: []
};

function getjson() {
	request.open('GET', 'https://pixabay.com/api/?key=3583325-6418ebfaad31f5bfefd706f48&q=' + searchText + '&image_type=photo&page=' + currentPageNumber + '&per_page=9');
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
     		if(request.status == 200) {
				var resText = JSON.parse(request.responseText);

				for (var i = 0; i < resText.hits.length; i++) {
					dataIdeasTile.tileImage[i] = resText.hits[i].webformatURL;
					dataIdeasTile.tileText[i] = resText.hits[i].tags.split(', ');
				}

				var ideasTile = document.querySelector('.photos__tile');
				ideasTile.innerHTML = tmpl('photos__tdiv', dataIdeasTile);

				var images = document.querySelectorAll('.photos__img');
				for (var i = 0; i < images.length; i++) {
					images[i].onclick = function(e) { 
						var element = document.createElement('div');
						element.className = 'overlay';
						element.innerHTML = '<div class="modalfr"><img class="modalfr__img" src=' + this.getAttribute('src') + '></div>';
						document.body.appendChild(element);
  						document.querySelector('.overlay').onclick = function() { document.body.removeChild(this); };
					};
				};

				var links = document.querySelectorAll('.photos__text');
				for (var i = 0; i < links.length; i++) {
					links[i].onclick = function(e) { 
						searchText = this.textContent;
						currentPageNumber = 1;
						getjson(); 
					};
				};

				var minNumber = 1;
				if (currentPageNumber > 3) minNumber = currentPageNumber - 2;
				if (minNumber == 1) dataIdeasPage.pageNumber[0] = ' ';
				else dataIdeasPage.pageNumber[0] = ' ...';
				for (var i = 0; i < 5; i++) { dataIdeasPage.pageNumber[i+1] = minNumber + i; };
				dataIdeasPage.pageNumber[6] = '... ';

				var ideasPage = document.querySelector('.photos__page');
				ideasPage.innerHTML = tmpl('photos__pdiv', dataIdeasPage);

				
				var currentListNumber = 3;
				if (currentPageNumber < 3) currentListNumber = currentPageNumber;
				
				var pNumber = document.querySelectorAll('.photos__pnum');
				for (var i = 0; i < 7; i++) {
					if (i == currentListNumber) {
						pNumber[currentListNumber].classList.add('current');
					} else {
						pNumber[i].onclick = function(e) { 
							var inner = this.textContent;
							if (inner == ' ' || inner == ' ...') {
								currentPageNumber -= 3;
								if (currentPageNumber < 1) currentPageNumber = 1;
							} else if (inner == '... ') {
								currentPageNumber += 3;
							} else {
								currentPageNumber = +inner;
							};
							getjson(); 
						};
					};
					
				};

			};
		};
	};
	request.send();
}

getjson();

document.querySelector('.search__button').onclick = function(e) {
	if (document.querySelector('.search__text').value) {
		searchText = document.querySelector('.search__text').value;
		currentPageNumber = 1;
		getjson();
	}
	document.querySelector('.search__text').value = '';
};

