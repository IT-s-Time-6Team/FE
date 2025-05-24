import questionIcon from '@assets/v2/questionBubble.svg';
import { ChatRoomHeader, CloseButton } from '../../styles/chatRoom/chatRoom';
import InfoIcon from '@assets/chatRoom/info.svg';
import { useState } from 'react';
import { ModalPortal } from '@components/shared/ModalPortal';
import InviteModal from '@components/chatRoom/InviteModal';
import styled from '@emotion/styled';
const TmiVotePage = () => {
  const [isInviteOpen, setIsInviteOpen] = useState<boolean>(false);
  return (
    <>
      <ChatRoomHeader>
        <InfoButton onClick={() => setIsInviteOpen(true)} src={InfoIcon} alt='info' />
        <CloseButton>종료</CloseButton>
      </ChatRoomHeader>
      <img src={questionIcon} />
      {isInviteOpen && (
        <ModalPortal>
          <InviteModal onClose={() => setIsInviteOpen(false)} roomId='sdfs3' />
        </ModalPortal>
      )}
    </>
  );
};
export default TmiVotePage;
const InfoButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
