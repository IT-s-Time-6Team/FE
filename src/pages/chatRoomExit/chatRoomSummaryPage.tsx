import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/shared/Button';
import { Container, Header, SkeletonBox } from '@components/shared/UIStyles';
import { Title, SubTitle } from '@components/shared/TextStyles';
import SummaryModal from '@components/chatRoomExit/SummaryModal';
import { ModalPortal } from '@components/shared/ModalPortal';

import DownloadIcon from '@assets/DownloadIcon.svg?react';
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
const ResultText = styled(Title)`
  font-size: 19px;
`;
const SummaryHeader = styled(Header)`
  margin-top: 30px;
`;
const StatsContainer = styled.div`
  width: 342px;
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const FeedbackText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #7c7c7c;
  text-align: center;
`;
const FormLinkText = styled.a`
  font-size: 14px;
  font-weight: 400;
  color: #7c7c7c;
  text-align: center;
`;
const MainText = styled.p`
  font-size: 15px;
  font-weight: 500;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 342px;
  min-height: 376px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  padding: 33px 0;
  margin-top: 25px;
`;
const Wrapper = styled.div`
  display: flex;
  width: 299px;
  min-height: 55px;
  flex-direction: column;
  align-items: flex-start;
`;
const Divider = styled.div`
  width: 299px;
  height: 1px;
  background-color: #f0f0f0;
  margin: 6px 0;
`;
const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;
const SaveWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: flex-end;
  cursor: pointer;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const SaveText = styled.p`
  color: #7c7c7c;
  font-size: 12px;
  font-weight: 500;
  margin: 10px 0;
`;
const FeedbackBox = styled.div`
  width: 299px;
  height: 78px;
  border-radius: 12px;
  background: rgba(240, 240, 240, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  padding: 20px 0;
  box-sizing: border-box;
  margin-top: 20px;
  margin-bottom: 40px;
`;
const Download = styled(DownloadIcon)`
  width: 20px;
  height: 20px;
`;
