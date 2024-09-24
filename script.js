const questions = [
  "Describe in detail your daily routine.",
  "Summarize your favorite book in the past, present, and future tense.",
  "Narrate a memorable event from your childhood in the past, present, and future tense.",
  "Give directions to your house from a nearby landmark.",
  "Give detailed instructions on how to cook your favorite dish.",
  "Give extensive directions on how to reach a specific location in your city.",
  "State straightforward alternatives for solving a common problem.",
  "Ask and answer a complex question about a recent news event.",
  "Discuss how you would handle a predictable and an unpredictable event at work.",
  "Give a brief presentation about your favorite hobby.",
  "Participate in a work-related conversation about project management.",
  // Add 59 more questions here to reach the total of 70
];

const dice = document.getElementById("dice");
const questionDisplay = document.getElementById("questionDisplay");
const rollSound = document.getElementById("rollSound");
const timerDisplay = document.getElementById("timerDisplay");
const timerProgress = document.getElementById("timerProgress");
let timer;

function rollDice() {
  rollSound.play();
  dice.classList.add("rolling");
  setTimeout(() => {
    dice.classList.remove("rolling");
    showQuestion();
  }, 1000);
}

function showQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  const question = questions[randomIndex];
  questionDisplay.classList.add("fade-out");
  setTimeout(() => {
    questionDisplay.textContent = question;
    questionDisplay.classList.remove("fade-out");
    questionDisplay.classList.add("show");
    startTimer(120); // 2-minute timer
  }, 500);
}

function startTimer(duration) {
  let timeRemaining = duration;
  let progressWidth = 100;

  function updateTimer() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
    progressWidth = (timeRemaining / duration) * 100;
    timerProgress.style.width = `${progressWidth}%`;
    timeRemaining--;

    if (timeRemaining < 0) {
      clearInterval(timer);
      timerDisplay.textContent = "Time's up!";
      timerProgress.style.width = "0%";
    }
  }

  updateTimer();
  timer = setInterval(updateTimer, 1000);
}

function restartTimer() {
  clearInterval(timer);
  startTimer(120); // Restart the 2-minute timer
}

dice.addEventListener("click", rollDice);
document
  .getElementById("restartTimerButton")
  .addEventListener("click", restartTimer);
