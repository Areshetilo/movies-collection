



const makeFetch = {

  key: '18291614-3687f9869972091b65dd4882c',
  page: 1,
  perPage: 3,
  targetSearch: '',


  crateFetchFind(){
    return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=
        ${this.targetSearch}&page=${this.page}&per_page=${this.perPage}&key=${this.key}`)
      .then(res=>res.json())
      .then(({hits})=>{
        this.nextPage();
        return hits;
      });
  },

  nextPage(){
    this.page++;

  },

  resetPage(){
    this.page = 1;
  },

  setPerPage(newPerPage){
    this.perPage = newPerPage;
  }


}



export default  makeFetch
