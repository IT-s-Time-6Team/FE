import styled from '@emotion/styled';

const ChatRoomPage = () => {
  return (
    <>
      <ChatRoomContainer>
        <ChatRoomHeader>
          <Logo>로고</Logo>
          <CloseButton>종료</CloseButton>
        </ChatRoomHeader>
      </ChatRoomContainer>
    </>
  );
};
export default ChatRoomPage;
const Logo = styled.div`
  font-weight: bold;
  color: #333;
  font-size: 16px;
`;
const CloseButton = styled.button`
  background-color: #bcbcbc26;
  color: #3e3333;
  width: 52px;
  height: 32px;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 16px;
`;
const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100dvw;
  height: 100vh;
  padding: 24px;
  background-color: rgb(255, 255, 255);
`;
const ChatRoomHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 20px;
  font-size: 16px;
`;
