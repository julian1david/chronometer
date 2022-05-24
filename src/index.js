let seconds = document.querySelector('#seconds');
let minutes = document.querySelector('#minutes');
let hours = document.querySelector('#hours');
let animable = document.querySelectorAll('.Time__side-a');
let animations = [...animable];
let secondsValue = 0;
let minutesValue = 0;
let hoursValue = 0;
let currentTimer;

animations.forEach(item => item.addEventListener('animationend', () => {
    item.classList.remove('Toggled')
}));

function formatTime(valor){
    return ("0" + valor).slice(-2)
}

const cronometro = () => {
    secondsValue++;
    seconds.textContent = formatTime(secondsValue);
    animable[2].classList.add('Toggled');
    //Cuando el intervalo lleve secondsValue a 59            
    if (secondsValue == 59) {
        secondsValue = -1;
    }
    if (secondsValue == 0) {
        minutesValue++;
        minutes.textContent = formatTime(minutesValue);
        animations[1].classList.add('Toggled');
    }
    if (minutesValue == 59) {
        minutesValue = -1;
    }
    if (secondsValue == 0 && minutesValue == 0) {
        hoursValue++;
        hours.textContent = formatTime(hoursValue);
        animations[0].classList.add('Toggled');
    }
}

const startTimer = () => {
    currentTimer = setInterval(() => {
        cronometro()
    }, 1000)
}

const pauseTimer = () => {
    clearInterval(currentTimer);
}

const resetTimer = () => {
    minutesValue = 0;
    secondsValue = 0;
    hoursValue = 0;
    seconds.textContent = '00'
    minutes.textContent = '00'
    hours.textContent = '00'
    clearInterval(currentTimer)
}


let buttons = document.querySelector('#buttons');
let play = document.querySelector('#start');
let pause = document.querySelector('#pause');

buttons.addEventListener('click', (e) => {
    if (e.target.id === "start") {
        startTimer();
        e.target.setAttribute(`disabled`, ``);
        pause.removeAttribute(`disabled`);
    }
    else if (e.target.id === "pause") {
        play.removeAttribute(`disabled`)
        e.target.setAttribute(`disabled`, ``);
        pauseTimer()
    }
    else if (e.target.id === "reset") {
        pause.removeAttribute(`disabled`);
        play.removeAttribute(`disabled`)
        resetTimer();
    }
})

