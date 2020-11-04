import refs from './refs';
import audio from '../audio/toasty.mp3';

const audioPlayer = new Audio(audio);

function showToasty() {
  refs.toasty.classList.add('show-toasty');
  audioPlayer.play();
}

function destroyToasty() {
  setTimeout(() => {
    refs.toasty.classList.remove('show-toasty');
  }, 1200);
}

export { showToasty, destroyToasty };
