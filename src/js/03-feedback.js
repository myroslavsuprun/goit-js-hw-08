const throttle = require('lodash.throttle');

const ref = {
  feedbackForm: document.querySelector('.feedback-form'),
  emailForm: document.getElementById('form-email'),
  messageForm: document.getElementById('form-message'),
};
const LOCAL_FIELDS = 'feedback-form-state';

ref.feedbackForm.addEventListener('input', throttle(handleDataInput, 500));
ref.feedbackForm.addEventListener('submit', handleButtonSubmit);

function handleButtonSubmit(e) {
  e.preventDefault();

  console.log({
    email: ref.emailForm.value,
    message: ref.messageForm.value,
  });

  ref.emailForm.value = '';
  ref.messageForm.value = '';
  localStorage.removeItem(LOCAL_FIELDS);
}

function handleDataInput() {
  const toAddValue = `{"${ref.emailForm.name}":"${ref.emailForm.value}", "${ref.messageForm.name}":"${ref.messageForm.value}"}`;
  localStorage.setItem(LOCAL_FIELDS, toAddValue);
}

const storageValue = JSON.parse(localStorage.getItem(LOCAL_FIELDS));

function addValuesIfNotEmpty() {
  try {
    if (storageValue.email || storageValue.message) {
      ref.emailForm.value = storageValue.email;
      ref.messageForm.value = storageValue.message;
    }
  } catch (error) {}
}

addValuesIfNotEmpty();
