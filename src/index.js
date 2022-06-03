const seconds = document.querySelector('#seconds');
const minutes = document.querySelector('#minutes');
const hours = document.querySelector('#hours');
const animable = document.querySelectorAll('.Time__side-a');
const title = document.querySelector('.Hero__title')
const heroContainer = document.querySelector('.Hero__time');
const play = document.querySelector('#start');
const pause = document.querySelector('#pause');
const navChronometer = document.querySelector('#chronometer');
const navTimer = document.querySelector('#timer');
const navPomodoro = document.querySelector('#pomodoro');

let bandera = false;
let animations = [...animable];
let secondsValue = 0;
let minutesValue = 0;
let hoursValue = 0;
let currentTimer;
let currentButton;

animations.forEach(item => item.addEventListener('animationend', () => {
    item.classList.remove('Toggled')
}));

const formatTime = (valor) => {
    return ("0" + valor).slice(-2)
}

const divContainer = ({
    id: idUser,
    title: paragraph,

}) => {
    const listContainer = []
    const containerTime = document.createElement('div');

    const container = document.createElement('div');
    container.className = 'Time'
    const sideA = document.createElement('span');
    sideA.className = 'Time__side Time__side-a'
    const textView = document.createElement('p');
    textView.setAttribute('id', `${idUser}`);
    textView.className = 'Time__text';
    textView.textContent = '00'
    const sideB = document.createElement('span');
    sideB.className = 'Time__side Time__side-n'

    container.append(sideA, textView, sideB)
    const title = document.createElement('p');
    title.textContent = paragraph;
    title.className = 'Time__description'

    listContainer.push(container, title);

    containerTime.append(...listContainer);


    return containerTime;
}

//Paint clock

const painClock = () => {

    heroContainer.innerHTML = ""
    const timers = [];

    const hoursContainer = divContainer({
        id: "hours",
        title: "Hours"
    });
    const minutesContainer = divContainer({
        id: "minutes",
        title: "Minutes"
    });
    const secondsContainer = divContainer({
        id: "seconds",
        title: "Seconds"
    });

    timers.push(hoursContainer, minutesContainer, secondsContainer);
    heroContainer.append(...timers)


    seconds = document.querySelector('#seconds');
    minutes = document.querySelector('#minutes');
    hours = document.querySelector('#hours');

    return heroContainer
}

//Create Inputs 
const divInputs = () => {

    const inputsTimers = [];

    const inputContainer = document.createElement('div');
    inputContainer.className = 'Input'
    const inputHours = document.createElement('input');
    inputHours.className = 'Input__item'
    const inputMinutes = document.createElement('input');
    inputMinutes.className = 'Input__item'
    const inputSeconds = document.createElement('input');
    inputSeconds.className = 'Input__item';

    inputHours.setAttribute('id', 'inputHours');
    inputMinutes.setAttribute('id', 'inputMinutes');
    inputSeconds.setAttribute('id', 'inputseconds');

    inputHours.setAttribute('type', 'number');
    inputMinutes.setAttribute('type', 'number');
    inputSeconds.setAttribute('type', 'number');

    inputHours.setAttribute('required', '');
    inputMinutes.setAttribute('required', '');
    inputSeconds.setAttribute('required', '');

    inputHours.setAttribute('placeholder', 'Hours');
    inputMinutes.setAttribute('placeholder', 'Minutes');
    inputSeconds.setAttribute('placeholder', 'Seconds');

    inputsTimers.push(inputHours, inputMinutes, inputSeconds);

    inputContainer.append(...inputsTimers);


    return inputContainer


}

const removeinput = () => {
    const inputContainer = document.querySelector('.Input');
    heroContainer.removeChild(inputContainer);
    bandera = false
}

//Paint pages
const paintChronometer = () => {
    navChronometer.classList.add('not-active');
    navTimer.classList.remove('not-active');
    navPomodoro.classList.remove('not-active');
    title.textContent = 'Chronometer';
    if (play.id != "start") {
        play.id = "start"
    }
}

const paintTimer = () => {
    navChronometer.classList.remove('not-active');
    navTimer.classList.add('not-active');
    navPomodoro.classList.remove('not-active');
    title.textContent = 'Timer';
    const inputsDivs = divInputs();
    heroContainer.append(inputsDivs);
    bandera = true;
    if (play.id != "startTimer") {
        play.id = "startTimer";
    }
}

const paintPomodoro = () => {
    navChronometer.classList.remove('not-active');
    navTimer.classList.remove('not-active');
    navPomodoro.classList.add('not-active');
    title.textContent = 'Pomodoro'
    minutesValue = 2;
    minutes.textContent = formatTime(minutesValue);
    if (play.id != "startPomodoro") {
        play.id = "startPomodoro"
    }
}


