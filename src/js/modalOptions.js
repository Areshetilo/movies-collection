import refs from "./refs";
import localStorageAPI from "./localStorageAPI";
import globalVars from "./globalVars/vars";

const modalOptions = {
  onShow: () => {
    checkBodyScroll();
  },
  onClose: () => checkBodyScroll(),
};

function checkBodyScroll() {
  if(!globalVars.isOpenModal){
    globalVars.isOpenModal = true;
    console.log("модалка " + globalVars.isOpenModal);
  }
  document.body.classList.toggle("modal-open");

}


export default modalOptions
