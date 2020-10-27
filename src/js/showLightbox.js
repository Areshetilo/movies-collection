require('fslightbox');

const showLightbox = (imageSrcArr, currentTargetId) => {
  const lightbox = new FsLightbox();
  lightbox.props.loadOnlyCurrentSource = true;
  lightbox.props.exitFullscreenOnClose = true;
  lightbox.props.sources = imageSrcArr;
  lightbox.open(currentTargetId);
};

export default showLightbox;
