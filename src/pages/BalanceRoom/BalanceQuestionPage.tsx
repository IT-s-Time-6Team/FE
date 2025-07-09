import { ChatRoomContainer, ChatRoomHeader, CloseButton } from '../../styles/chatRoom/chatRoom';
import styled from '@emotion/styled';
import InfoIcon from '@assets/chatRoom/info.svg';
import InviteModal from '@components/chatRoom/InviteModal';
import { useState } from 'react';
import useRoomUsersStore from '@store/useRoomUsersStore';
import { ModalPortal } from '@components/shared/ModalPortal';
import { SubTitle, Title } from '@components/shared/TextStyles';
import { Container } from '@components/shared/UIStyles';

const BalanceQuestionPage = () => {
  const user = useRoomUsersStore((state) => state.user);
  const [isInviteOpen, setIsInviteOpen] = useState<boolean>(false);

  return (
    <>
      <ChatRoomContainer>
        <ChatRoomHeader>
          <InfoButton onClick={() => setIsInviteOpen(true)} src={InfoIcon} alt='info' />
          <CloseButton>{user?.isLeader ? '종료' : '나가기'}</CloseButton>
        </ChatRoomHeader>
        <BalanceTitle>첫 번째 밸런스 문제 공개</BalanceTitle>
        <BalanceBoxSubTitle>30초 뒤에 화면이 자동으로 넘어가요.</BalanceBoxSubTitle>
        <Balancedetail>제한 시간</Balancedetail>
        <HintTime>00:30:00</HintTime>
        <QuestionContainer>
          <QuestionSubContainer>
            <Circle>A</Circle>
            <Question></Question>
          </QuestionSubContainer>
        </QuestionContainer>
      </ChatRoomContainer>
      {isInviteOpen && (
        <ModalPortal>
          <InviteModal onClose={() => setIsInviteOpen(false)} roomId={''} />
        </ModalPortal>
      )}
    </>
  );
};

export default BalanceQuestionPage;

const InfoButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const BalanceTitle = styled(Title)`
  color: #3e3333;
  text-align: center;
`;
const BalanceBoxSubTitle = styled(SubTitle)``;
const Balancedetail = styled(SubTitle)`
  margin-top: 38px;
`;

const HintTime = styled.h1`
  margin-top: -7px;
  font-size: 30px;
  fonte-weitght: 600;
  color: #333;
`;
const QuestionContainer = styled(Container)`
  margin: 22px 24px 0 24px;
  padding: 21px 16px 21px 16px;
  border-radius: 20px;
  background: #f7f7f7;
`;
const QuestionSubContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 11px;
`;

const Circle = styled.div`
  width: 43px;
  height: 43px;
  text-align: center;
  background: #a3ee6a;
  border-radius: 50%;
`;
const Question = styled.div`
  padding: 31px 56px;
  width: 253px;
  height: 84px;
  border-radius: 11px;
  border: 2px solid #e4e4e4;
  background: #fff;
`;
