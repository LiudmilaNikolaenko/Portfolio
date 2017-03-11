var panelTime = document.querySelector('.panelTime');
var results = document.querySelector('.results');

var buttonLeft = document.querySelector('.buttonLeft');
var buttonStart = document.querySelector('.buttonStart');
var buttonSplit = document.querySelector('.buttonSplit');
var buttonReset = document.querySelector('.buttonReset');
var buttonBack = document.querySelector('.buttonBack');

var buttonStop = document.createElement('div');
buttonStop.classList.add('buttonStop');
buttonStop.innerHTML = 'Stop';

buttonStart.addEventListener('click', timerStart);
buttonStop.addEventListener('click', timerStop);
buttonSplit.addEventListener('click', timerSplit);
buttonReset.addEventListener('click', timerReset);
buttonBack.addEventListener('click', timerBack);

var timerMs = 0;
var timeStart = 0;
var position = 0;
var count = 0;
var InIteration;

function timerStart() {
  position = 1;
  buttonLeft.replaceChild(buttonStop, buttonStart);
  var start = Date.now() - timerMs;
  timeStart = timerMs;
  iterations(start);
}

function timerStop() {
  clearInterval(InIteration);
  position = 2;
  buttonLeft.replaceChild(buttonStart, buttonStop);
  addInf();
}

function timerSplit() {
  if (position == 1) {
    addInf();
  }
}

function timerReset() {
  if (position != 0) {
    if (position == 1) {
      clearInterval(InIteration);
      buttonLeft.replaceChild(buttonStart, buttonStop);
    }
    timerMs = 0;
    timeStart = 0;
    position = 0;
    count = 0;
    writeToPanel();
    results.innerHTML = '';
  }
}

function timerBack() {
  timerReset();
  buttonStart.removeEventListener('click', timerStart);
  buttonStop.removeEventListener('click', timerStop);
  buttonSplit.removeEventListener('click', timerSplit);
  buttonReset.removeEventListener('click', timerReset);
  buttonBack.removeEventListener('click', timerBack);
}

function iterations(instart) {
  InIteration = setInterval(function(){
    timerMs = Date.now() - instart;
    writeToPanel();
  }, 1);
}

function msToStringTime(tms) {
  var t = tms % 86400000;           //1 day = 24 * 60 * 60 * 1000 = 86400000 ms
  var hh = Math.floor(t / 3600000); //1 hour = 60 * 60 * 1000 = 3600000 ms
  t = t % 3600000; 
  var mm = Math.floor(t / 60000);   //1 minute = 60 * 1000 = 60000 ms
  t = t % 60000;
  var ss = Math.floor(t / 1000);    //1 second = 1000 ms
  var ms = t % 1000;
  return ('0' + hh).slice(-2) + ':' + ('0' + mm).slice(-2) + ':' + ('0' + ss).slice(-2) + '.' + ('00' + ms).slice(-3);
}

function writeToPanel() {
  panelTime.innerHTML = msToStringTime(timerMs);
}

function addInf() {
  if (position == 2) {
    strInf = '. Stop: ';
  } else {
    strInf = '. Split: ';
  }
  count++;
  var inf = document.createElement('p');
  inf.innerHTML = count + strInf + msToStringTime(timerMs - timeStart);
  results.appendChild(inf);
}