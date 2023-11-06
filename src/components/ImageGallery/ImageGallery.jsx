import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import css from './ImageGallery.module.css'

export const ImageGallery = ({ data, openModal }) => (
    <ul className={css.gallery}>
    {data === null || data.length === 0
      ? (<p>No images found 🙁</p>)
      : (data.map(({ id, largeImageURL, tags, webformatURL }) => (
        <ImageGalleryItem
          key={id}
          largeImageURL={largeImageURL}
          tags={tags}
          webformatURL={webformatURL}
          openModal={openModal}
        />
      ))
    )}
  </ul>
);


