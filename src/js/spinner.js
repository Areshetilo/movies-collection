const spinner =   {
    loadMore :  document.querySelector('.lds-ring'),


  show(){
    this.loadMore.classList.add('is-visible')
  },
  hide(){
    this.loadMore.classList.remove('is-visible')
  },

}

export  default  spinner;
