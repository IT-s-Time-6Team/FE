import styled from '@emotion/styled';
import { Container, Header } from '@components/shared/UIStyles';
import { SubTitle, Title } from '@components/shared/TextStyles';
import CheverRightIcon from '@assets/Main/chevronright_icon.svg?react';
import Button from '@components/shared/Button';
import SummaryModal from '@components/voteResult/SummaryModal';
import { useEffect, useState } from 'react';
import { ModalPortal } from '@components/shared/ModalPortal';
import SuccessStamp from '@assets/voteResult/success_stamp.png';
import FailStamp from '@assets/voteResult/fail_stamp.png';
import { keyframes } from '@emotion/react';

import { getTmiVoteResult } from '@api/voteResult';
import { useParams } from 'react-router-dom';
import useRoomUsersStore from '@store/useRoomUsersStore';
import { CharacterMap, CharacterKey } from '@components/shared/CharacterMap';

interface VoteCount {
  nickname: string;
  count: number;
}

const VoteResult = () => {
  const { roomKey } = useParams<{ roomKey: string }>();

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [tmiMessage, setTmiMessage] = useState('');
  const [myVote, setMyVote] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [voteCounts, setVoteCounts] = useState<VoteCount[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!roomKey) return;

    (async () => {
      try {
        const data = await getTmiVoteResult(roomKey);
        console.log(data);
        setIsCorrect(false);
        setTmiMessage(data.tmiContent);
        setMyVote(data.myVote);
        setCorrectAnswer(data.correctAnswer);

        const counts = Object.entries(data.votingResults)
          .map(([nickname, count]) => ({ nickname, count }))
          .sort((a, b) => b.count - a.count);
        setVoteCounts(counts);
      } catch (err) {
        console.error('투표 결과 조회 실패:', err);
      }
    })();
  }, [roomKey]);

  const users = useRoomUsersStore((state) => state.users);
  const votedUser = users.find((user) => user.nickname === myVote);
  const rawChar = votedUser?.character ?? 'rabbit';
  const key = rawChar as CharacterKey;
  const characterImg = CharacterMap[key];
  return (
    <Container>
      <VoteResultHeader>
        <ResultText> {isCorrect ? 'TMI 맞추기 성공!' : 'TMI 맞추기 실패!'}</ResultText>
        <SubTitle>
          {isCorrect
            ? `${correctAnswer} 님은 TMI의 주인이 맞습니다.`
            : `${correctAnswer} 님이 TMI의 주인이었습니다.`}
        </SubTitle>
      </VoteResultHeader>
      <VoteCandidateContainer>
        <CandidateCharacter src={characterImg} />
        <StampWrapper>
          {isCorrect ? (
            <StampImage src={SuccessStamp} alt='성공 스탬프' />
          ) : (
            <StampImage src={FailStamp} alt='실패 스탬프' />
          )}
        </StampWrapper>
        <CandidateTMI>{tmiMessage}</CandidateTMI>
      </VoteCandidateContainer>
      <AnswerButton>
        {!isCorrect && (
          <AnswerWrapper onClick={handleOpenModal}>
            <SubTitle>정답보기</SubTitle>
            <CheverRight />
          </AnswerWrapper>
        )}
      </AnswerButton>
      <ResultContainer>
        <ResultHeader>투표 결과</ResultHeader>
        <MyVoteContainer>
          <VoteText>나의 투표</VoteText>
          <VoteSubContainer>
            <SubTitle>{myVote}</SubTitle>
          </VoteSubContainer>
        </MyVoteContainer>
        <Result>
          <VoteText>투표 결과</VoteText>
          <VoteSubContainer>
            {voteCounts.map(({ nickname, count }) => (
              <VotenameContainer key={nickname}>
                <SubTitle>{nickname}</SubTitle>
                <SubTitle>{count}표</SubTitle>
              </VotenameContainer>
            ))}
          </VoteSubContainer>
        </Result>
      </ResultContainer>
      <Button onClick={() => {}} text='다음으로' />
      {isOpen && (
        <ModalPortal>
          <SummaryModal
            correctAnswer={correctAnswer}
            tmiContent={tmiMessage}
            character={votedUser?.character ?? 'rabbit'}
            onClose={handleCloseModal}
          />
        </ModalPortal>
      )}
    </Container>
  );
};

export default VoteResult;

const VoteResultHeader = styled(Header)`
  margin-top: 47px;
`;
const ResultText = styled(Title)`
  color: #3e3333;
`;
const VoteCandidateContainer = styled(Header)`
  width: 301px;
  margin-top: 22px;
  gap: 22px;
  border-radius: 12px;
`;
const CandidateCharacter = styled.img`
  width: 100px;
  height: 134px;
`;

const pulse = keyframes`
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.5;
    transform-origin: 50% 50%;
    transform: rotate(-2deg) scale(5);
  }
  100% {
    opacity: 1;
    transform: rotate(-15deg) scale(1);
  }
`;

const StampWrapper = styled.div`
  position: fixed;
  top: 26%;
  left: 62%;
  opacity: 0;
  animation: ${pulse} 0.5s 1.5s forwards;
`;
const StampImage = styled.img`
  width: 98px;
  height: 98px;
`;

const CandidateTMI = styled(SubTitle)`
  width: 100%;
  padding: 19px 24px;
  border-radius: 12px;

  text-align: center;
  color: #3e3333;
  line-height: 150%;
  background: rgba(240, 240, 240, 0.4);
`;

const AnswerButton = styled.div`
  width: 301px;
  min-height: 17px;
  margin-top: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
const AnswerWrapper = styled.div`
  width: fit-content;
  padding-right: 2px;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
`;

const CheverRight = styled(CheverRightIcon)`
  width: 12px;
  height: 12px;
`;
const ResultContainer = styled(Header)`
  margin: 26px 0 100px 0;
  width: 301px;
  gap: 0px;
`;
const ResultHeader = styled(Header)`
  margin-bottom: 18px;
  font-size: 14px;
  font-weight: 600;
`;
const MyVoteContainer = styled(Header)`
  width: 100%;
  padding: 18px 0 21px 0;
  flex-direction: row;

  align-items: flex-start;
  gap: 37px;

  border-top: 1px solid #e4e4e4;
`;
const Result = styled(MyVoteContainer)`
  padding-top: 21px;
  border-top: 1px solid #f0f0f0;
`;
const VoteText = styled(SubTitle)`
  font-weight: 600;
`;
const VoteSubContainer = styled(Header)`
  gap: 14px;
`;
const VotenameContainer = styled(Header)`
  flex-direction: row;
  gap: 13px;
`;
