import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/shared/Button';
import { Container } from '@components/shared/UIStyles';
import { SubTitle } from '@components/shared/TextStyles';
import BalanceSummaryModal from '@components/roomExit/BalanceSummaryModal';
import { ModalPortal } from '@components/shared/ModalPortal';

import {
  ResultText,
  SummaryHeader,
  StatsContainer,
  FeedbackText,
  FormLinkText,
  MainText,
  Box,
  Wrapper,
  Divider,
  SaveWrapper,
  SaveText,
  FeedbackBox,
  Download,
} from '../../styles/roomExit/exitPageStyles';

export interface Question {
  round: number;
  questionA: string;
  questionB: string;
}

export interface FinalResult {
  memberName: string;
  finalScore: number;
  finalRank: number;
  winnerNicknames: string[];
  mostBalancedQuestions: Question[];
  mostUnanimousQuestions: Question[];
}

// 채팅룸 종료 요약 페이지
const BalanceSummaryPage = ({ roomResult }: { roomResult: FinalResult }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <SummaryHeader>
        <ResultText>채팅룸이 종료되었습니다!</ResultText>
        <SubTitle>대화는 즐거우셨나요? 요약 결과를 보여드릴게요.</SubTitle>
      </SummaryHeader>
      <StatsContainer>
        <Box>
          <Wrapper>
            <MainText>나의 점수</MainText>
            <Divider />
            <ResultText>{roomResult?.finalScore}점</ResultText>
          </Wrapper>
          <Wrapper>
            <MainText>점수가 가장 높은 사람</MainText>
            <Divider />
            <ResultText>{roomResult?.winnerNicknames.join(', ')}</ResultText>
          </Wrapper>
          <Wrapper>
            <MainText>가장 투표가 비슷했던 밸런스 질문</MainText>
            <Divider />
            <ResultText>
              {roomResult?.mostBalancedQuestions[0]?.questionA} vs{' '}
              {roomResult?.mostBalancedQuestions[0]?.questionB}
            </ResultText>
          </Wrapper>
          <Wrapper>
            <MainText>가장 만장일치에 가까웠던 밸런스 질문</MainText>
            <Divider />
            <ResultText>
              {roomResult?.mostUnanimousQuestions[0]?.questionA} vs{' '}
              {roomResult?.mostUnanimousQuestions[0]?.questionB}
            </ResultText>
          </Wrapper>
        </Box>

        <SaveWrapper onClick={handleOpenModal}>
          <Download />
          <SaveText>저장</SaveText>
        </SaveWrapper>
      </StatsContainer>
      <FeedbackBox>
        <FeedbackText>서비스 피드백을 부탁드려도 될까요?</FeedbackText>
        <FormLinkText
          as='a'
          href='https://forms.gle/pw8awcwaZ3vmvETA9'
          target='_blank'
          rel='noopener noreferrer'
        >
          https://forms.gle/pw8awcwaZ3vmvETA9
        </FormLinkText>
      </FeedbackBox>
      <Button text='메인으로 돌아가기' onClick={() => navigate('/rooms')} />
      {isOpen && roomResult && (
        <ModalPortal>
          <BalanceSummaryModal onClose={handleCloseModal} data={roomResult} />
        </ModalPortal>
      )}
    </Container>
  );
};
export default BalanceSummaryPage;
