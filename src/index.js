let seconds = document.querySelector('#seconds');
let minutes = document.querySelector('#minutes');
let hours = document.querySelector('#hours');
let secondsValue = 0;
let minutesValue = 0;
let hoursValue = 0;
let currentTimer;


const startTimer = () => {
    currentTimer = setInterval(() => {
        secondsValue ++;
        seconds.textContent = ('0' + secondsValue).slice(-2);
        if (secondsValue >= 4){
            minutesValue++;
            secondsValue = 0;
            minutes.textContent = ('0' + minutesValue).slice(-2);
            if(minutesValue >= 2){
                minutesValue = 0;
                minutes.textContent = ('0' + minutesValue).slice(-2);
                hoursValue++
                hours.textContent = ('0' + hoursValue).slice(-2);
            }
        }
    },1000)
}

const pauseTimer = () => {
    clearInterval(currentTimer);
    console.log("Pause");
} 

const resetTimer = () => {
    minutesValue = 0;
    secondsValue = 0;
    hoursValue = 0;
    seconds.textContent = '00'
    minutes.textContent = '00'
    hours.textContent = '00'
}


let buttons = document.querySelector('#buttons');
let play =  document.querySelector('#start');

buttons.addEventListener('click', (e) => {
    if(e.target.id === "start"){
        startTimer();
        e.target.setAttribute(`disabled`,``);
    }
    else if (e.target.id === "pause"){
        play.removeAttribute(`disabled`)
        pauseTimer()
    }
    else if (e.target.id === "reset"){
        play.removeAttribute(`disabled`)
        resetTimer();
    }
})

document.getElementsByClassName
document.getElementsByTagName