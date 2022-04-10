import Notiflix from 'notiflix';

const refs = {
  delayInput: document.querySelector('input[name="delay"]'),
  stepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
}
const submitBtn = document.querySelector('button');
let formData = {};

submitBtn.addEventListener('click', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  createDataFromInput();
  setTimeout(() => {
    for (let i = 1; i <= formData.amount; i++) {
      createPromise(i, (i===1? 0:formData.step) * (i-1));
    }
  }, formData.delay);

}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  },
  );
  
  promise
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }

function createDataFromInput() {
  formData = {
    delay: Number(refs.delayInput.value),
    step: Number(refs.stepInput.value),
    amount: Number(refs.amountInput.value),
  }
}
