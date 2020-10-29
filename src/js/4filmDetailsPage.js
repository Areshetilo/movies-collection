const refs = {
    image: document.querySelector('.js-details-image'),
    title: document.querySelector('.js-details-title'),
    vote: document.querySelector('.js-vote'),
    popularity: document.querySelector('.js-popularity'),
    originalTitle: document.querySelector('.js-original__title'),
    genre: document.querySelector('.js-genre'),
    detailsAboutText: document.querySelector('.js-details-about-text'),
}

function monitorButtonStatusText(){
    let storageFilmWatched = localStorage.getItem('filmsWatched');
    storageFilmWatched === null ? 
    addedWatchedButton.textContent = "Add to watched" : JSON.parse(storageFilmWatched).find(el => el.id === selectFilm.id) ?
    addedWatchedButton.textContent = "Delete from watched" : addedWatchedButton.textContent = "Add to watched";

    let storageFilmQueue = localStorage.getItem('filmsQueue');
    storageFilmQueue === null ? 
    addedQueueButton.textContent = "Add to queue" : JSON.parse(storageFilmQueue).find(el => el.id === selectFilm.id) ?
    addedQueueButton.textContent = "Delete from queue" : addedQueueButton.textContent = "Add to queue";
}

function toggleToQueue () {
    let filmsQueueArray = [];
    let storageData = localStorage.getItem('filmsQueue');
    if (storageData !== null) {
        filmsQueueArray.push(...JSON.parse(storageData));
    }
    if (filmsQueueArray.find(el => el.id === selectFilm.id)){
        filmsQueueArray = filmsQueueArray.filter(el => el.id !== selectFilm.id);
    }
    else {
        filmsQueueArray.push(selectFilm);
    }
    localStorage.setItem('filmsQueue', JSON.stringify(filmsQueueArray));
    monitorButtonStatusText();
};

function toggleToWatched () {
    let filmsWatchedArray = [];
    let storageData = localStorage.getItem('filmsWatched');
    if (storageData !== null) {
        filmsWatchedArray.push(...JSON.parse(storageData));
    }
    if (filmsWatchedArray.find(el => el.id === selectFilm.id)){
        filmsWatchedArray = filmsWatchedArray.filter(el => el.id !== selectFilm.id);
    }
    else {
        filmsWatchedArray.push(selectFilm);
    }
    localStorage.setItem('filmsWatched', JSON.stringify(filmsWatchedArray));
    monitorButtonStatusText();
};

function showDetails(selectFilm){
    refs.image.setAttribute('src', `https://image.tmdb.org/t/p/w500/${selectFilm.poster_path}`);
    refs.title.textContent = selectFilm.title;
    refs.vote.textContent = selectFilm.vote_average;
    refs.popularity.textContent = selectFilm.popularity;
    refs.originalTitle.textContent = selectFilm.original_title;
    refs.genre.textContent = String(genres.filter(el => selectFilm.genre_ids.find(item => el.id === item) ? 
    true : false).reduce((acc, item) => acc + '${item.name}, ', '')).slice(0, -2);
    refs.detailsAboutText.textContent = selectFilm.overview;

    monitorButtonStatusText();
};