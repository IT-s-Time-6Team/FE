import styled from '@emotion/styled';
export const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;
export const ModalBody = styled.div`
  width: 303px;
  height: 383px;
  border-radius: 12px;
  background: #fff;
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 36px 23px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
