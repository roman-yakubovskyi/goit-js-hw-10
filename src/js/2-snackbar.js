import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delay = document.querySelector('input[name=delay]');

form.addEventListener('submit', onFormSubmit);
function onFormSubmit(event) {
  event.preventDefault();

  const eventDelay = Number(delay.value);
  const selectedState = document.querySelector(
    'input[name="state"]:checked'
  ).value;

  function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve({ delay });
        } else {
          reject({ delay });
        }
      }, delay);
    });
  }

  createPromise(eventDelay, selectedState)
    .then(({ delay }) => {
      iziToast.success({
        timeout: 2000,
        position: 'topCenter',
        color: 'green',
        messageColor: 'black',
        close: false,
        title: 'OK',
        message: `✅ Fulfilled promise  in ${delay}ms`,
      });
    })
    .catch(({ delay }) => {
      iziToast.error({
        timeout: 2000,
        position: 'topCenter',
        color: 'red',
        messageColor: 'black',
        close: false,
        title: 'Error',
        message: `❌ Rejected promise  in ${delay}ms`,
      });
    });
  form.reset();
}
