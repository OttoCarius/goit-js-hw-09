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

// markup
fields.parentElement.style.display = 'flex';

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
