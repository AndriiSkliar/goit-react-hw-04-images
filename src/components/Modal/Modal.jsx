import React, { useEffect } from 'react';
import css from './Modal.module.css'

export const Modal = ({closeModal, modalData, textImage}) => {

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [closeModal]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

    return (
      <div onClick={handleOverlayClick} className={css.overlay}>
        <div className={css.modal}>
          <button onClick={closeModal} className={css.closeBtn}>
          ❌
          </button>
          <img src={modalData} alt={textImage} className={css.modalImage}/>
          <p className={css.modalText}>{textImage}</p>
        </div>
      </div>
    );
}
