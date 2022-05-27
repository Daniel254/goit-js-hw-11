import { getImages } from './api';
import { drawAllPhoto, renderAllPhoto } from './helpers';
import refs from './refs';

refs.formEl.addEventListener('submit', async e => {
  e.preventDefault();
  const searchQuery = refs.formEl.elements.searchQuery.value || '';
  const { data } = await getImages(searchQuery);
  renderAllPhoto(drawAllPhoto(data.hits));
});
