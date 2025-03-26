import { getRandomNum, getRandomArrayElement } from './util.js';

const DESCRIPTIONS = [
  'Солнечный день на пляже',
  'Горный пейзаж на рассвете',
  'Уютный вечер у камина',
  'Яркие краски осени',
  'Тихая улочка в старом городе',
  'Море, полное загадок',
  'Летний дождь в лесу',
  'Архитектура будущего',
  'Кофе и книга в уютном кафе',
  'Зимняя сказка в горах',
  'Цветущий сад весной',
  'Городские огни ночью',
  'Дорога в никуда',
  'Портрет незнакомца',
  'Закат над океаном',
  'Дождь в большом городе',
  'Тишина и покой',
  'Момент счастья',
  'Одинокое дерево в поле',
  'Ветер свободы',
  'Теплые воспоминания',
  'Свет и тени',
  'Путешествие в неизвестность',
  'Мир в отражении',
  'Счастье в мелочах',
];

const NAMES = [
  'Александр', // М
  'Анна',      // Ж
  'Дмитрий',   // М
  'Елена',     // Ж
  'Иван',      // М
  'Ольга',     // Ж
  'Сергей',    // М
  'Татьяна',   // Ж
  'Андрей',    // М
  'Наталья',   // Ж
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const CountPosts = {
  MIN: 1,
  MAX: 25,
};

const CountLikes = {
  MIN: 15,
  MAX: 200,
};

const CountReplyes = {
  MIN: 0,
  MAX: 5,
};

const CountAvatars = {
  MIN: 1,
  MAX: 6,
};

const getReplyes = () => {
  let replyes = new Array(getRandomNum(CountReplyes.MIN, CountReplyes.MAX)).fill(null).map((_, index) => {
    return {
      id: index,
      avatar: 'img/avatar-'+ getRandomNum(CountAvatars.MIN, CountAvatars.MAX) +'.svg',
      message: getRandomArrayElement(MESSAGES),
      NAME: getRandomArrayElement(NAMES),
    }
  });
  return replyes;
};

const getPosts = () => {
  let posts = new Array(CountPosts.MAX).fill(null).map((_, index) => {
    return {
      id: index + 1,
      url: 'photos/'+ (index + 1) +'.jpg',
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomNum(CountLikes.MIN, CountLikes.MAX),
      comments: getReplyes(),
    }
  });
  return posts;
};

export { getPosts };





