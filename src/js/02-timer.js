import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    timePicker: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')
}
let pickedDate = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onChange(selectedDates) {
        pickedDate = selectedDates[0];
        checkDate(pickedDate);
        schowTime();
    }
}
let timeId = null;

refs.btnStart.disabled = true;
flatpickr(refs.timePicker, options);
refs.btnStart.addEventListener('click', onStart);

function onStart() {
   timeId = setInterval(schowTime, 1000);
}

function checkDate (date) {
    if (date <= Date.now()) {
        Notiflix.Notify.warning('Please choose a date in the future');
        refs.btnStart.disabled = true;
    } else
    {refs.btnStart.disabled = false}
}

function schowTime() {
    let toDate = pickedDate.getTime() - Date.now();
    if (toDate <= 0) {
        toDate = 0;
        clearInterval(timeId);
    }
    refs.days.textContent = toDigits(Math.floor(toDate / (1000 * 24 * 60 * 60)));
    refs.hours.textContent = toDigits(Math.floor((toDate / (1000 * 60 * 60)) % 24));
    refs.minutes.textContent = toDigits(Math.floor((toDate / (1000 * 60)) % 60));
    refs.seconds.textContent = toDigits(Math.floor((toDate / 1000) % 60));
}

function toDigits (num) {
    return num < 10 ? `0${num}` : num;
}

