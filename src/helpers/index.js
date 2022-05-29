import refs from '../refs';

const drawPhotoCard = card => {
  const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = card;
  return `<div class="photo-card">
    <a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
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

export const scrolldownLoadMore = () => {
  const { height: cardHeight } = refs.galleryEl.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};
