import { CLOCKFACTS } from "./clockFacts.js";

// Get page elements and navigation links
const landingPage = document.getElementById("landing");
const analogPage = document.getElementById("analog-clock");
const digitalPage = document.getElementById("digital-clock");
const timerPage = document.getElementById("timer-page");

const analogLink = document.getElementById("analog");
const digitalLink = document.getElementById("digital");
const timerLink = document.getElementById("timer");

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
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Add a leading zero to the seconds string if it has a length of 1
    seconds = seconds.toString().padStart(2, "0");

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
};

