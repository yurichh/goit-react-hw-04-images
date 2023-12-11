import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { useState, useEffect } from 'react';
import { serviceImages } from 'services/api';

import React from 'react';

const App = () => {
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState({});

  useEffect(() => {
    const getImages = async (q, p) => {
      try {
        setLoading(true);
        setLoadMore(false);
        const { data } = await serviceImages(q, p);
        // console.log(q, p);
        setImages(prev => [...prev, ...data.hits]);
        setLoadMore(page < Math.ceil(data.totalHits / 12));
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (query) getImages(query, page);
  }, [page, query]);

  const getCurrentImage = (img, text) => {
    setCurrentImage({ image: img, text: text });
    setShowModal(true);
  };
  const toggleModal = () => {
    setShowModal(prev => !prev);
  };
  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };
  const pageIncrement = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <Searchbar handleSubmit={handleSubmit} />
      <ImageGallery images={images} getCurrentImage={getCurrentImage} />
      {loadMore && <Button pageIncrement={pageIncrement} />}
      {loading && <Loader />}
      {showModal && (
        <Modal toggleModal={toggleModal} currentImage={currentImage} />
      )}
    </>
  );
};

export default App;
