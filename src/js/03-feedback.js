const throttle = require('lodash.throttle');

const ref = {
  feedbackForm: document.querySelector('.feedback-form'),
  emailForm: document.getElementById('form-email'),
  messageForm: document.getElementById('form-message'),
};
const LOCAL_FIELDS = 'feedback-form-state';

ref.feedbackForm.addEventListener('input', throttle(handleDataInput, 500));
ref.feedbackForm.addEventListener('submit', handleButtonSubmit);

const storageValue = {
  email: ref.emailForm.value,
  message: ref.messageForm.value,
};

function handleButtonSubmit(e) {
  e.preventDefault();
  const formEmail = ref.emailForm.value,
    formMessage = ref.messageForm.value;
  console.log({
    email: formEmail,
    message: formMessage,
  });
  ref.emailForm.value = '';
  ref.messageForm.value = '';
  localStorage.removeItem(LOCAL_FIELDS);
}

function handleDataInput(e) {
  if (e.target.name === 'email') {
    storageValue.email = e.target.value;
  } else {
    storageValue.message = e.target.value;
  }

  localStorage.setItem(LOCAL_FIELDS, JSON.stringify(storageValue));
}

function clearWebStorageIfEmpty() {
  if (localStorage.getItem(LOCAL_FIELDS)) {
    const StorageFeedback = localStorage.getItem(LOCAL_FIELDS);
    const StorageFeedbackParsed = JSON.parse(StorageFeedback);

    ref.emailForm.value = StorageFeedbackParsed.email;
    ref.messageForm.value = StorageFeedbackParsed.message;
  }
}

clearWebStorageIfEmpty();
