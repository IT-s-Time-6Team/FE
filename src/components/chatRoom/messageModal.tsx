import styled from '@emotion/styled';
import { Title, SubTitle } from '@components/shared/TextStyles';
import { Mask, ModalBody } from '@components/shared/ModalStyles';
const MessageModal = () => {
  return (
    <>
      <Mask />
      <MessageModalBody>
        <Title>채팅룸 종료 5분전</Title>
        <SubTitle>잠시 뒤에 채팅룸이 자동으로 종료돼요.</SubTitle>
      </MessageModalBody>
    </>
  );
};
export default MessageModal;

const MessageModalBody = styled(ModalBody)`
  align-items: center;
  width: 342px;
  height: 122px;
`;
