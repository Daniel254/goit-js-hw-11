import { Notify } from 'notiflix';
import { api, getImages } from './api';
import { clearGallery, drawAllPhoto, renderAllPhoto } from './helpers';
import refs from './refs';

let page = 1;

refs.formEl.addEventListener('submit', async e => {
  e.preventDefault();
  page = 1;

  const searchQuery = refs.formEl.elements.searchQuery.value || '';
  const { data } = await getImages(searchQuery);
  const lastPage = Math.ceil(data.totalHits / api.defaults.params.per_page);

  refs.loadMoreBtn.style.display = 'none';
  clearGallery();

  if (data.totalHits === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }
  Notify.success(`"Hooray! We found ${data.totalHits} images."`);

  if (page <= lastPage) {
    renderAllPhoto(drawAllPhoto(data.hits));
  }
  if (page < lastPage) {
    refs.loadMoreBtn.style.display = 'block';
  }
});

refs.loadMoreBtn.addEventListener('click', async e => {
  e.preventDefault();
  page++;
  const searchQuery = refs.formEl.elements.searchQuery.value || '';
  const { data } = await getImages(searchQuery, page);
  const lastPage = Math.ceil(data.totalHits / api.defaults.params.per_page);

  if (page <= lastPage) {
    renderAllPhoto(drawAllPhoto(data.hits));
  }
  if (page < lastPage) {
    refs.loadMoreBtn.style.display = 'block';
    return;
  }
  refs.loadMoreBtn.style.display = 'none';
  Notify.failure("We're sorry, but you've reached the end of search results.");
});
