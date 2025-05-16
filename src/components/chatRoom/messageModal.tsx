import styled from '@emotion/styled';
import { Title, SubTitle } from '@components/shared/TextStyles';
import { Mask, ModalBody } from '@components/shared/ModalStyles';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
interface MessageModalProps {
  onClose: () => void;
  kind: 'warning' | 'closed' | 'ended';
  roomkey?: string;
}
const MessageModal = ({ onClose, kind, roomkey }: MessageModalProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (kind === 'ended' || kind === 'closed') {
      const timeout = setTimeout(() => {
        navigate('/rooms/exit', { state: { roomKey: roomkey } }); // 모달이 뜬 후 5초 후 이동
      }, 5000); // 5초 후에 이동

      return () => clearTimeout(timeout); // 컴포넌트 언마운트 시 타이머 클리어
    }
  }, [kind, navigate, roomkey]);

  return (
    <>
      <Mask onClick={onClose} />
      <MessageModalBody>
        <Title>{messages[kind].title}</Title>
        <SubTitle>{messages[kind].subTitle}</SubTitle>
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
