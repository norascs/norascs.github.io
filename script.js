const numberEl = document.getElementById("current-number");
const instructionEl = document.getElementById("instruction-text");
const videoEl = document.getElementById("video");

let history = [];
let isVideoPhase = true;

function generateRandomNumber() {
    return Math.floor(Math.random() * 10); // Numbers between 0 and 9
}

function showVideo() {
    videoEl.style.display = "block";
    numberEl.style.display = "none";
    instructionEl.textContent = "Watch the video and press 'p' for change or 'q' for no change.";
    isVideoPhase = true;
}

function updateDisplay() {
    const currentNumber = generateRandomNumber();
    numberEl.textContent = currentNumber;
    videoEl.style.display = "none";
    numberEl.style.display = "block";
    
    if (history.length < 3) {
        instructionEl.textContent = "Press either 'P' or 'Q' to continue...";
    } else {
        instructionEl.textContent = "Was this the same number shown three trials ago?";
    }

    history.push(currentNumber);
    if (history.length > 4) {
        history.shift();
    }
}

document.addEventListener('keydown', function(event) {
    const lowerCaseKey = event.key.toLowerCase();

    if (lowerCaseKey === 'q' || lowerCaseKey === 'p') {
        if (isVideoPhase) {
            updateDisplay();
            isVideoPhase = false;
            return;
        }

        if (history.length >= 4) {
            const threeBack = history[0];
            if ((threeBack === history[3] && lowerCaseKey === 'p') || (threeBack !== history[3] && lowerCaseKey === 'q')) {
                alert('Correct!');
            } else {
                alert('Wrong!');
            }
            showVideo();
        } else {
            updateDisplay();
        }
    }
});

// Initialize with the video at the start
showVideo();
