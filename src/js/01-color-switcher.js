const ref = {
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
}

ref.btnStart.addEventListener('click', onStart);
ref.btnStop.addEventListener('click', onStop);

function onStart() {
    ref.btnStart.disabled = true;
    timeId = setInterval(() => changeColor(), 1000);
}

function onStop() {
    ref.btnStart.disabled = false;
    clearInterval(timeId);
}
    
function changeColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

