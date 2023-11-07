import React, { useEffect, useState } from 'react';
import { fetchImagesWithQuery } from './Api/api'
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Error } from "./Error/Error";
import { Modal } from "./Modal/Modal";

export const App = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [textImage, setTextImage] = useState(null)

  useEffect(() => {
    if (!value) return;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await fetchImagesWithQuery(value, page);
        setData((prevData) => [...prevData, ...fetchedData]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [value, page]);

  const handleSubmit = query => {
    const trimmedQuery = query.trim();

    if (trimmedQuery === value) {
      return;
    }

    setData([]);
    setValue(trimmedQuery);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = ({ largeImageURL, tags }) => {
    setIsOpenModal(true)
    setModalData(largeImageURL)
    setTextImage(tags)
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setModalData(null);
    setTextImage(null);
  };

  return (
      <div className="container">
        <Searchbar onSubmit={handleSubmit} />
        {error && <Error error={error} />}
        {isLoading && <Loader />}
        {data && data.length > 0 && <ImageGallery data={data} openModal={openModal} />}
        {data && data.length > 11 && <Button onClick={handleLoadMore}>Load More</Button>}
        {isOpenModal && <Modal closeModal={closeModal} modalData={modalData} textImage={textImage} />}
      </div>
    )
}
