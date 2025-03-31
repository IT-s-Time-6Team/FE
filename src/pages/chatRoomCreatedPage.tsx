import styled from '@emotion/styled';

const ChatRoomCreatedPage = () => {
  return (
    <ChatRoomCreatedContainer>
      <ChatRoomCreatedHeader>
        <Title>채팅룸이 생성되었어요!</Title>
        <SubTitle>qr 코드를 공유해 재미있는 이야기를 나눠 보세요.</SubTitle>
      </ChatRoomCreatedHeader>
    </ChatRoomCreatedContainer>
  );
};

export default ChatRoomCreatedPage;
const ChatRoomCreatedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 30px;
  gap: 20px;
`;
const ChatRoomCreatedHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 5px;
`;
const Title = styled.h2`
  color: #3e3333;
  text-align: center;

  font-size: 20px;
  font-weight: 600;
`;
const SubTitle = styled.p`
  color: #7c7c7c;

  font-size: 14px;
  font-weight: 500;
`;
