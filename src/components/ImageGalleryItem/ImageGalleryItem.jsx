import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({ largeImageURL, webformatURL, tags, openModal }) => (
  <li className={css.galleryItem} onClick={() => openModal({ largeImageURL, tags })}>
    <img className={css.galleryImage} src={webformatURL} alt={tags} />
  </li>
);


