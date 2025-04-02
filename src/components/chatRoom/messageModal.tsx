import styled from '@emotion/styled';
import { Title, SubTitle } from '@components/shared/TextStyles';
const MessageModal = () => {
  return (
    <>
      <Mask />
      <ModalBody>
        <Title>채팅룸 종료 5분전</Title>
        <SubTitle>잠시 뒤에 채팅룸이 자동으로 종료돼요.</SubTitle>
      </ModalBody>
    </>
  );
};
export default MessageModal;
const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;
const ModalBody = styled.div`
  width: 342px;
  height: 122px;
  border-radius: 12px;
  background: #fff;
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 36px 65px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
