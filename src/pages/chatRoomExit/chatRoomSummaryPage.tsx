import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/chatRoomExit/Button';
import { Container, Header } from '@components/shared/UIStyles';
import { Title, SubTitle } from '@components/shared/TextStyles';
import SummaryModal from '@components/chatRoomExit/SummaryModal';
import { ModalPortal } from '@components/shared/ModalPortal';
/* import { getRoomResult } from '@api/chatRoomResult'; */
import DownloadIcon from '@assets/DownloadIcon.svg?react';
/* interface RoomResult {
  sharedKeywords: string[];
  totalDuration: string;
  topKeywordContributorNames: string[];
  topKeywordCount: number;
  mostMatchedHobbyUserNames: string[];
  matchedHobbyCount: number;
  requestMemberName: string;
  requestMemberCharacterId: number;
} */

// 채팅룸 종료 요약 페이지
const ChatRoomSummaryPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  /*  const [roomResult, setRoomResult] = useState<RoomResult | null>(null); */
  const roomResult = {
    sharedKeywords: ['LOL', '애니'],
    totalDuration: '30분 12초',
    topKeywordContributorNames: ['하나'],
    topKeywordCount: 3,
    mostMatchedHobbyUserNames: ['하나'],
    matchedHobbyCount: 2,
    requestMemberName: 'member1',
    requestMemberCharacterId: 1,
  };
  const navigate = useNavigate();
  /*  const roomKey = '123'; */
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  /* const handleRoomResult = async () => {
    if (!roomKey) return;
    try {
      const res = await getRoomResult(roomKey);
      console.log('요약 결과 조회:', res);
      setRoomResult(res.data);
    } catch (err: unknown) {
      console.error('요약 결과 조회 실패:', err);
    }s
  }; */
  return (
    <Container>
      <SummaryHeader>
        <Title>채팅룸이 종료되었습니다!</Title>
        <SubTitle>대화는 즐거우셨나요? 요약 결과를 보여드릴게요.</SubTitle>
      </SummaryHeader>
      <StatsContainer>
        <Box>
          <Wrapper>
            <MainText>공감한 키워드</MainText>
            <Divider />
            <TagWrapper>
              {roomResult.sharedKeywords.map((keyword, id) => (
                <Title key={id}>{keyword}</Title>
              ))}
            </TagWrapper>
          </Wrapper>
          <Wrapper>
            <MainText>총 대화 시간</MainText>
            <Divider />
            <Title>{roomResult.totalDuration}</Title>
          </Wrapper>
          <Wrapper>
            <MainText>가장 많은 키워드를 작성한 사람</MainText>
            <Divider />
            <Title>
              1위: {roomResult.topKeywordContributorNames}({roomResult.topKeywordCount}개)
            </Title>
          </Wrapper>
          <Wrapper>
            <MainText>취미가 가장 많이 겹친 사람</MainText>
            <Divider />
            <Title>
              1위: {roomResult.mostMatchedHobbyUserNames}({roomResult.matchedHobbyCount}개)
            </Title>
          </Wrapper>
        </Box>
        <SaveWrapper onClick={handleOpenModal}>
          <Download />
          <SaveText>저장</SaveText>
        </SaveWrapper>
      </StatsContainer>
      <FeedbackBox>
        <FeedbackText>서비스 피드백을 부탁드려도 될까요?</FeedbackText>
        <FormLinkText>https://docs.google.com/forms/435432</FormLinkText>
      </FeedbackBox>
      <Button text='메인으로 돌아가기' onClick={() => navigate('/rooms')} />
      {isOpen && (
        <ModalPortal>
          <SummaryModal onClose={handleCloseModal} />
        </ModalPortal>
      )}
    </Container>
  );
};
export default ChatRoomSummaryPage;
const SummaryHeader = styled(Header)`
  margin-top: 97px;
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
const FormLinkText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #7c7c7c;
  text-align: center;
`;
const MainText = styled.p`
  font-size: 16px;
  font-weight: 500;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 342px;
  height: 376px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  padding: 27px 0;
  margin-top: 25px;
`;
const Wrapper = styled.div`
  display: flex;
  width: 299px;
  height: 61px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;
const Divider = styled.div`
  width: 299px;
  height: 1px;
  background-color: #f0f0f0;
`;
const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const SaveWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: flex-end;
  cursor: pointer;
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
  margin: 20px 0;
`;
const Download = styled(DownloadIcon)`
  width: 20px;
  height: 20px;
`;
