import './styles.css';

import 'basicLightbox/dist/basicLightbox.min.css';
import makeFetch from "./js/createFetchFind";
import refs from "./js/refs";
import render from "./js/renerViewResult";
import infinityScroll from "./js/infinityScroll";
import 'fslightbox';
import spinner from "./js/spinner";









refs.form.addEventListener('submit',searchForSubmit );






function searchForSubmit(event) {
  event.preventDefault();
  spinner.show();

  makeFetch.targetSearch = event.currentTarget.elements.query.value;
  refs.imagesList.innerHTML = '';
  makeFetch.resetPage();
  makeFetch.crateFetchFind().then(data=>{
    render.renderResult(data)
    refreshFsLightbox();
    lazyLoadImg();

  }).finally(()=>{
    spinner.hide();
  });


}


function lazyLoadImg() {
  refreshFsLightbox();
  const imageListItem = document.querySelectorAll('.images-list__item');
  infinityScroll.observe(imageListItem[imageListItem.length-1]);


}


export default lazyLoadImg;








