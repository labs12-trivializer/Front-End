import styled from 'styled-components';

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
`;

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.33;
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  background: white;
  color: black;
  z-index: 60;
  max-width: 80%;
  width: 800px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ModalContainer = styled.div`
`;
