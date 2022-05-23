let seconds = document.querySelector('#seconds');
let secondValue = 0;
let currentTimer;



const startTimer = () => {
    currentTimer = setInterval(() => {
        secondValue ++;
        seconds.textContent = secondValue;
    },1000)
}

const pauseTimer = () => {
    secondValue = secondValue;

} 
let buttons = document.querySelector('#buttons');
let play = document.querySelector("#start")

buttons.addEventListener('click', (e) => {
    if(e.target.id === "start"){
        startTimer();
        e.target.setAttribute(`disabled`,``);
    }
    else if (e.target.id === "pause"){
        pauseTimer()
    }
})