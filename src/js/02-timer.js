import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

const startBtn = document.querySelector("button[data-start]");
const input = document.getElementById("datetime-picker");

const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");

startBtn.disabled = true;

let endDate = null;
const timerId = null;

function checkDate(data) {
    startBtn.disabled = true;

    const now = new Date ();

    if (data < now) {
        Notiflix.Report.failure("Please choose date in future!");
        return;
    }

    startBtn.disabled = false;
    endDate = data.getTime();
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        checkDate(selectedDates[0]);
    },
  };

  flatpickr(input, options);

  startBtn.addEventListener("click", () => {
      const timerId = setInterval(() =>{
          const now = new Date().getTime();
          const ti = endDate - now;

          if (ti < 0){
              clearInterval(timerId);
              return;
          } 
          const result = convertMs(ti);

          days.innerHTML = addLeadingZero(result.days);
          hours.innerHTML = addLeadingZero(result.hours);
          minutes.innerHTML = addLeadingZero(result.minutes);
          seconds.innerHTML = addLeadingZero(result.seconds);
      }, 1000);

      Notiflix.Notify.success("Lets goo!");
      startBtn.disabled = true;
      input.disabled = true;
  })

  function addLeadingZero(num) {
      return String(num).padStart(2,"0");
  }

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }