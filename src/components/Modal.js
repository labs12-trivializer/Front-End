import React from 'react';
import {
  Modal,
  ModalWrapper,
  Overlay,
  ContentContainer
} from '../styles/modal.css';

const ModalComponent = ({ onClose, children }) => {
  return (
    <ModalWrapper>
      <Overlay
        onClick={() => {
          onClose && onClose();
        }}
      />
      <Modal>
        <ContentContainer>{children}</ContentContainer>
      </Modal>
    </ModalWrapper>
  );
};

export default ModalComponent;