const startPomodoro = () => {
    play.classList.add(`not-active`);
    pause.classList.remove(`not-active`);
    minutesValue = 2;
    currentTimer = setInterval(() => {
        secondsValue -= 1;
        if (secondsValue === -1) {
            secondsValue = 9;
            minutesValue -= 1;
        }
        if (secondsValue === 0 && minutesValue === 0) {
            clearInterval(currentTimer);
            intervalPomodoro();
        }
        minutes.textContent = formatTime(minutesValue)
        seconds.textContent = formatTime(secondsValue);
    }, 1000)
}

const intervalPomodoro = () => {
    const title = document.createElement('p');
    title.textContent = "Time for Rest"
    heroContainer.appendChild(title);
    secondsValue = 1;
    minutesValue = 2;
    currentTimer = setInterval(() => {
        secondsValue -= 1;
        if (secondsValue === -1) {
            secondsValue = 9;
            minutesValue -= 1;
        }
        if (secondsValue === 0 && minutesValue === 0) {
            secondsValue = 0;
            clearInterval(currentTimer);
            heroContainer.removeChild(title);
            startPomodoro();

        }
        minutes.textContent = formatTime(minutesValue);
        seconds.textContent = formatTime(secondsValue);
    }, 1000)
}

//Chronometre
const startChronometer = () => {

    play.classList.add(`not-active`);
    pause.classList.remove(`not-active`);

    currentTimer = setInterval(() => {
        secondsValue++;
        animable[2].classList.add('Toggled');
        //Cuando el intervalo lleve secondsValue a 59            
        if (secondsValue === 60) {
            secondsValue = 0;
            minutesValue++;
            minutes.textContent = formatTime(minutesValue);
            animations[1].classList.add('Toggled');
        }
        if (minutesValue === 60) {
            minutesValue = 0;
            minutes.textContent = formatTime(minutesValue);
        }
        if (secondsValue === 0 && minutesValue === 0) {
            hoursValue++;
            hours.textContent = formatTime(hoursValue);
            animations[0].classList.add('Toggled');
        }
        seconds.textContent = formatTime(secondsValue);

    }, 1000)
}

function startTimer() {
    const minutesInput = parseInt(document.querySelector('#inputMinutes').value)
    const secondsInput = parseInt(document.querySelector('#inputseconds').value)

    minutes.textContent = minutesInput;
    seconds.textContent = secondsInput;

    minutesValue = minutesInput;
    secondsValue = secondsInput;
    
    currentTimer = setInterval(() => {
        secondsValue -= 1;
        if (secondsValue === -1) {
            secondsValue = 59;
            minutesValue -= 1;
        }
        if (minutesValue === 0 && secondsValue === 0) {
            clearInterval(currentTimer);
        }
        minutes.textContent = formatTime(minutesValue);
        seconds.textContent = formatTime(secondsValue);
    }, 1000);
}

const pauseTimer = () => {
    play.classList.remove(`not-active`);
    pause.classList.add(`not-active`);
    clearInterval(currentTimer);
}

const resetTimer = () => {
    play.classList.remove(`not-active`);
    pause.classList.remove(`not-active`);
    secondsValue = 0;
    hoursValue = 0;
    if (play.id === "startPomodoro") {
        minutesValue = 2;
    }
    else {
        minutesValue = 0;
    }
    minutes.textContent = formatTime(minutesValue);
    hours.textContent = formatTime(hoursValue);
    seconds.textContent = formatTime(secondsValue);
    clearInterval(currentTimer);
}




document.addEventListener('click', (e) => {
    const clickedElement = e.target

    //Chronomer
    if (clickedElement.matches('#start')) {
        startChronometer();

    }
    else if (clickedElement.matches('#pause')) {
        pauseTimer()
    }
    else if (clickedElement.matches("#reset")) {
        resetTimer();
    }
    else if (clickedElement.matches('#chronometer')) {
        paintChronometer();
        resetTimer();
        if (bandera) {
            removeinput();
        }
    }
    else if (clickedElement.matches('#timer')) {
        paintTimer();
        resetTimer();
    }
    else if (clickedElement.matches('#pomodoro')) {
        paintPomodoro();
        resetTimer();
        if (bandera) {
            removeinput();
        }
    }
    else if (clickedElement.matches('#startTimer')) {
        startTimer();
    }
    else if (clickedElement.matches('#startPomodoro')) {
        startPomodoro()
    }
})

