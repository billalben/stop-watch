"use strict";

const display = document.querySelector(".display");
const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const resetBtn = document.querySelector(".reset-btn");

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 10);
    isRunning = true;
  }
}

function stopTimer() {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
}

function resetTimer() {
  clearInterval(timer);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00:00";
}

function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  const [hours, minutes, seconds, milliseconds] =
    calculateTimeComponents(elapsedTime);

  display.textContent = `${formatTime(hours)}:${formatTime(
    minutes
  )}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
}

function calculateTimeComponents(time) {
  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  const milliseconds = Math.floor((time % 1000) / 10);

  return [hours, minutes, seconds, milliseconds];
}

function formatTime(value) {
  return String(value).padStart(2, "0");
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
