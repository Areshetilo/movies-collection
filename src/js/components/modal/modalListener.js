import globalVars from '../../globalVars/vars';
import localStorageAPI from '../../localStorageAPI';
import refs from '../../refs';

function toggleButtonClass(btnW, btnQ) {
  if (btnW.textContent === 'add to watched') {
    btnW.classList.remove('modal-btn--warning');
  } else {
    btnW.classList.add('modal-btn--warning');
  }
  if (btnQ.textContent === 'add to queue') {
    btnQ.classList.remove('modal-btn--warning');
  } else {
    btnQ.classList.add('modal-btn--warning');
  }
}

function toggleButtonContent(elTextContent, elClicked, btnW, btnQ) {
  if (elClicked === 'btnW') {
    if (elTextContent === 'add to watched') {
      btnW.innerHTML = 'delete from watched';
      btnQ.innerHTML = 'add to queue';
      return;
    }
    btnW.innerHTML = 'add to watched';
    return;
  }
  if (elTextContent === 'add to queue') {
    btnQ.innerHTML = 'delete from queue';
    btnW.innerHTML = 'add to watched';
    return;
  }
  btnQ.innerHTML = 'add to queue';
}

function checkMovieHandler({ target }) {
  const btnWatch = document.querySelector('#btnW');
  const btnQueue = document.querySelector('#btnQ');

  if (target.id === 'btnW') {
    localStorageAPI.toggleMovie(globalVars.watched);
    toggleButtonContent(target.textContent, target.id, btnWatch, btnQueue);
  } else if (target.id === 'btnQ') {
    localStorageAPI.toggleMovie(globalVars.queue);
    toggleButtonContent(target.textContent, target.id, btnWatch, btnQueue);
  }
  if (btnWatch || btnQueue) {
    toggleButtonClass(btnWatch, btnQueue);
  }
}

function closeModalEscapeHandler({ code, target }) {
  if (
    code === 'Escape' ||
    target.className === 'lightbox_closeBtn' ||
    target.className === 'lightbox'
  ) {
    document
      .querySelector('.basicLightbox')
      .classList.remove('basicLightbox--visible');
    refs.body.classList.remove('modal-open');
    window.removeEventListener('keydown', closeModalEscapeHandler);
    document.removeEventListener('click', closeModalEscapeHandler);
    document.removeEventListener('click', closeModalEscapeHandler);
    setTimeout(() => document.querySelector('.basicLightbox').remove(), 410);
  }
}

export { closeModalEscapeHandler, checkMovieHandler };
