
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const photoForm = document.querySelector('.img-upload__overlay');
const scaleValue = photoForm.querySelector('.scale__control--value');
const imagePreview = photoForm.querySelector('.img-upload__preview img');

const resetScaleMode = () => {
  scaleValue.value = '100%';
  imagePreview.style.transform = 'scale(1)';
};

const changeScale = (currentScale) => {
  scaleValue.value = `${currentScale}%`;
  imagePreview.style.transform = `scale(${currentScale/100})`;
};

const scaleBigger = () => {
  let currentScale = parseInt(scaleValue.value, 10);
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
  }
  changeScale(currentScale);
};

const scaleSmaller = () => {
  let currentScale = parseInt(scaleValue.value, 10);
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
  }
  changeScale(currentScale);
};

export { scaleSmaller, scaleBigger, resetScaleMode }
