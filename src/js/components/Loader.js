class Loader {
  constructor(selector, hiddenClass) {
    this.$el = document.querySelector(selector);
    this.hiddenClass = hiddenClass;
  }
  show() {
    this.$el.classList.remove(this.hiddenClass);
  }
  hide() {
    this.$el.classList.add(this.hiddenClass);
  }
}
export default Loader;
