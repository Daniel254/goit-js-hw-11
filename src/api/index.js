import axios from 'axios';

const API_KEY = '27666990-12b4bba2fe6e2b052765abd44';

export const api = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: API_KEY,
    iamge_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  },
});

export const getImages = async (q, page = 1) => {
  //   const imageObj =
  //   console.log('image Object', imageObj);
  try {
    const { data } = await api.get('/', { params: { q, page } });
    const lastPage = Math.ceil(data.totalHits / api.defaults.params.per_page);
    return { hits: data.hits, totalHits: data.totalHits, lastPage };
  } catch (err) {
    throw new Error(err);
  }
};

// +key - твой уникальный ключ доступа к API.
// q - термин для поиска. То, что будет вводить пользователь.
// +image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
// +orientation - ориентация фотографии. Задай значение horizontal.
// +safesearch - фильтр по возрасту. Задай значение true.
