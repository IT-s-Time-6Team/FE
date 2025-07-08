import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/shared/Button';
import { Container, SkeletonBox } from '@components/shared/UIStyles';
import { SubTitle } from '@components/shared/TextStyles';
import SummaryModal from '@components/roomExit/SummaryModal';
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
  TagWrapper,
  SaveWrapper,
  SaveText,
  FeedbackBox,
  Download,
} from '../../styles/roomExit/exitPageStyles';

export interface RoomResult {
  sharedKeywords: string[];
  totalDuration: string;
  topKeywordContributorNames: string[];
  topKeywordCount: number;
  mostMatchedHobbyUserNames: string[];
  matchedHobbyCount: number;
  requestMemberName: string;
  requestMemberCharacterId: number;
}

// 채팅룸 종료 요약 페이지
const ChatRoomSummaryPage = ({ roomResult }: { roomResult: RoomResult }) => {
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
        {roomResult ? (
          <Box>
            <Wrapper>
              <MainText>공감한 키워드</MainText>
              <Divider />
              <TagWrapper>
                {roomResult.sharedKeywords.map((keyword, id) => (
                  <ResultText key={id}>#{keyword}</ResultText>
                ))}
              </TagWrapper>
            </Wrapper>
            <Wrapper>
              <MainText>총 대화 시간</MainText>
              <Divider />
              <ResultText>{roomResult.totalDuration}</ResultText>
            </Wrapper>
            <Wrapper>
              <MainText>가장 많은 키워드를 작성한 사람</MainText>
              <Divider />
              <ResultText>
                1위:{' '}
                {roomResult.topKeywordContributorNames.length > 1
                  ? roomResult.topKeywordContributorNames.join(', ')
                  : roomResult.topKeywordContributorNames[0]}{' '}
                ({roomResult.topKeywordCount}개)
              </ResultText>
            </Wrapper>
            <Wrapper>
              <MainText>취미가 가장 많이 겹친 사람</MainText>
              <Divider />
              <ResultText>
                1위:{' '}
                {roomResult.mostMatchedHobbyUserNames.length > 1
                  ? roomResult.mostMatchedHobbyUserNames.join(', ')
                  : roomResult.mostMatchedHobbyUserNames[0]}{' '}
                ({roomResult.matchedHobbyCount}개)
              </ResultText>
            </Wrapper>
          </Box>
        ) : (
          <SkeletonBox />
        )}

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
          <SummaryModal onClose={handleCloseModal} data={roomResult} />
        </ModalPortal>
      )}
    </Container>
  );
};
export default ChatRoomSummaryPage;
