const globalVars = {
  moviesArr: null,
  activeTab: 'homePage',

  setActiveTab(nameTab){
    this.activeTab = nameTab
  },
  getActiveTab(){
    return this.activeTab
  }
}


export  default globalVars
