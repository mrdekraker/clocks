import { CLOCKFACTS } from "./clockFacts.js";

// Get page elements and navigation links
const landingPage = document.getElementById("landing");
const analogPage = document.getElementById("analog-clock");
const digitalPage = document.getElementById("digital-clock");
const timerPage = document.getElementById("timer-page");

const analogLink = document.getElementById("analog");
const digitalLink = document.getElementById("digital");
const timerLink = document.getElementById("timer");

const customButton = document.getElementById("customTimeButton");

const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalSubmit = document.getElementById("modalSubmit");

const audio = document.getElementById("alarmAudio");
const countdown = document.querySelector(".timerDisplay");


let timerInterval = null;

// ANALOG CLOCK
analogLink.addEventListener("click", () => {
  showPage(analogPage);
  activeLink(analogLink);
  document.body.style.background =
    "url('./assets/forest.jpg') no-repeat center center fixed";
  
  const minHand = document.querySelector(".min-hand");
  const hourHand = document.querySelector(".hour-hand");
  const secondHand = document.querySelector(".second-hand");
  
  function runTime() {
    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDegrees = (seconds / 60) * 360 + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const mins = now.getMinutes();
    const minsDegrees = (mins / 60) * 360 + 90;
    minHand.style.transform = `rotate(${minsDegrees}deg)`;

    const hour = now.getHours();
    const hourDegrees = (hour / 12) * 360 + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  }

  setInterval(runTime, 1000);

  runTime();
});

// DIGITAL CLOCK
digitalLink.addEventListener("click", () => {
  showPage(digitalPage);
  activeLink(digitalLink);
  document.body.style.background =
    "url('./assets/lake.jpg') no-repeat center center fixed";
  clock();

  function clock() {
    const digitalTime = document.querySelector(".clock-time");
    const digitalDate = document.querySelector(".clock-date");
    let date = new Date();
    let hours = date.getHours().toString().padStart(2, "0"); // Add leading zero to hours
    let minutes = date.getMinutes().toString().padStart(2, "0"); // Add leading zero to minutes
    let seconds = date.getSeconds().toString().padStart(2, "0"); // Add leading zero to seconds

    let time = `${hours}:${minutes}:${seconds}`;
    digitalTime.textContent = time;

    let day = date.getDate();
    let month = date.toLocaleString('default', { month: 'long' }); // Get full month name
    let year = date.getFullYear();

    let formattedDate = `${month} ${day}, ${year}`;
    digitalDate.textContent = formattedDate;
  }

  setInterval(clock, 1000);
});


// TIMER
timerLink.addEventListener("click", () => {
  showPage(timerPage);
  activeLink(timerLink);
  document.body.style.background =
    "url('./assets/time.jpg') no-repeat center center fixed";
  timer();
});

const timer = () => {
  const minute = document.querySelector('[value="60"]');
  const three = document.querySelector('[value="180"]');
  const five = document.querySelector('[value="300"]');
  const resetButton = document.getElementById("reset");
  const pauseButton = document.getElementById("pause");

  const timerDisplay = document.querySelector(".timerDisplay");
  const audio = document.getElementById("alarmAudio");

  let remainingTime = 0; // Declare remainingTime outside the timer function
  let isPaused = false;

  pauseButton.addEventListener("click", () => {
  if (timerDisplay.textContent !== "00:00:00") { // Add this condition
    if (!isPaused) {
      clearInterval(timerInterval);
      if (remainingTime > 0) {
        remainingTime = parseTimerDisplay(timerDisplay.textContent);
        pauseButton.textContent = "RESUME";
        pauseButton.id = "paused"; // Change the id to "paused"
        isPaused = true;
      }
    } else {
      if (remainingTime > 0) {
        startCountdown(remainingTime, timerDisplay, audio, (intervalId) => {
          timerInterval = intervalId; // Update the global timerInterval
        });
        pauseButton.textContent = "PAUSE"; // Change the button text back to "PAUSE"
        pauseButton.id = "pause"; // Change the id back to "pause"
        isPaused = false;
      }
    }
  }
});


  // Function to parse the timer display text and convert it to seconds
  function parseTimerDisplay(displayText) {
    const timeParts = displayText.split(":");
    const hours = parseInt(timeParts[0], 10) || 0;
    const minutes = parseInt(timeParts[1], 10) || 0;
    const seconds = parseInt(timeParts[2], 10) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  }

  resetButton.addEventListener("click", () => {
  clearInterval(timerInterval); // Clear the current countdown interval
  timerDisplay.textContent = "00:00:00";

  // Stop the audio playback
  audio.pause();
  audio.currentTime = 0; // Reset the audio to the beginning
});

  minute.addEventListener("click", () => {
    clearInterval(timerInterval); // Clear the current countdown interval
    remainingTime = 60; // Set the remaining time to the selected duration
    startCountdown(remainingTime, timerDisplay, audio, (intervalId) => {
      timerInterval = intervalId; // Update the global timerInterval
    });
  });

  three.addEventListener("click", () => {
    clearInterval(timerInterval); // Clear the current countdown interval
    remainingTime = 180; // Set the remaining time to the selected duration
    startCountdown(remainingTime, timerDisplay, audio, (intervalId) => {
      timerInterval = intervalId; // Update the global timerInterval
    });
  });

  five.addEventListener("click", () => {
    clearInterval(timerInterval); // Clear the current countdown interval
    remainingTime = 300; // Set the remaining time to the selected duration
    startCountdown(remainingTime, timerDisplay, audio, (intervalId) => {
      timerInterval = intervalId; // Update the global timerInterval
    });
  });
};


const startCountdown = (duration, timerDisplay, audio, onIntervalStart) => {
  let currentInterval;

  currentInterval = setInterval(() => {
    if (duration <= 0) {
      clearInterval(currentInterval);
      audio.play();
      timerDisplay.textContent = '00:00:00';
      return;
    }

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    timerDisplay.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    duration -= 1;
  }, 1000);

  onIntervalStart(currentInterval);
};



// MODAL
customButton.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

modalClose.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modalSubmit.addEventListener("click", () => {
  // Retrieve input values for hours, minutes, and seconds
  const hours = parseInt(document.getElementById("hours").value, 10) || 0;
  const minutes = parseInt(document.getElementById("minutes").value, 10) || 0;
  const seconds = parseInt(document.getElementById("seconds").value, 10) || 0;

  // Calculate the total time in milliseconds
  const timeInMilliseconds = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);

  // Clear the existing timer interval if it exists
  clearInterval(timerInterval);

  // Hide the modal
  modal.classList.add("hidden");

  // Start the timer with the custom time
  startCountdown(timeInMilliseconds / 1000, countdown, audio, (intervalId) => {
    timerInterval = intervalId; // Store the current interval ID
  });
});



// Function to hide all pages and show the selected one
function showPage(pageToShow) {
  const pages = [landingPage, analogPage, digitalPage, timerPage];
  pages.forEach((page) => page.classList.remove("active"));
  pageToShow.classList.add("active");
}

function activeLink(link) {
  const links = [analogLink, digitalLink, timerLink];
  links.forEach((link) => link.classList.remove("activeLink"));
  link.classList.add("activeLink");
}

// Initial page to display (e.g., Analog Clock)
showPage(landingPage);
clockFact();

function clockFact() {
  let randomFact = CLOCKFACTS[Math.floor(Math.random() * CLOCKFACTS.length)];
  document.getElementById("clock-facts").innerHTML = randomFact;
}
