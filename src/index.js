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
    console.log("Pause");
} 

let buttons = document.querySelector('#buttons');

buttons.addEventListener('click', (e) => {
    if(e.target.id === "start"){
        startTimer();
        e.target.setAttribute(`disabled`,``);
    }
    else if (e.target.id === "pause"){
        pauseTimer()
    }
})