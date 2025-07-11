import { ChatRoomContainer, ChatRoomHeader, CloseButton } from '../../styles/chatRoom/chatRoom';
import styled from '@emotion/styled';
import InfoIcon from '@assets/chatRoom/info.svg';
import InviteModal from '@components/chatRoom/InviteModal';
import { useEffect, useState } from 'react';
import useRoomUsersStore from '@store/useRoomUsersStore';
import { ModalPortal } from '@components/shared/ModalPortal';
import { SubTitle } from '@components/shared/TextStyles';
import { Header } from '@components/shared/UIStyles';
import { ResultText } from '../../styles/roomExit/exitPageStyles';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getBalanceVoteResult } from '@api/voteResult';
import { BalanceVotingResultsResponse } from '@api/voteResult';
import axios from 'axios';
import Button from '@components/shared/Button';
const BalanceResultPage = () => {
  const [isInviteOpen, setIsInviteOpen] = useState<boolean>(false);
  const [result, setResult] = useState<BalanceVotingResultsResponse>();
  const user = useRoomUsersStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { roomKey } = useParams<{ roomKey: string }>();
  const questionA = location.state?.questionA;
  const questionB = location.state?.questionB;
  useEffect(() => {
    if (!roomKey) {
      console.warn('roomKey 없음');
      return;
    }

    const fetchVoteInfo = async () => {
      try {
        const res = await getBalanceVoteResult(roomKey);
        setResult(res);
      } catch (err) {
        console.error('가져오기 실패:', err);
      }
    };

    fetchVoteInfo();
    readyToNext();
    console.log(user);
  }, [roomKey]);
  const readyToNext = async () => {
    try {
      const res = await axios.post(`/api/balance/rooms/${roomKey}/votes/ready`);
      console.log(res);
      return res.data;
    } catch (error: unknown) {
      console.error('error', error);
      throw error;
    }
  };

  return (
    <>
      <ChatRoomContainer>
        <ChatRoomHeader>
          <InfoButton onClick={() => setIsInviteOpen(true)} src={InfoIcon} alt='info' />
          <CloseButton>{user?.isLeader ? '종료' : '나가기'}</CloseButton>
        </ChatRoomHeader>
        <Header>
          <ResultText>밸런스 투표 결과</ResultText>
          <SubTitle>가장 많은 사람들이 선택한 답을 확인해보세요!</SubTitle>
        </Header>
        <QuestionContainer>
          <QuestionSubContainer>
            <GaugeBackground percentage={result?.choiceAPercentage || 0} />
            <CircleBox>
              <Circle>A</Circle>
              <Percent>{result?.choiceAPercentage}%</Percent>
            </CircleBox>
            <Question>{questionA}</Question>
          </QuestionSubContainer>

          <QuestionSubContainer>
            <GaugeBackground percentage={result?.choiceAPercentage || 0} />
            <CircleBox>
              <Circle style={{ background: '#F06363' }}>B</Circle>
              <Percent>{result?.choiceBPercentage}%</Percent>
            </CircleBox>
            <Question>{questionB}</Question>
          </QuestionSubContainer>
        </QuestionContainer>
        <div>
          <Percent>나의 응답</Percent>
          <ResultBox>
            <Circle
              style={{
                background: result?.myChoice === 'B' ? '#F06363' : undefined,
                position: 'relative',
              }}
            >
              {result?.myChoice}
            </Circle>
            <PercentBox>
              <Percent>
                {result?.myChoice === 'A' ? questionA : result?.myChoice === 'B' ? questionB : ''}
              </Percent>
            </PercentBox>
          </ResultBox>
        </div>
        <Button
          onClick={() =>
            navigate(`/balance/${roomKey}/rank`, {
              state: { result, roomKey },
            })
          }
          text='다음으로'
        />
      </ChatRoomContainer>
      {isInviteOpen && roomKey && (
        <ModalPortal>
          <InviteModal onClose={() => setIsInviteOpen(false)} roomId={roomKey} />
        </ModalPortal>
      )}
    </>
  );
};
export default BalanceResultPage;
const InfoButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
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
  top: -2px;
  left: -2px;
`;
export const Percent = styled.p`
  font-size: 16px;
  font-weight: 600;
`;
const CircleBox = styled.div`
  width: 108px;
  height: 43px;
  border: 2px solid #e4e4e4;
  border-radius: 21.5px;
  background-color: white;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 13px;
  box-sizing: border-box;
  z-index: 15;
  top: -20px;
`;
const GaugeBackground = styled.div<{ percentage: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${({ percentage }) => `calc(${percentage}% )`};
  background-color: #f2f2f2;
  transition: height 0.6s ease;
  z-index: 1;
  border-radius: 9px;
`;
const PercentBox = styled.div`
  width: 253px;
  height: 84px;
  border-radius: 11px;
  border: 2px solid #e4e4e4;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ResultBox = styled.div`
  width: 342px;
  height: 126px;
  border-radius: 20px;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 15px;
  margin-bottom: 70px;
`;
export const QuestionContainer = styled(Header)`
  margin-top: 60px;
  margin-bottom: 30px;
  height: fit-content;
  border-radius: 20px;
  flex-direction: row;
`;
export const QuestionSubContainer = styled.div`
  display: flex;
  width: 158px;
  height: 185px;
  padding: 65px 23px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  position: relative;
  box-sizing: border-box;
  border-radius: 11px;
  border: 2px solid #e4e4e4;
`;

export const Question = styled.p`
  text-align: center;
  white-space: normal;
  font-size: 16px;
  font-weight: 600;
  z-index: 10;
`;
