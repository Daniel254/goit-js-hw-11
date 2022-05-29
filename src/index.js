import { Notify } from 'notiflix';
import { api, getImages } from './api';
import { clearGallery, drawAllPhoto, renderAllPhoto } from './helpers';
import refs from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a');
let page = 1;

refs.formEl.addEventListener('submit', async e => {
  e.preventDefault();
  page = 1;

  const { hits, lastPage, totalHits } = await getImages(
    refs.formEl.elements.searchQuery.value,
    page,
  );

  refs.loadMoreBtn.style.display = 'none';
  clearGallery();

  if (totalHits === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }
  Notify.success(`"Hooray! We found ${totalHits} images."`);

  if (page <= lastPage) {
    renderAllPhoto(drawAllPhoto(hits));
    lightbox.refresh();
  }
  if (page < lastPage) {
    refs.loadMoreBtn.style.display = 'block';
  }
});

refs.loadMoreBtn.addEventListener('click', async e => {
  e.preventDefault();
  page++;

  const { hits, lastPage } = await getImages(refs.formEl.elements.searchQuery.value, page);

  if (page <= lastPage) {
    renderAllPhoto(drawAllPhoto(hits));
    lightbox.refresh();
  }
  if (page < lastPage) {
    refs.loadMoreBtn.style.display = 'block';
  }
  if (page === lastPage) {
    refs.loadMoreBtn.style.display = 'none';
    Notify.failure("We're sorry, but you've reached the end of search results.");
  }
});
