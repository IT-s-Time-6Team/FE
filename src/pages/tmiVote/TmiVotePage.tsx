import questionIcon from '@assets/v2/questionBubble.svg';
import { ChatRoomContainer, ChatRoomHeader, CloseButton } from '../../styles/chatRoom/chatRoom';
import { Header } from '@components/shared/UIStyles';
import InfoIcon from '@assets/chatRoom/info.svg';
import { useState } from 'react';
import { ModalPortal } from '@components/shared/ModalPortal';
import InviteModal from '@components/chatRoom/InviteModal';
import { Title, SubTitle } from '@components/shared/TextStyles';
import styled from '@emotion/styled';
const TmiVotePage = () => {
  const [isInviteOpen, setIsInviteOpen] = useState<boolean>(false);
  return (
    <ChatRoomContainer>
      <ChatRoomHeader>
        <InfoButton onClick={() => setIsInviteOpen(true)} src={InfoIcon} alt='info' />
        <CloseButton>종료</CloseButton>
      </ChatRoomHeader>
      <Header>
        <Title>누구의 TMI일까?</Title>
        <SubTitle>누가 TMI를 말했을지 맞춰보세요!</SubTitle>
      </Header>
      <img src={questionIcon} />

      <TmiText>오늘 아침에 양치하다가 칫솔을 떨어뜨려서 새 칫솔로 교체했어요.</TmiText>
      {isInviteOpen && (
        <ModalPortal>
          <InviteModal onClose={() => setIsInviteOpen(false)} roomId='sdfs3' />
        </ModalPortal>
      )}
    </ChatRoomContainer>
  );
};
export default TmiVotePage;
const InfoButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
const TmiText = styled(SubTitle)`
  color: #3e3333;
`;
