import { isEscEvent } from './util.js';

const REPLYES_LOAD_STEP = 5;

let replyesCount = REPLYES_LOAD_STEP;
let replyesLoaded = [];

const fullPic = document.querySelector('.big-picture');
const pageBody = document.querySelector('body');
const buttonClose = fullPic.querySelector('.big-picture__cancel');
const replyTemplate = document.querySelector('#reply').content.querySelector('.social__comment');
const replyesContainer = document.querySelector('.social__comments');
const replyCount = fullPic.querySelector('.social__comment-count');
const replyesLoader = fullPic.querySelector('.comments-loader');

const onFullEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeFull();
  }
};

const closeFull = () => {
  fullPic.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onFullEscKeydown);

  replyesContainer.innerHTML= '';
  replyesCount = REPLYES_LOAD_STEP;
  replyesLoaded = [];
};

const renderReply = (item) => {
  const reply = replyTemplate.cloneNode(true);
  reply.querySelector('img').src = item.avatar;
  reply.querySelector('img').alt = item.name;
  reply.querySelector('p').textContent = item.message;
  return reply;
};

const renderReplyes = (replyes) => {

  const onLoadReplyesClick = () => {
    renderReplyes(replyes);
  };

  if (replyes.length < REPLYES_LOAD_STEP) {
    replyesCount = replyes.length;
  }

  replyesLoaded = replyes.slice(0, replyesCount);
  replyesContainer.innerHTML = '';
  replyCount.innerHTML = `${replyesLoaded.length} из <span class="comments-count">${replyes.length}</span> комментариев`;

  let replyesListFragment = document.createDocumentFragment();

  replyesLoaded.forEach((item) => {
    replyesListFragment.appendChild(renderReply(item));
  });

  replyesContainer.appendChild(replyesListFragment);

  if (replyes.length > REPLYES_LOAD_STEP && replyes.length > replyesLoaded.length) {
    replyesLoader.classList.remove('hidden');
    replyesLoader.addEventListener('click', onLoadReplyesClick, { once: true });
  } else {
    replyesLoader.classList.add('hidden');
  }

  replyesCount += REPLYES_LOAD_STEP;
};

const showFull = (item) => {
  pageBody.classList.add('modal-open');
  fullPic.querySelector('img').src = item.url;
  fullPic.querySelector('.likes-count').textContent = item.likes;
  fullPic.querySelector('.comments-count').textContent = item.comments.length;
  fullPic.querySelector('.social__caption').textContent = item.description;
  fullPic.classList.remove('hidden');

  renderReplyes(item.comments.slice());

  buttonClose.addEventListener('click', () => {
    closeFull();
  });

  document.addEventListener('keydown', onFullEscKeydown);
};

export { showFull };
