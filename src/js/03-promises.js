import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', clickSubmitBtn);


function clickSubmitBtn(evt) {
  evt.preventDefault();
  
  const data = {
    delay: parseInt(form.delay.value),
    step: parseInt(form.step.value),
    amount: parseInt(form.amount.value),
  };
  callPromise(data);
  evt.currentTarget.reset();
};

function callPromise({delay, amount, step}) {
  let calcDelay = delay;
  for (let index = 1; index <= amount; index += 1) {
  createPromise(index, calcDelay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
      calcDelay += step;
    };
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
    resolve({ position, delay });
    } else {
    reject ({ position, delay });
    }
    }, delay);
})
};