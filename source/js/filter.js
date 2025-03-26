/* global noUiSlider:readonly */

const EFFECT_SETTINGS = {
  'effect-none': {
    min: 0,
    max: 0,
    start: 0,
    step: 0,
    hidden: true,
  },
  'effect-chrome': {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },
  'effect-sepia': {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },
  'effect-marvin': {
    min: 0,
    max: 100,
    start: 100,
    step: 1,
  },
  'effect-phobos': {
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
  },
  'effect-heat': {
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
  },
};

const SLIDER_STEP = 0.1;
const MIN_SCALE = 0;
const MAX_SCALE = 100;
const INITIAL_SCALE = 100;

const photoForm = document.querySelector('.img-upload__overlay');
const IntensityEffectSlider = photoForm.querySelector('.effect-level__slider');
const imagePreview = photoForm.querySelector('.img-upload__preview img');
const effectLevelInput = photoForm.querySelector('.effect-level__value');
const effectLevel = photoForm.querySelector('.effect-level');

const resetFilterMode = () => {
  imagePreview.style.filter = 'none';
  effectLevel.classList.add('hidden');
  effectLevelInput.value = '';
}

const onSliderUpdate = (_, handle, unencoded) => {
  let currentValue = unencoded[handle];
  effectLevelInput.value = currentValue * 10;
  let currentEffect = photoForm.querySelector('.effects__radio:checked').id;

  switch (currentEffect) {
    case 'effect-chrome':
      imagePreview.style.filter = `grayscale(${currentValue})`;
      break;
    case 'effect-sepia':
      imagePreview.style.filter = `sepia(${currentValue})`;
      break;
    case 'effect-marvin':
      imagePreview.style.filter = `invert(${currentValue}%)`;
      break;
    case 'effect-phobos':
      imagePreview.style.filter = `blur(${currentValue}px)`;
      break;
    case 'effect-heat':
      imagePreview.style.filter = `brightness(${currentValue})`;
      break;
    default:
      imagePreview.style.filter = 'none';
  }
}

noUiSlider.create(IntensityEffectSlider, {
  range: {
    min: MIN_SCALE,
    max: MAX_SCALE,
  },
  start: INITIAL_SCALE,
  step: SLIDER_STEP,
  connect: 'lower',
});

IntensityEffectSlider.noUiSlider.on('update', onSliderUpdate);

const filterChangeHandler = function (evt) {
  const effect = evt.target.id;
  const settings = EFFECT_SETTINGS[effect];

  if (!settings) return;

  imagePreview.classList.value = '';

  IntensityEffectSlider.noUiSlider.set(settings.start);

  if (settings.hidden) {
    imagePreview.style.filter = 'none';
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
    IntensityEffectSlider.noUiSlider.updateOptions({
      range: { min: settings.min, max: settings.max },
      start: settings.start,
      step: settings.step,
    });
  }

  imagePreview.classList.add(`effects__preview--${effect.replace('effect-', '')}`);
}

export { filterChangeHandler, onSliderUpdate, resetFilterMode }
