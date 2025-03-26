import { getPosts } from './data.js';
import { showFull } from './full.js';

const thumbnailsGallery = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const postsData = getPosts();

const renderPost = (item) => {
  const thumbnail = pictureTemplate.cloneNode(true);

  thumbnail.querySelector('img').src = item.url;
  thumbnail.querySelector('.picture__likes').textContent = item.likes;
  thumbnail.querySelector('.picture__comments').textContent = item.comments.length;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    showFull(item);
  });

  return thumbnail;
};

const renderPosts = () => {
  const postsListFragment = document.createDocumentFragment();

  postsData.forEach((postData) => {
    postsListFragment.appendChild(renderPost(postData));

  })

  thumbnailsGallery.appendChild(postsListFragment);
};

renderPosts()

export { renderPost, renderPosts }

