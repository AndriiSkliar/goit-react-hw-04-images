import React, { Component } from 'react';
import css from './Modal.module.css'

export default class Modal extends Component {
  state = {

  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'auto';
  }

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { closeModal, modalData, textImage } = this.props;

    return (
      <div onClick={this.handleOverlayClick} className={css.overlay}>
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
}
