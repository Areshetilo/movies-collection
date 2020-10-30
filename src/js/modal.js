import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import filmCardTpl from "../template/film-card.hbs";
import filmCardTplDel from "../template/film-cardDel.hbs";
import filmCardTplDelQ from "../template/film-cardQ.hbs";
import filmCardTplDelW from "../template/film-cardW.hbs";
import castTpl from "../template/cast.hbs";

import { pullData } from "./services/services";
import { write } from "./localStorage.js";
import { modalClBtn, modalClBtTrailer, modalClBtCast } from "./modal-close";
import refs from "../options/refs";
const mainFilmList = document.querySelector(".list-film");

let currentObj;
let idForLocalStorage;

const modalOptions = {
  onShow: () => {
    checkBodyScroll();
  },
  onClose: () => checkBodyScroll(),
};

export function openModal(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  } else {
    idForLocalStorage = event.target.dataset.id;
    let id = event.target.dataset.id;
    getCurrentObj(id);
    fetchCast(id);
  }
}

function checkBodyScroll() {
  document.body.classList.toggle("modal-open");
  const scrollBtn = document.querySelector(".back_to_top");
  scrollBtn.classList.toggle("btn-hidden");
}

function getCurrentObj(id) {
  const getInfo = pullData();
  currentObj;
  getInfo.forEach((elem) => {
    if (elem.id === Number(id)) {
      currentObj = elem;
    }
  });
  drawModal(currentObj);
  write(currentObj);
}

function drawModal(obj) {
  let includeW = 0;
  let includeQ = 0;
  let markup;
  let arrW = JSON.parse(localStorage.getItem("arrWatched")) || [];
  let arrQ = JSON.parse(localStorage.getItem("arrQueue")) || [];

  arrW.forEach((el) => {
    if (JSON.stringify(el) === JSON.stringify(currentObj)) {
      includeW++;
    } else {
      return;
    }
  });

  arrQ.forEach((el) => {
    console.log(JSON.stringify(el) === JSON.stringify(currentObj));
    if (JSON.stringify(el) === JSON.stringify(currentObj)) {
      includeQ++;
    } else {
      return;
    }
  });
  console.log(includeW);
  console.log(includeQ);

  if (includeW && includeQ) {
    markup = filmCardTplDel(obj);
  } else if (includeW && !includeQ) {
    markup = filmCardTplDelW(obj);
  } else if (!includeW && includeQ) {
    markup = filmCardTplDelQ(obj);
  } else {
    markup = filmCardTpl(obj);
  }
  const instance = basicLightbox.create(markup, modalOptions);
  instance.show();
  modalClBtn(instance);
  openTrailerModal();
}

export function openTrailerModal() {
  const trailerBtn = document.querySelector("[data-name ='trailer']");
  trailerBtn.addEventListener("click", () => {
    drawModalForTrailler(idForLocalStorage);
  });
}

mainFilmList.addEventListener("click", openModal);

function drawModalForTrailler(id) {
  const ApiKey = "7f0b5ab01080cb0bb4b9db0d9bc41efa";
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${ApiKey}&language=en-US`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const id = data.results[0].key;
      const instance = basicLightbox.create(`
  <iframe width="560" height="315" src='https://www.youtube.com/embed/${id}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`);
      instance.show();
      modalClBtTrailer(instance);
    })
    .catch(() => {
      const instance = basicLightbox.create(`
    <iframe width="560" height="315" src='http://www.youtube.com/embed/zwBpUdZ0lrQ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `);

      instance.show();
      modalClBtTrailer(instance);
    });
}

export function getIDFromIMG(id) {
  return id;
}

// `
//     <iframe width="560" height="315" src='http://www.youtube.com/embed/zwBpUdZ0lrQ?enablejsapi=1&origin=http://www.youtube.com'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//       `
/* <img src='../assests/images/this-video-is-unavailable-on-YouTube.png' width="200" class="card-image"> */
// `
// <iframe width="560" height="315" src='../assests/images/this-video-is-unavailable-on-YouTube.png' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//   `

export function doneMain() {
  const btnYoutube = document.querySelectorAll(".btn-id");
  btnYoutube.forEach((el) => el.addEventListener("click", getIdForBtnTrailer));
  refs.treilerTitle.forEach((el) =>
    el.addEventListener("click", getIdForBtnTrailer)
  );
}

const getIdForBtnTrailer = (ev) => {
  const idForBtnTrailer = ev.target.dataset.id;
  drawModalForTrailler(idForBtnTrailer);
};

function getCastObj(data) {
  const artistArr = data.cast.slice(0, 4);
  const castBtn = document.querySelector("[data-name='cast']");
  let markUp = castTpl(artistArr);
  castBtn.addEventListener("click", () => {
    const instance = basicLightbox.create(markUp);
    instance.show();
    modalClBtCast(instance);
  });
}

function fetchCast(id) {
  const ApiKey = "7f0b5ab01080cb0bb4b9db0d9bc41efa";
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${ApiKey}`;
  return fetch(url)
    .then((responce) => responce.json())
    .then((data) => {
      getCastObj(data);
    });
}
