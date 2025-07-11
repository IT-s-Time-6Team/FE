import { ChatRoomContainer, ChatRoomHeader } from '../../styles/chatRoom/chatRoom';
import styled from '@emotion/styled';
import InfoIcon from '@assets/chatRoom/info.svg';
import InviteModal from '@components/chatRoom/InviteModal';
import { useEffect, useState } from 'react';
import { ModalPortal } from '@components/shared/ModalPortal';
import { SubTitle, Title } from '@components/shared/TextStyles';
import { Header } from '@components/shared/UIStyles';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '@api/api';
import cat from '@assets/balance/BalanceCat.svg'; // Assuming you have an image for the balance vote
import Button from '@components/chatRoomCreated/LoginButton';

const BalanceVotePage = () => {
  const [isInviteOpen, setIsInviteOpen] = useState<boolean>(false);
  const [questionA, setQuestionA] = useState<string>('');
  const [questionB, setQuestionB] = useState<string>('');
  const [selected, setSelected] = useState<string | null>(null);

  const { roomKey } = useParams<{ roomKey: string }>();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!roomKey) {
      console.error('Room key is not defined');
      return;
    }

    if (!roomKey) return;
    try {
      console.log('투표 제출:', selected);
      const res = await axios.post(`/api/balance/rooms/${roomKey}/votes`, {
        selectedChoice: selected,
      });
      if (res.status === 200) {
        console.log('투표 제출 성공');
        navigate(`/balance/${roomKey}/voteload`, {
          state: { roomKey, questionA, questionB },
        });
      } else {
        console.error('투표 제출 실패:', res.data.message);
      }
    } catch (e) {
      console.error('질문 불러오기 실패:', e);
    }
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      if (!roomKey) return;
      try {
        const res = await axios.get(`/api/balance/rooms/${roomKey}/votes`);
        if (res.data && res.data.data) {
          setQuestionA(res.data.data.questionA);
          setQuestionB(res.data.data.questionB);
        }
      } catch (e) {
        console.error('질문 불러오기 실패:', e);
      }
    };
    fetchQuestion();
  }, []);

  return (
    <>
      <ChatRoomContainer>
        <ChatRoomHeader>
          <InfoButton onClick={() => setIsInviteOpen(true)} src={InfoIcon} alt='info' />
        </ChatRoomHeader>
        <BalanceTitle>밸런스 투표 타임</BalanceTitle>
        <BalanceBoxSubTitle>둘 중 어떤 상황이 더 나은지 투표해주세요!</BalanceBoxSubTitle>
        <Img src={cat} alt='cat' />
        <QuestionContainer>
          <QuestionSubContainer>
            <Question onClick={setSelected.bind(null, 'A')} isActive={selected === 'A'}>
              <Circle>A</Circle>
              {questionA}
            </Question>
          </QuestionSubContainer>
          <Divder>VS</Divder>
          <QuestionSubContainer>
            <Question onClick={setSelected.bind(null, 'B')} isActive={selected === 'B'}>
              <Circle style={{ background: '#F06363' }}>B</Circle>
              {questionB}
            </Question>
          </QuestionSubContainer>
        </QuestionContainer>
        <SubmitButton text='제출하기' active={selected !== null} onClick={handleSubmit} />
      </ChatRoomContainer>
      {isInviteOpen && roomKey && (
        <ModalPortal>
          <InviteModal onClose={() => setIsInviteOpen(false)} roomId={roomKey} />
        </ModalPortal>
      )}
    </>
  );
};

export default BalanceVotePage;

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
const SubmitButton = styled(Button)`
  position: absolute;
  bottom: 47px;
`;
export const QuestionContainer = styled(Header)`
  margin-top: 22px;
  height: fit-content;
  border-radius: 20px;
  flex-direction: row;
`;
export const QuestionSubContainer = styled(Header)`
  gap: 11px;
  position: relative;
`;

export const Circle = styled(Header)`
  width: 43px;
  height: 43px;
  justify-content: center;
  border-radius: 50%;

  background: #a3ee6a;
  color: #fff;
  font-size: 31px;
  font-weight: 600;

  position: absolute;
  top: -20px;
`;

export const Question = styled.div<{ isActive?: boolean }>`
  padding: 65px 26px;

  padding: auto;

  width: 158px;
  height: 185px;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  white-space: normal;

  font-weight: 600;
  border-radius: 11px;
  border: 2px solid #e4e4e4;
  background: #fff;
  ${(props) =>
    props.isActive &&
    `
    border: 2px solid #FF7913;
    background: #FF7913;
  `}
`;
const Divder = styled.p`
  color: #3e3333;
  text-align: center;
  font-size: 18px;
  font-weight: 800;
  line-height: 140%;
`;
const Img = styled.img`
  object-fit: cover;
`;
