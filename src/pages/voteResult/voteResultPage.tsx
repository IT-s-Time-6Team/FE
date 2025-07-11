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
import { useNavigate, useParams } from 'react-router-dom';
import { CharacterMap, CharacterKey } from '@components/shared/CharacterMap';
import { getVoteStatus } from '@api/voteStatus';

interface VoteCount {
  nickname: string;
  count: number;
}

type VoteResultState = {
  isCorrect: boolean | null;
  tmiMessage: string;
  myVote: string;
  myCharacterType: string;
  correctAnswer: string;
  answerMemberCharacterType?: string;
  voteCounts: VoteCount[];
  round: number;
};

const VoteResult = () => {
  const { roomKey } = useParams<{ roomKey: string }>();

  const [state, setState] = useState<VoteResultState>({
    isCorrect: null,
    tmiMessage: '',
    myVote: '',
    myCharacterType: '',
    answerMemberCharacterType: '',
    correctAnswer: '',
    voteCounts: [],
    round: 0,
  });
  const navigate = useNavigate();

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
        const counts = Object.entries(data.votingResults)
          .map(([nickname, count]) => ({ nickname, count }))
          .sort((a, b) => b.count - a.count);
        setState({
          isCorrect: data.isCorrect,
          tmiMessage: data.tmiContent,
          myVote: data.myVote,
          myCharacterType: data.myCharacterType,
          correctAnswer: data.correctAnswer,
          answerMemberCharacterType: data.answerMemberCharacterType,
          voteCounts: counts,
          round: data.round,
        });
      } catch (err) {
        console.error('투표 결과 조회 실패:', err);
      }
    })();
  }, [roomKey]);

  const rawChar = state.myCharacterType ?? 'rabbit';
  const key = rawChar.toUpperCase() as CharacterKey;
  const characterImg = CharacterMap[key];

  const handleNext = async () => {
    const res = await getVoteStatus(roomKey as string);
    console.log(res);
    if (res.data.currentStep === 'COMPLETED') {
      navigate(`tmi/${roomKey}/result`);
    } else {
      navigate(`/tmi/${roomKey}/vote`);
    }
  };

  return (
    <Container>
      <VoteResultHeader>
        <ResultText> {state.isCorrect ? 'TMI 맞추기 성공!' : 'TMI 맞추기 실패!'}</ResultText>
        <SubTitle>
          {state.isCorrect
            ? `${state.myVote} 님은 TMI의 주인이 맞습니다.`
            : `${state.myVote} 님은 TMI의 주인이 아닙니다.`}
        </SubTitle>
      </VoteResultHeader>
      <VoteCandidateContainer>
        <CandidateCharacter src={characterImg} />
        <StampWrapper>
          {state.isCorrect ? (
            <StampImage src={SuccessStamp} alt='성공 스탬프' />
          ) : (
            <StampImage src={FailStamp} alt='실패 스탬프' />
          )}
        </StampWrapper>
        <CandidateTMI>{state.tmiMessage}</CandidateTMI>
      </VoteCandidateContainer>
      <AnswerButton>
        {!state.isCorrect && (
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
            <SubTitle>{state.myVote}</SubTitle>
          </VoteSubContainer>
        </MyVoteContainer>
        <Result>
          <VoteText>투표 결과</VoteText>
          <ResultSubContainer>
            {state.voteCounts.map(({ nickname, count }) => (
              <VotenameContainer key={nickname}>
                <SubTitle>{nickname}</SubTitle>
                <SubTitle>{count}표</SubTitle>
              </VotenameContainer>
            ))}
          </ResultSubContainer>
        </Result>
      </ResultContainer>
      <Button onClick={handleNext} text='다음으로' />
      {isOpen && (
        <ModalPortal>
          <SummaryModal
            correctAnswer={state.correctAnswer}
            tmiContent={state.tmiMessage}
            character={state.answerMemberCharacterType ?? 'bear'}
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
  height: 80px;
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
  align-items: flex-start;
`;

const ResultSubContainer = styled(VoteSubContainer)`
  height: 50px;
  flex-wrap: wrap;
  overflow-y: auto;
`;
const VotenameContainer = styled(Header)`
  flex-direction: row;
  gap: 13px;
`;
