import { ChatRoomContainer, ChatRoomHeader, CloseButton } from '../../styles/chatRoom/chatRoom';
import styled from '@emotion/styled';
import InfoIcon from '@assets/chatRoom/info.svg';
import InviteModal from '@components/chatRoom/InviteModal';
import { useEffect, useState } from 'react';
import useRoomUsersStore from '@store/useRoomUsersStore';
import { ModalPortal } from '@components/shared/ModalPortal';
import { SubTitle, Title } from '@components/shared/TextStyles';
import { Header } from '@components/shared/UIStyles';
import { useWebSocketStore } from '@store/useWebSocketStore';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BalanceQuestionPage = () => {
  const user = useRoomUsersStore((state) => state.user);
  const [isInviteOpen, setIsInviteOpen] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<string>('00:00:00');
  const [questionA, setQuestionA] = useState<string>('');
  const [questionB, setQuestionB] = useState<string>('');

  const { roomKey } = useParams<{ roomKey: string }>();
  const { client } = useWebSocketStore();
  const navigate = useNavigate();

  const fetchQuestion = async () => {
    if (!roomKey) return;
    try {
      const res = await axios.get(`/api/balance/rooms/${roomKey}/votes`, {
        withCredentials: true,
      });
      if (res.data && res.data.data) {
        setQuestionA(res.data.data.questionA);
        setQuestionB(res.data.data.questionB);
      }
    } catch (e) {
      console.error('질문 불러오기 실패:', e);
    }
  };

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
            if (data.type === 'BALANCE_QUESTION_TIME_REMAINING') {
              fetchQuestion();
              setRemainingTime(data.data || '00:00:00');
            } else if (data.type === 'BALANCE_QUESTION_ENDED') {
              navigate(`/balance/${roomKey}/discussion`, {
                state: { roomKey },
              });
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
    <>
      <ChatRoomContainer>
        <ChatRoomHeader>
          <InfoButton onClick={() => setIsInviteOpen(true)} src={InfoIcon} alt='info' />
          <CloseButton>{user?.isLeader ? '종료' : '나가기'}</CloseButton>
        </ChatRoomHeader>
        <BalanceTitle>밸런스 문제 공개</BalanceTitle>
        <BalanceBoxSubTitle>30초 뒤에 화면이 자동으로 넘어가요.</BalanceBoxSubTitle>
        <Balancedetail>제한 시간</Balancedetail>
        <HintTime>{remainingTime}</HintTime>
        <QuestionContainer>
          <QuestionSubContainer>
            <Circle>A</Circle>
            <Question>{questionA}</Question>
          </QuestionSubContainer>
          <Divder>VS</Divder>
          <QuestionSubContainer>
            <Circle style={{ background: '#F06363' }}>B</Circle>
            <Question>{questionB}</Question>
          </QuestionSubContainer>
        </QuestionContainer>
      </ChatRoomContainer>
      {isInviteOpen && roomKey && (
        <ModalPortal>
          <InviteModal onClose={() => setIsInviteOpen(false)} roomId={roomKey} />
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
const QuestionContainer = styled(Header)`
  margin-top: 22px;
  padding: 21px 16px 21px 16px;
  height: fit-content;
  border-radius: 20px;
  background: #f7f7f7;
  gap: 15px;
`;
const QuestionSubContainer = styled(Header)`
  flex-direction: row;
  gap: 11px;
`;

const Circle = styled(Header)`
  width: 43px;
  height: 43px;
  justify-content: center;
  border-radius: 50%;

  background: #a3ee6a;
  color: #fff;
  font-size: 31px;
  font-weight: 600;
`;

const Question = styled.div`
  padding: 31px 30px;
  width: 253px;
  height: 84px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 600;
  border-radius: 11px;
  border: 2px solid #e4e4e4;
  background: #fff;
`;
const Divder = styled.p`
  color: #3e3333;
  text-align: center;
  font-size: 18px;
  font-weight: 800;
  line-height: 140%;
`;
