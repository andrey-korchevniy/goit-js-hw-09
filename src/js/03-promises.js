import Notiflix from 'notiflix';

const refs = {
  delayInput: document.querySelector('input[name="delay"]'),
  stepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
}
const submitBtn = document.querySelector('button');
let formData;

submitBtn.addEventListener('click', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  createDataFromInput();
  setTimeout(() => {
    for (let i = 1; i <= formData.amount; i++) {
      // создаем промис, передаем позицию, а также шаг, который равен 0 для первого шага или введенное в поле значение для следующих шагов   
      createPromise(i, formData.step * (i-1));
    }
  }, formData.delay);

}

function createPromise(position, step) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, step});
      } else {
        reject({position, step});
      }
    }, step);
  },
  );
  
  promise
  .then(({ position, step }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${step + formData.delay}ms`);
  })
  .catch(({ position, step }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${step + formData.delay}ms`);
  });
  }

function createDataFromInput() {
  formData = {
    delay: Number(refs.delayInput.value),
    step: Number(refs.stepInput.value),
    amount: Number(refs.amountInput.value),
  }
}
