import { useState } from 'react';
import { ChatRoomContainer } from '../../styles/chatRoom/chatRoom';
import { TMIdetail, TMIImg, TMItitle } from './TMIInputPage';
import tmi from '@assets/tmi/TMI.svg';
import styled from '@emotion/styled';
import ForceCloseModal from './ForceCloseModal';

const TMIHintPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <ChatRoomContainer>
      <TMItitle>TMI 힌트 타임!</TMItitle>
      <TMIdetail>
        작성한 TMI와 관련된 진실 이야기와
        <br />
        거짓 이야기를 각각 하나씩 말해주세요.
      </TMIdetail>
      <TMIImg src={tmi} alt='tmi' />
      <TMIdetail>제한 시간</TMIdetail>
      <h1>00:00:00</h1>
      <TMITips>
        Tip: 어느 이야기가 진실인지, 혹은 거짓인지
        <br />
        밝히지 않아도 좋아요.
      </TMITips>
      <Close onClick={() => setIsModalOpen(true)}>강제 종료</Close>
      {isModalOpen && <ForceCloseModal onClose={setIsModalOpen} />}
    </ChatRoomContainer>
  );
};
export default TMIHintPage;
const Close = styled.button`
  position: absolute;
  bottom: 4rem;
  color: #b7b7b7;
  font-weight: 500;
  font-size: 0.875rem;
  background: transparent;
`;
const TMITips = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #7c7c7c;
  padding: 0.8125rem 1.1875rem;
  border-radius: 0.5rem;
  background: rgba(240, 240, 240, 0.4);
`;
