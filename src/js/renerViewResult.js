import itemsResultTemplate from "../templates/itemsResultTemplate.hbs";
import refs from "./refs";


const render = {
  index: 0,

  renderResult(data) {
      refs.imagesList.insertAdjacentHTML('beforeend', itemsResultTemplate(data));

  },
}


export default render;
