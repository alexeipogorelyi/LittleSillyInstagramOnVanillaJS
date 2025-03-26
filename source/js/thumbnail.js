import { showFull } from './full.js';

const thumbnailsGallery = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const removePosts = () => {
  const posts = document.querySelectorAll('.picture');
  if (posts) {
    posts.forEach(element => {
      element.remove();
    });
  }
};

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

const renderPosts = (postsData) => {
  removePosts();
  const postsListFragment = document.createDocumentFragment();


  postsData.forEach((postData) => {
    postsListFragment.appendChild(renderPost(postData));

  });

  thumbnailsGallery.appendChild(postsListFragment);
}

export { renderPosts };
