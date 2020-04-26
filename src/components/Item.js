import React, { useState } from 'react';
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';

Modal.setAppElement('#root')

function Item({ data }) {
  const { image, title, description, contact = '6287708770800' } = data;
  const orderText = 'Halo%20mau%20order%20nih%20gan';
  const url = isMobile ? `whatsapp://send?phone=${contact}&text=${orderText}` : `https://wa.me/${contact}?text=${orderText}`;

  const [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="item-jajanan">
      <div className="item-jajanan-summary" onClick={() => openModal()}>
        <div className="summary-cover">
          <img src={image} alt={title} />
        </div>
        <div className="summary-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Detil Jajanan"
        className="reveal"
      >
        <div className="item-jajanan-detail">
          <div className="detail-cover">
            <img src={image} alt={title} />
          </div>
          <div className="detail-content">
            <div className="detail-meta">
              {/* <div className="detail-rate">
                <h6><span>★</span>: <strong>{rate}/5</strong></h6>
              </div> */}
            </div>
            <h2>{title}</h2>
            <p>{description}</p>
            <div className="button-container">
              <a href={url} className="button">Kirim Chat (WA)</a>
            </div>
          </div>
        </div>
        <button className="close-button" onClick={closeModal}>&times;</button>
      </Modal>
    </div>
  )
}

export default Item;