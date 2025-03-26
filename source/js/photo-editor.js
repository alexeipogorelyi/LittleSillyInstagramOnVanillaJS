import { isEscEvent } from './util.js';
import { scaleBigger, scaleSmaller, resetScaleMode } from './photo-scale.js';
import { filterChangeHandler, resetFilterMode } from './filter.js';
import { keydownOnInput, checkHastagInput, checkCommentInput, resetInputTextValue } from './validation.js';
import { sendData } from './api.js';

const uploadPhotoInput = document.querySelector('#upload-file');
const photoForm = document.querySelector('.img-upload__overlay');
const pageBody = document.querySelector('body');
const closeButtonPhotoForm = photoForm.querySelector('#upload-cancel');
const scaleControlBigger = photoForm.querySelector('.scale__control--bigger');
const scaleControlSmaller = photoForm.querySelector('.scale__control--smaller');
const effectList = photoForm.querySelector('.effects__list');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const effectLevelInput = photoForm.querySelector('.effect-level__value');

const onPhotoFormEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    closePhotoForm();
  }
};

const closePhotoForm = () => {

  uploadPhotoInput.value = '';
  photoForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onPhotoFormEscKeydown);
  closeButtonPhotoForm.removeEventListener('click', closePhotoForm);
  scaleControlBigger.removeEventListener('click', scaleBigger);
  scaleControlSmaller.removeEventListener('click', scaleSmaller);
  effectList.removeEventListener('change', filterChangeHandler);
  hashtagInput.removeEventListener('input', checkHastagInput);
  hashtagInput.removeEventListener('keydown', keydownOnInput);
  commentInput.removeEventListener('keydown', keydownOnInput);
  commentInput.removeEventListener('input', checkCommentInput);
};

const openPhotoForm = () => {
  photoForm.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  closeButtonPhotoForm.addEventListener('click', closePhotoForm);
  document.addEventListener('keydown', onPhotoFormEscKeydown);
  scaleControlBigger.addEventListener('click', scaleBigger);
  scaleControlSmaller.addEventListener('click', scaleSmaller);
  effectList.addEventListener('change', filterChangeHandler);
  hashtagInput.addEventListener('input', checkHastagInput);
  hashtagInput.addEventListener('keydown', keydownOnInput);
  commentInput.addEventListener('keydown', keydownOnInput);
  commentInput.addEventListener('input', checkCommentInput);

  resetScaleMode();
  resetFilterMode();
  resetInputTextValue();
};

uploadPhotoInput.addEventListener('change', () => {
  openPhotoForm();
});

const setFormSubmit = (onSucces, onError) => {

  const imgUploadForm = document.querySelector('.img-upload__form');

  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    effectLevelInput.value /= 10;
    sendData(
      () => onSucces(),
      () => onError(),
      new FormData(evt.target),
    );
  })
};

export { setFormSubmit, closePhotoForm }
