import globalVars from './globalVars/vars';

function checkBodyScroll() {
  if (!globalVars.isOpenModal) {
    globalVars.isOpenModal = true;
    console.log('модалка ' + globalVars.isOpenModal);
  }
  document.body.classList.toggle('modal-open');
}

const modalOptions = {
  onShow: () => {
    checkBodyScroll();
  },
  onClose: () => checkBodyScroll(),
};

export default modalOptions;
