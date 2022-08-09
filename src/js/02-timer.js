import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const {
  flatpickrInput,
  startBtn,
  daysValue,
  hoursValue,
  minutesValue,
  secondsValue,
  fields,
} = {
  flatpickrInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
  fields: document.querySelector('.field'),
};

let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() - selectedDates[0].getTime() >= 0) {
      addAttributeDisabled(startBtn, true);

      Notify.failure('Please choose a date in the future');
      return;
    }
    addAttributeDisabled(startBtn, false);
  },
};

const flatPickrForm = flatpickr(flatpickrInput, options);

startBtn.addEventListener('click', () => {
  addAttributeDisabled(startBtn, true);
  addAttributeDisabled(flatpickrInput, true);
  intervalId = setInterval(() => {
    const timeDelta = flatPickrForm.selectedDates[0].getTime() - Date.now();
    //To stop timer when it hits 0
    if (timeDelta < 0) {
      clearInterval(intervalId);
      addAttributeDisabled(startBtn, false);
      addAttributeDisabled(flatpickrInput, false);
      return;
    }
    const convertedDelta = convertMs(timeDelta);

    changeTextContent(daysValue, convertedDelta, 'days');
    changeTextContent(hoursValue, convertedDelta, 'hours');
    changeTextContent(minutesValue, convertedDelta, 'minutes');
    changeTextContent(secondsValue, convertedDelta, 'seconds');

    console.log(convertedDelta);
  }, 1000);
});

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function addAttributeDisabled(elem, value) {
  elem.disabled = value;
}

function changeTextContent(elem, obj, units) {
  elem.textContent = addLeadingZero(obj[units]);
}
