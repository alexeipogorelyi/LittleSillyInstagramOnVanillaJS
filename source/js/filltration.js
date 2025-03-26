import { renderPosts } from './thumbnail.js';
import { shuffleArray, debounce } from './util.js';
const DEFAULT_PREVIEW_LOAD = 25;
const RANDOM_PREVIEW_LOAD = 10;

const filtrationBlock = document.querySelector('.img-filters');
const filtrationForm = document.querySelector('.img-filters__form');

const filters = {
  'filter-default': (data) => {
    renderPosts(data.slice(0, DEFAULT_PREVIEW_LOAD))
  },
  'filter-random': (data) => {
    renderPosts(shuffleArray(data.slice()).slice(0, RANDOM_PREVIEW_LOAD));

  },
  'filter-discussed': (data) => {
    renderPosts(data.slice().sort((a, b) => {
      return b.comments.length - a.comments.length;
    }))
  },
};

const showFiltrationBlock = () => {
  filtrationBlock.classList.remove('img-filters--inactive');
};

const applyFilterWithDebounce = debounce((filterId, data) => {
  filters[filterId](data);
});

const clickOnFiltrationMode = (evt, data) => {
  if (evt.target.classList.contains('img-filters__button')) {
    const filtrationButtons = filtrationForm.querySelectorAll('.img-filters__button');
    filtrationButtons.forEach((button) => {
      button.classList.remove('img-filters__button--active');
    })
    evt.target.classList.add('img-filters__button--active');

    applyFilterWithDebounce(evt.target.id, data);
  }
};

const setFiltrationMode = (data) => {
  filtrationForm.addEventListener('click', (evt) => clickOnFiltrationMode(evt, data));
};

export { showFiltrationBlock, setFiltrationMode };
