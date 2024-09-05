let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let paused = false;

const startBtn = document.getElementById('startBtn');
const pauseResumeBtn = document.getElementById('pauseResumeBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');

const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const milliseconds = document.getElementById('milliseconds');
const lapsContainer = document.getElementById('lapsContainer');

startBtn.addEventListener('click', startTimer);
pauseResumeBtn.addEventListener('click', pauseResumeTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1);
        running = true;
        paused = false;
        pauseResumeBtn.innerText = 'Pause';
    }
}

function pauseResumeTimer() {
    if (running) {
        if (!paused) {
            clearInterval(tInterval);
            paused = true;
            pauseResumeBtn.innerText = 'Resume';
        } else {
            startTime = new Date().getTime() - difference;
            tInterval = setInterval(getShowTime, 1);
            paused = false;
            pauseResumeBtn.innerText = 'Pause';
        }
    }
}

function resetTimer() {
    clearInterval(tInterval); // Make sure to stop the timer
    running = false;
    paused = false;
    difference = 0;
    minutes.innerHTML = '00';
    seconds.innerHTML = '00';
    milliseconds.innerHTML = '00';
    lapsContainer.innerHTML = ''; 
    pauseResumeBtn.innerText = 'Pause'; // Reset button text
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((difference % (1000 * 60)) / 1000);
    const millis = Math.floor((difference % 1000) / 10);

    minutes.innerHTML = (mins < 10 ? '0' : '') + mins;
    seconds.innerHTML = (secs < 10 ? '0' : '') + secs;
    milliseconds.innerHTML = (millis < 10 ? '0' : '') + millis;
}

function recordLap() {
    if (running && !paused) {
        const lapTime = `${minutes.innerHTML} : ${seconds.innerHTML} : ${milliseconds.innerHTML}`;
        const lapItem = document.createElement('p');
        lapItem.innerText = lapTime;
        lapsContainer.appendChild(lapItem);
        lapsContainer.scrollTop = lapsContainer.scrollHeight; // Scroll to the latest lap
    }
}
