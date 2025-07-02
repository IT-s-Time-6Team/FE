import { ChatRoomContainer, ChatRoomHeader, CloseButton } from '../../styles/chatRoom/chatRoom';
import styled from '@emotion/styled';
import InfoIcon from '@assets/chatRoom/info.svg';
import useRoomUsersStore from '@store/useRoomUsersStore';
import { useState } from 'react';
import cat from '@assets/tmi/TMICat.svg';
import Button from '@components/chatRoomCreated/LoginButton';

const TMIInputPage = () => {
  const user = useRoomUsersStore((state) => state.user);
  const [, setIsInviteOpen] = useState<boolean>(false);
  const [active] = useState<boolean>(true);
  return (
    <>
      <ChatRoomContainer>
        <ChatRoomHeader>
          <InfoButton onClick={() => setIsInviteOpen(true)} src={InfoIcon} alt='info' />
          <CloseButton>{user?.isLeader ? '종료' : '나가기'}</CloseButton>
        </ChatRoomHeader>
        <TMItitle>당신의 TMI가 궁금해요!</TMItitle>
        <TMIdetail>오늘의 TMI를 저희에게만 살짝 알려주세요.</TMIdetail>
        <TMIImg src={cat} />
        <TMIInput
          placeholder={`오늘 있었던 TMI를 한 가지 작성해 주세요.\n예) 어제 드라마를 보느라 늦게 잠들었어요.`}
        />
        <SubmitButton text='제출하기' active={active} />
      </ChatRoomContainer>
    </>
  );
};
export default TMIInputPage;
const SubmitButton = styled(Button)`
  position: absolute;
  bottom: 47px;
`;
const InfoButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
export const TMIImg = styled.img`
  object-fit: cover;
`;
export const TMItitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  color: #3e3333;
`;
export const TMIdetail = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: #7c7c7c;
  text-align: center;
`;
const TMIInput = styled.textarea`
  width: 17.9375rem;
  height: 10rem;
  border-radius: 10px;
  border: 1px solid #e4e4e4;
  padding: 1.375rem 1.625rem;
  resize: none;
  font-size: 14px;
  line-height: 20px;
  color: #3e3333;
  background-color: #fff;
  margin-top: 20px;
  &::placeholder {
    color: #b0b0b0;
  }
  &:focus {
    outline: none;
  }
`;
