import globalVars from '../../globalVars/vars';
import localStorageAPI from '../../localStorageAPI';
import refs from '../../refs';

function checkMovieHandler({ target }) {
  const btnWatch = document.querySelector('#btnW');
  const btnQueue = document.querySelector('#btnQ');

  if (target.id === 'btnW') {
    localStorageAPI.toggleMovie(globalVars.watched);
    if (target.textContent === 'add to watched') {
      btnWatch.innerHTML = 'delete from watched';
      btnQueue.innerHTML = 'add to queue';
    } else {
      btnWatch.innerHTML = 'add to watched';
    }
  } else if (target.id === 'btnQ') {
    localStorageAPI.toggleMovie(globalVars.queue);
    if (target.textContent === 'add to queue') {
      btnQueue.innerHTML = 'delete from queue';
      btnWatch.innerHTML = 'add to watched';
    } else {
      btnQueue.innerHTML = 'add to queue';
    }
  }
  if (btnWatch.textContent === 'add to watched') {
    btnWatch.classList.remove('modal-btn--warning');
  } else {
    btnWatch.classList.add('modal-btn--warning');
  }
  if (btnQueue.textContent === 'add to queue') {
    btnQueue.classList.remove('modal-btn--warning');
  } else {
    btnQueue.classList.add('modal-btn--warning');
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

export { closeModalEscapeHandler, checkMovieHandler };
