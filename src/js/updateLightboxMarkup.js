import imageLightboxTemplate from '../templates/imageLightbox.hbs';

const updateLightboxMarkup = (src, alt) => imageLightboxTemplate({ src, alt });

export default updateLightboxMarkup;
