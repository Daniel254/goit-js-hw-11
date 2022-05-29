import refs from '../refs';

const drawPhotoCard = card => {
  // +webformatURL - ссылка на маленькое изображение для списка карточек.
  // largeImageURL - ссылка на большое изображение.
  // +tags - строка с описанием изображения. Подойдет для атрибута alt.
  // +likes - количество лайков.
  // +views - количество просмотров.
  // +comments - количество комментариев.
  // +downloads - количество загрузок.
  const { webformatURL, tags, likes, views, comments, downloads } = card;
  return `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b><br>${likes}
      </p>
      <p class="info-item">
        <b>Views</b><br>${views}
      </p>
      <p class="info-item">
        <b>Comments</b><br>${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b><br>${downloads}
      </p>
    </div>
  </div>`;
};

export const drawAllPhoto = cards => {
  try {
    return cards.reduce((acc, card) => acc + drawPhotoCard(card), '');
  } catch (error) {
    throw new Error(error);
  }
};

export const renderAllPhoto = htmlString => {
  refs.galleryEl.insertAdjacentHTML('beforeend', htmlString);
};

export const clearGallery = () => {
  refs.galleryEl.innerHTML = '';
};
