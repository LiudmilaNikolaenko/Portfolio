var panelTime = document.querySelector('.panelTime');
var panelMs = document.querySelector('.panelMs');

var buttonLeft = document.querySelector('.buttonLeft');
var buttonStart = document.querySelector('.buttonStart');
var buttonClear = document.querySelector('.buttonClear');
var buttonBack = document.querySelector('.buttonBack');

var buttonPause = document.createElement('p');
buttonPause.classList.add('buttonPause');
buttonPause.innerHTML = 'Pause';

var buttonCont = document.createElement('p');
buttonCont.classList.add('buttonCont');
buttonCont.innerHTML = 'Cont.';

buttonStart.addEventListener('click', timerStart);
buttonCont.addEventListener('click', timerCont);
buttonPause.addEventListener('click', timerPause);
buttonClear.addEventListener('click', timerClear);
buttonBack.addEventListener('click', timerBack);

var timerMs = 0;
var position = 0;
var InIteration;

function timerStart() {
  position = 1;
  buttonLeft.replaceChild(buttonPause, buttonStart);
  var start = Date.now();
  iterations(start);
}

function timerCont() {
  position = 1;
  buttonLeft.replaceChild(buttonPause, buttonCont);
  var start = Date.now() - timerMs;
  iterations(start);
}

function timerPause() {
  clearInterval(InIteration);
  position = 2;
  buttonLeft.replaceChild(buttonCont, buttonPause);
}

function timerClear() {
  if (position != 0) {
    if (position == 1) {
      clearInterval(InIteration);
      buttonLeft.replaceChild(buttonStart, buttonPause);
    } else {
    	buttonLeft.replaceChild(buttonStart, buttonCont);
    }
    timerMs = 0;
    position = 0;
    writeToPanel();
  }
}

function timerBack() {
  timerClear();
  buttonStart.removeEventListener('click', timerStart);
  buttonCont.removeEventListener('click', timerCont);
  buttonPause.removeEventListener('click', timerPause);
  buttonClear.removeEventListener('click', timerClear);
  buttonBack.removeEventListener('click', timerBack);
}

function iterations(instart) {
  InIteration = setInterval(function(){
    timerMs = Date.now() - instart;
    writeToPanel();
  }, 1);
};

function writeToPanel() {
  var t = timerMs % 86400000;       //1 day = 24 * 60 * 60 * 1000 = 86400000 ms
  var hh = Math.floor(t / 3600000); //1 hour = 60 * 60 * 1000 = 3600000 ms
  t = t % 3600000; 
  var mm = Math.floor(t / 60000);   //1 minute = 60 * 1000 = 60000 ms
  t = t % 60000;
  var ss = Math.floor(t / 1000);    //1 second = 1000 ms
  var ms = t % 1000;
  panelTime.innerHTML = ('0' + hh).slice(-2) + ':' + ('0' + mm).slice(-2) + ':' + ('0' + ss).slice(-2);
  panelMs.innerHTML = ms;
};