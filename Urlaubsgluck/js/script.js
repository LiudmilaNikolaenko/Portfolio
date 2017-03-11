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

function getjson(word) {
	request.open('GET', 'https://pixabay.com/api/?key=3583325-6418ebfaad31f5bfefd706f48&q=' + word + '&image_type=photo&per_page=7');
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
     		if(request.status == 200) {
				var resText = JSON.parse(request.responseText);

				for (var i = 0; i < resText.hits.length; i++) {
					dataIdeasTile.tileImage[i] = resText.hits[i].webformatURL;
					dataIdeasTile.tileText[i] = resText.hits[i].tags;
				}

				var ideasTile = document.querySelector('.ideas__tile');
				ideasTile.innerHTML = tmpl('ideas__dtile', dataIdeasTile);

				var msnry = new Masonry(ideasTile, {
 					itemSelector: ".ideas__item",
  					columnWidth: ".ideas__item"
				});
			};
		};
	};
	request.send();
}

getjson('holidays');

document.querySelector('.search__button').onclick = function(e) {
	var searchText = document.querySelector('.search__text').value;
	if (searchText) {
		getjson(searchText);
	}
	document.querySelector('.search__text').value = '';
};