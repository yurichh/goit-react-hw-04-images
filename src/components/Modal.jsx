import { React, useEffect, useCallback } from 'react';

const Modal = ({ toggleModal, currentImage }) => {
  const closeEscape = useCallback(
    e => {
      if (e.key === 'Escape') toggleModal();
    },
    [toggleModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', closeEscape);
    return () => {
      window.removeEventListener('keydown', closeEscape);
    };
  }, [closeEscape]);

  function closeBackdrop(e) {
    if (e.target === e.currentTarget) toggleModal();
  }

  const { image, text } = currentImage;
  return (
    <div className="overlay" onClick={closeBackdrop}>
      <div className="modal">
        <button type="button" className="modal-close-btn" onClick={toggleModal}>
          X
        </button>
        <img src={image} alt={text} className="modal-img" />
      </div>
    </div>
  );
};

export default Modal;
