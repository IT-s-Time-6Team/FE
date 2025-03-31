import styled from '@emotion/styled';
const ChatRoomExitPage = () => {
  return (
    <>
      <Title>채팅룸이 종료되었습니다!</Title>
      <SubTitle>대화는 즐거우셨나요? 요약 결과를 보여드릴게요.</SubTitle>
    </>
  );
};
export default ChatRoomExitPage;
const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
`;
const SubTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
`;
