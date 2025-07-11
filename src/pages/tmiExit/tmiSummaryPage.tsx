import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/shared/Button';
import { Container } from '@components/shared/UIStyles';
import { SubTitle } from '@components/shared/TextStyles';
import TmiSummaryModal from '@components/roomExit/TmiSummaryModal';
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
interface TopVoter {
  memberName: string;
  correctCount: number;
}

interface MostIncorrectTmi {
  tmiContent: string;
  incorrectVoteCount: number;
}
export interface RoomResult {
  correctCount: number;
  incorrectCount: number;
  topVoters: TopVoter[];
  mostIncorrectTmis: MostIncorrectTmi[];
}

// 채팅룸 종료 요약 페이지
const TmiSummaryPage = ({ roomResult }: { roomResult: RoomResult }) => {
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
            <MainText>맞춘 TMI</MainText>
            <Divider />
            <ResultText>{roomResult?.correctCount}개</ResultText>
          </Wrapper>
          <Wrapper>
            <MainText>틀린 TMI</MainText>
            <Divider />
            <ResultText>{roomResult?.incorrectCount}개</ResultText>
          </Wrapper>
          <Wrapper>
            <MainText>가장 TMI를 잘 맞춘 사람</MainText>
            <Divider />
            <ResultText>
              1위:{' '}
              {roomResult?.topVoters?.length > 0 &&
                (roomResult?.topVoters.length > 1
                  ? `${roomResult?.topVoters.map((voter) => `${voter.memberName}(${voter.correctCount}개)`).join(', ')}`
                  : `${roomResult?.topVoters[0].memberName}(${roomResult.topVoters[0].correctCount}개)`)}
            </ResultText>
          </Wrapper>
          <Wrapper>
            <MainText>가장 많은 사람이 틀린 TMI</MainText>
            <Divider />
            <ResultText>
              {roomResult?.mostIncorrectTmis?.length > 0 &&
                roomResult?.mostIncorrectTmis[0].tmiContent}
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
          <TmiSummaryModal onClose={handleCloseModal} data={roomResult} />
        </ModalPortal>
      )}
    </Container>
  );
};
export default TmiSummaryPage;
