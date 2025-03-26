import { isEscEvent } from './util.js';
import { closePhotoForm } from './photo-editor.js';

const pageBody = document.querySelector('body');
const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const successModal = successModalTemplate.cloneNode(true);
const closeSuccess = successModal.querySelector('.success__button');
const succesInnie = successModal.querySelector('.success__inner');

const onSuccesModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removeSuccessModal();
  }
};

const onClickNotModal = (evt) => {
  if (!succesInnie.contains(evt.target)) {
    removeSuccessModal()
  }
}

const openSuccessModal = () => {
  pageBody.appendChild(successModal);

  closeSuccess.addEventListener('click', removeSuccessModal);
  document.addEventListener('keydown', onSuccesModalEscKeydown);
  document.addEventListener('click', onClickNotModal);
};

const removeSuccessModal = () => {
  pageBody.removeChild(successModal);

  closeSuccess.removeEventListener('click', removeSuccessModal);
  document.removeEventListener('keydown', onSuccesModalEscKeydown);
  document.removeEventListener('click', onClickNotModal);
};

const onSubmitSucces = () => {
  closePhotoForm();
  openSuccessModal()
};

const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
const errorModal = errorModalTemplate.cloneNode(true);
const closeError = errorModal.querySelector('.error__button');
const errorInnie = errorModal.querySelector('.error__inner');

const onErrorModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removeErrorModal();
  }
};

const onClickNotError = (evt) => {
  if (!errorInnie.contains(evt.target)) {
    removeErrorModal();
  }
};

const openErrorModal = () => {
  pageBody.appendChild(errorModal);

  closeError.addEventListener('click', removeErrorModal);
  document.addEventListener('keydown', onErrorModalEscKeydown);
  document.addEventListener('click', onClickNotError);
};

const removeErrorModal = () => {
  pageBody.removeChild(errorModal);

  closeError.removeEventListener('click', removeErrorModal);
  document.removeEventListener('keydown', onErrorModalEscKeydown);
  document.removeEventListener('click', onClickNotError);
};

const onSubmitError = () => {
  openErrorModal();
  closePhotoForm();
};

export { closePhotoForm, onSubmitSucces, onSubmitError }
