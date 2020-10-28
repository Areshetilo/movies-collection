const globalVars = {
  popularMoviesArr: [],
  activeTab: 'homePage',
  WATCHED: 'watched',
  QUEUE : 'queue',

  setActiveTab(nameTab){
    this.activeTab = nameTab
  },
  getActiveTab(){
    return this.activeTab
  }
}


export  default globalVars
