let seconds = document.querySelector('#seconds');
let minutes = document.querySelector('#minutes');
let hours = document.querySelector('#hours');
let animable = document.querySelectorAll('.Time__side-a');
const heroContainer = document.querySelector('.Hero__time');
let play = document.querySelector('#start');
let pause = document.querySelector('#pause');
let title = document.querySelector('.Hero__title')

let animations = [...animable];
let secondsValue = 0;
let minutesValue = 0;
let hoursValue = 0;
let currentTimer;

animations.forEach(item => item.addEventListener('animationend', () => {
    item.classList.remove('Toggled')
}));

function formatTime(valor) {
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


//Funcion para pintar chronometros

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

    console.log(heroContainer);

    seconds = document.querySelector('#seconds');
    minutes = document.querySelector('#minutes');
    hours = document.querySelector('#hours');

    return heroContainer
}


// paint Timer 


const divInputs = () => {
    
    const inputsTimers = [];
    
    const inputContainer =  document.createElement('div');
    inputContainer.className  = 'Input'
    const inputHours = document.createElement('input');
    inputHours.className = 'Input__item'
    const inputMinutes = document.createElement('input');
    inputMinutes.className = 'Input__item'
    const inputSeconds = document.createElement('input');
    inputSeconds.className = 'Input__item';

    inputHours.setAttribute('id', 'inputMinutes');
    inputMinutes.setAttribute('id','inputMinutes');
    inputSeconds.setAttribute('id','inputseconds');

    inputHours.setAttribute('type','text');
    inputMinutes.setAttribute('type','text');
    inputSeconds.setAttribute('type','text');

    inputHours.setAttribute('placeholder','Hours');
    inputMinutes.setAttribute('placeholder','Minutes');
    inputSeconds.setAttribute('placeholder','Seconds');

    inputsTimers.push(inputHours,inputMinutes,inputSeconds);

    inputContainer.append(...inputsTimers);

    return inputContainer
    

}
const paintTimer = ()  => {

    title.textContent = 'Timer';
    const inputsDivs = divInputs();
    heroContainer.append(inputsDivs);
    console.log(inputsDivs);
    if(play.id === "start"){
        play.id = "startTimer";
    }

}


const removeinput = () => {
    const inputContainer = document.querySelector('.Input');
    heroContainer.removeChild(inputContainer)
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

const timer = () => {

}




document.addEventListener('click', (e) => {
    const clickedElement = e.target

    //Chronomer
    if (clickedElement.matches('#start')) {
        startTimer();
        play.classList.add(`not-active`);
        pause.classList.remove(`not-active`);
    }
    else if (clickedElement.matches('#pause')) {
        play.classList.remove(`not-active`);
        pause.classList.add(`not-active`);
        pauseTimer()
    }
    else if (clickedElement.matches("#reset")) {
        play.classList.remove(`not-active`);
        pause.classList.remove(`not-active`);
        resetTimer();
    }


    //Timer
    else if (clickedElement.matches('#timer')){
        paintTimer();
    }
    else if (clickedElement.matches('#startTimer')){
        removeinput();
        console.log('hello');
    }
})

