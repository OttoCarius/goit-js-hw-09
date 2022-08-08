import { Notify } from 'notiflix/build/notiflix-notify-aio';

const { delayValue, stepValue, amountValue, formEl } = {
  delayValue: document.querySelector("[name='delay']"),
  stepValue: document.querySelector("[name='step']"),
  amountValue: document.querySelector("[name='amount']"),
  formEl: document.querySelector('.form'),
};

//Вешаем слушателя событий на Сабмит
formEl.addEventListener('submit', e => {
  //Запретить перезагрузку страницы при отправке. Отменить дефолтное поведение
  e.preventDefault();

  //переменные для задержки и шага взяты из формы и преобразованы в число
  let FIRST_DELAY = Number(delayValue.value);
  const DELAY_STEP = Number(stepValue.value);

  //Цикл для создания Промиса
  for (let index = 1; index <= amountValue.value; index++) {
    createPromise(index, FIRST_DELAY)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    //Увеличивание задержки
    FIRST_DELAY += DELAY_STEP;
  }

  //Сбросить форму после цикла
  formEl.reset();
});

//Функция для создания ОДНОГО Промиса при значении задержки и возврата объекта при удачной операции или отклонённой
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }

      reject({ position, delay });
    }, delay);
  });
}
