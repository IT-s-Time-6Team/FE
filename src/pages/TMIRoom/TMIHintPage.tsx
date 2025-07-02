import { useEffect, useState } from 'react';
import { ChatRoomContainer } from '../../styles/chatRoom/chatRoom';
import { TMIdetail, TMIImg, TMItitle } from './TMIInputPage';
import tmi from '@assets/tmi/TMI.svg';
import styled from '@emotion/styled';
import ForceCloseModal from './ForceCloseModal';
import { useWebSocketStore } from '@store/useWebSocketStore';
import { useNavigate, useParams } from 'react-router-dom';

const TMIHintPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<string>('00:00:00');

  const { roomKey } = useParams<{ roomKey: string }>();
  const { client } = useWebSocketStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!client || !roomKey) {
      console.log('WebSocket 클라이언트나 roomKey가 없습니다.');
      console.log('클라이언트 상태:', client);

      return;
    }

    const trySubscribe = () => {
      if (client.connected) {
        console.log('WebSocket 연결됨:', client.connected);

        const sub = client.subscribe(`/topic/room/${roomKey}/messages`, (message) => {
          try {
            const data = JSON.parse(message.body);
            if (data.type === 'TMI_HINT_TIME_REMAINING') {
              setRemainingTime(data.data || '00:00:00');
            } else if (data.type === 'TMI_HINT_ENDED') {
              navigate(`/tmi/${roomKey}/vote`);
            }
          } catch (e) {
            console.error('메시지 파싱 오류:', e);
          }
        });

        clearInterval(interval); // 연결됐으면 반복 중단
        return () => sub.unsubscribe();
      }
    };

    const interval = setInterval(trySubscribe, 500);
    return () => clearInterval(interval);
  }, [client, roomKey]);

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
      <HintTime>{remainingTime}</HintTime>
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

const HintTime = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-top: 8px;
  color: #333;
`;
