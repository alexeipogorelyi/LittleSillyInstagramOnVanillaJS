
//import './thumbnail-generated.js';
import { renderPosts } from './thumbnail.js';
import './preview.js';
import { setFormSubmit } from './photo-editor.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { onSubmitSucces, onSubmitError } from './modal.js';
import { showFiltrationBlock } from './filltration.js';
import { setFiltrationMode } from './filltration.js';

const DEFAULT_PREVIEW_LOAD = 25;

getData(
  (data) => {
    renderPosts(data.slice(0, DEFAULT_PREVIEW_LOAD));
    showFiltrationBlock();
    setFiltrationMode(data);
  },
  (message) => {
    showAlert(message);
  },
)

setFormSubmit(onSubmitSucces, onSubmitError);
