import styled from '@emotion/styled';
const ChatRoomExitPage = () => {
  return (
    <Container>
      <Header>
        <Title>채팅룸이 종료되었습니다!</Title>
        <SubTitle>대화는 즐거우셨나요? 요약 결과를 보여드릴게요.</SubTitle>
      </Header>
      <Box>
        <Wrapper>
          <MainText>공감한 키워드</MainText>
          <Divider />
          <TagWrapper>
            <Title>#LOL</Title>
            <Title>#애니</Title>
          </TagWrapper>
        </Wrapper>
        <Wrapper>
          <MainText>총 대화 시간</MainText>
          <Divider />
          <Title>30분 12초</Title>
        </Wrapper>
        <Wrapper>
          <MainText>가장 많은 키워드를 작성한 사람</MainText>
          <Divider />
          <Title>1위: 하나(3개)</Title>
        </Wrapper>
        <Wrapper>
          <MainText>취미가 가장 많이 겹친 사람</MainText>
          <Divider />
          <Title>1위: 하나(2개)</Title>
        </Wrapper>
      </Box>
      <SaveWrapper>
        <CheckInput type='checkbox' />
        <SaveText>저장</SaveText>
      </SaveWrapper>
      <FeedbackBox>
        <FeedbackText>서비스 피드백을 부탁드려도 될까요?</FeedbackText>
        <FormLink>https://docs.google.com/forms/435432</FormLink>
      </FeedbackBox>
    </Container>
  );
};
export default ChatRoomExitPage;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin: 25px 0;
`;
const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;
const SubTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #7c7c7c;
  text-align: center;
`;
const FeedbackText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #7c7c7c;
  text-align: center;
`;
const FormLink = styled.p`
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
  align-self: center;
  padding: 25px 0;
`;
const Wrapper = styled.div`
  display: flex;
  width: 299px;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
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
  padding-right: 29px;
`;
const CheckInput = styled.input`
  width: 18px;
  height: 18px;
  appearance: none; /* 기본 체크박스 스타일 제거 */
  background: #d9d9d9;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:checked {
  }
  &:checked::after {
    content: '✔'; /* 체크 표시 */
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
  margin-top: 10px;
`;
