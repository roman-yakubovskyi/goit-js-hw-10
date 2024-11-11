import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('button[data-start]');
const inputTime = document.querySelector('#datetime-picker');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
let userSelectedDate = null;
let count;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      startButton.disabled = true;
      startButton.classList.remove('button-active');
      iziToast.show({
        icon: 'icon-person',
        message: '❌ Please choose a date in the future',
        color: 'red',
        position: 'topCenter',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        closeOnClick: true,
        displayMode: 'replace',
        timeout: 5000,
      });
    } else {
      startButton.disabled = false;
      startButton.classList.add('button-active');
      const toast = document.querySelector('.iziToast');
      if (toast) {
        iziToast.hide({}, toast);
      }
    }
  },
};

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  startButton.classList.remove('button-active');
  startButton.classList.add('button-disabled');
  inputTime.disabled = true;
  startCount();
});

function startCount() {
  count = setInterval(() => {
    const currentTime = new Date();
    const timeRemaining = userSelectedDate - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(count);
      update(0, 0, 0, 0);
      inputTime.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeRemaining);
    update(days, hours, minutes, seconds);
  }, 1000);
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(1024140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function update(days, hours, minutes, seconds) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}
