import styled from '@emotion/styled';
import { Title, SubTitle } from '@components/shared/TextStyles';
import { Mask, ModalBody } from '@components/shared/ModalStyles';
const messages = {
  warning: {
    title: '채팅룸 종료 5분 전!',
    subTitle: '잠시 뒤에 채팅룸이 자동으로 종료돼요.',
  },
  closed: {
    title: '방장이 채팅룸을 종료했어요.',
    subTitle: '5초 후 요약 페이지로 이동할게요.',
  },
  ended: {
    title: '채팅룸이 종료되었어요.',
    subTitle: '5초 후 요약 페이지로 이동할게요.',
  },
};

const MessageModal = () => {
  return (
    <>
      <Mask />
      <MessageModalBody>
        <Title>{messages.warning.title}</Title>
        <SubTitle>{messages.warning.subTitle}</SubTitle>
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
