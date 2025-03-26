import { isEscEvent } from './util.js';

const HASHTAG_MAX_LENGTH = 20;
const MAX_HASHTAGS = 5;
const COMMENT_MAX_LENGTH = 140;

let hashtagInput = document.querySelector('.text__hashtags');
let commentInput = document.querySelector('.text__description');

const addInputError = (input) => {
  input.classList.add('text-input--error')
};

const removeInputError = (input) => {
  input.classList.remove('text-input--error')
};

const checkHastagInput = () => {

  removeInputError(hashtagInput);

  hashtagInput.setCustomValidity('');

  let hashtagsText = hashtagInput.value.toLowerCase().trim();

  if(!hashtagsText) {
    return;
  }

  let hashtags = hashtagsText.split(/\s+/);

  if(hashtags.length === 0) {
    return;
  }

  const firstSymbolIsNotHashtag = hashtags.some((hashtag) => {
    return hashtag[0] !== '#';
  });

  if (firstSymbolIsNotHashtag) {
    hashtagInput.setCustomValidity('Хештег должен начинаться с символа #');
    addInputError(hashtagInput);
  }

  const hashtagContainsInvalidCharacters = hashtags.some((hashtag) => {
    return [...hashtag.slice(1)].some((char) => !char.match(/[a-zA-Zа-яА-Я0-9]/));
  });

  if (hashtagContainsInvalidCharacters) {
    hashtagInput.setCustomValidity('Хештег должен содержать только буквы и цифры, без пробелов и спецсимволов');
    addInputError(hashtagInput);
  }

  const hashtagIsOnlyDiez = hashtags.some((hashtag) => {
    return hashtag === '#';
  });

  if (hashtagIsOnlyDiez) {
    hashtagInput.setCustomValidity('Хештег не может состоять только из символа #');
    addInputError(hashtagInput);
  }

  const hashtagTooLong = hashtags.some((hashtag) => {
    return hashtag.length > HASHTAG_MAX_LENGTH;
  });

  if (hashtagTooLong) {
    hashtagInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
    addInputError(hashtagInput);
  }

  const wrongDevider = hashtags.some((hashtag) => {
    return hashtag.indexOf('#', 1) >= 1;
  });

  if (wrongDevider) {
    hashtagInput.setCustomValidity('Хэш-теги разделяются пробелами;');
    addInputError(hashtagInput);
  }

  const hashtagIsTheSame = hashtags.some((hashtag, index) => {
    return hashtags.indexOf(hashtag, index + 1) >= index + 1;
  });

  if (hashtagIsTheSame) {
    hashtagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    addInputError(hashtagInput);
  }

  if (hashtags.length > MAX_HASHTAGS) {
    hashtagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    addInputError(hashtagInput);
  }

  hashtagInput.reportValidity();
};

const checkCommentInput = () => {

  removeInputError(commentInput);
  commentInput.setCustomValidity('');

  if (commentInput.value.length > COMMENT_MAX_LENGTH) {
    commentInput.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    addInputError(commentInput);
  }

  commentInput.reportValidity();

};

const keydownOnInput = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

const resetInputTextValue = () => {
  hashtagInput.value = '';
  commentInput.value = '';
};

export { keydownOnInput, checkHastagInput, checkCommentInput, resetInputTextValue };




