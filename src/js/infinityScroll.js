import makeFetch from "./createFetchFind";
import render from "./renerViewResult";
import lazyLoadImg from "../index";
import spinner from "./spinner";

const options = {
  rootMargin: '250px',
}
const onEntry = (entries, observer) =>{
  entries.forEach(entry =>{

    if(entry.isIntersecting){
      observer.unobserve(entry.target);
      loadMore();
    }
  })
}

function loadMore() {
  spinner.show();
  makeFetch.crateFetchFind().then(data => {
    render.renderResult(data);
    lazyLoadImg();

  }).finally(()=>{
    spinner.hide();
  });
}


const  infinityScroll = new IntersectionObserver(onEntry, options);


export default infinityScroll;

