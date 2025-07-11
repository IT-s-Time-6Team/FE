import { ChatRoomContainer, ChatRoomHeader, CloseButton } from '../../styles/chatRoom/chatRoom';
import styled from '@emotion/styled';
import InviteModal from '@components/chatRoom/InviteModal';
import useRoomUsersStore from '@store/useRoomUsersStore';
import { useEffect, useState } from 'react';
import { Header } from '@components/shared/UIStyles';
import { ResultText } from '../../styles/roomExit/exitPageStyles';
import { SubTitle } from '@components/shared/TextStyles';
import { ModalPortal } from '@components/shared/ModalPortal';
import Button from '@components/shared/Button';
import InfoIcon from '@assets/chatRoom/info.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { MemberScore } from '@api/voteResult';
import upIcon from '@assets/balance/scoreUp.png';
import downIcon from '@assets/balance/scoreDown.png';
import axios from 'axios';
const BalanceRankingPage = () => {
  const [isInviteOpen, setIsInviteOpen] = useState<boolean>(false);
  const [totalRound, setTotalRound] = useState<number>(0);
  const user = useRoomUsersStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result;
  const roomKey = location.state?.roomKey;
  useEffect(() => {
    const fetchData = async () => {
      const total = await fetchCurrentStep();
      if (typeof total === 'number') {
        setTotalRound(total);
      }
    };
    fetchData();
  }, [result, roomKey]);
  const fetchCurrentStep = async () => {
    if (!roomKey) return;
    try {
      // 게임 모드에 따른 API 엔드포인트 설정
      const res = await axios.get(`/api/balance/rooms/${roomKey}/status`, {
        withCredentials: true,
      });
      if (res.data) {
        console.log('진행 상태:', res.data.data);
        return res.data.data.totalRounds;
      }
    } catch (error) {
      console.error('Error fetching process rate:', error);
      navigate('/rooms/exit');
    }
  };
  const handleNext = async () => {
    if (totalRound === result?.currentRound) {
      navigate(`/balance/exit`, {
        state: { roomKey },
      });
    } else {
      navigate(`/balance/${roomKey}/vote`, {
        state: { roomKey },
      });
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
          <ResultText>점수공개</ResultText>
          <SubTitle>{`${totalRound}라운드 중 ${result?.currentRound}라운드 진행`}</SubTitle>
        </Header>

        <Table>
          <thead>
            <tr>
              <Th>순위</Th>
              <Th>이름</Th>
              <ScoreTh>점수</ScoreTh>
            </tr>
          </thead>
          <tbody>
            {result?.allMemberScores.map((score: MemberScore, idx: number) => {
              const { memberName, currentScore, scoreChange, rank } = score;
              const icon = scoreChange > 0 ? upIcon : scoreChange < 0 ? downIcon : null;

              return (
                <tr key={idx}>
                  <RankTd>{rank}등</RankTd>
                  <Td>{memberName}</Td>
                  <ScoreTd>
                    {currentScore}점
                    {icon ? (
                      <div>
                        <img src={icon} alt='change' />
                        <ScoreChange>{scoreChange}</ScoreChange>
                      </div>
                    ) : (
                      <ScoreChange>-</ScoreChange>
                    )}
                  </ScoreTd>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Button onClick={handleNext} text='다음으로' />
      </ChatRoomContainer>
      {isInviteOpen && (
        <ModalPortal>
          <InviteModal onClose={() => setIsInviteOpen(false)} roomId={roomKey} />
        </ModalPortal>
      )}
    </>
  );
};
export default BalanceRankingPage;
const InfoButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
const Table = styled.table`
  width: 90%;
  border-collapse: collapse;
  margin-top: 50px;
  margin-bottom: 100px;
`;

const Th = styled.th`
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #e4e4e4;
  font-size: 12px;
  color: #7c7c7c;
  font-weight: 500;
`;
const ScoreTh = styled(Th)`
  //padding-left: 20px;
`;

const Td = styled.td`
  padding: 18px 8px;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
  font-size: 14px;
  font-weight: 600;
`;
const RankTd = styled(Td)`
  color: #7c7c7c;
`;
const ScoreTd = styled(Td)`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ScoreChange = styled.span`
  margin-left: 2px;
  color: #7c7c7c;
  font-weight: bold;
  font-size: 14px;
`;
