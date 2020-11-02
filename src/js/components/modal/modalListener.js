import globalVars from '../../globalVars/vars';
import localStorageAPI from '../../localStorageAPI';
import refs from '../../refs';

function checkFilmHandler(event) {
  if (event.target.id === 'btnW') {
    localStorageAPI.toggleMovie(globalVars.watched);
    if (event.target.textContent === 'add to watched') {
      document.querySelector('#btnW').innerHTML = 'delete from watched';
      document.querySelector('#btnQ').innerHTML = 'add to queue';
    } else {
      document.querySelector('#btnW').innerHTML = 'add to watched';
    }
  } else if (event.target.id === 'btnQ') {
    localStorageAPI.toggleMovie(globalVars.queue);
    if (event.target.textContent === 'add to queue') {
      document.querySelector('#btnQ').innerHTML = 'delete from queue';
      document.querySelector('#btnW').innerHTML = 'add to watched';
    } else {
      document.querySelector('#btnQ').innerHTML = 'add to queue';
    }
  }
}

function closeModalEscapeHandler(event) {
  if (
    event.code === 'Escape' ||
    event.target.className === 'lightbox_closeBtn' ||
    event.target.className === 'lightbox'
  ) {
    document
      .querySelector('.basicLightbox')
      .classList.remove('basicLightbox--visible');
    refs.body.classList.remove('modal-open');
    window.removeEventListener('keydown', closeModalEscapeHandler);
    setTimeout(() => document.querySelector('.basicLightbox').remove(), 410);
  }
}

export { closeModalEscapeHandler, checkFilmHandler };
