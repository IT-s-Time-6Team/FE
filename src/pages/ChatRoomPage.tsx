import styled from '@emotion/styled';

const ChatRoomPage = () => {
  return (
    <>
      <ChatRoomContainer>
        <ChatRoomHeader>
          <Logo>로고</Logo>
          <CloseButton>종료</CloseButton>
        </ChatRoomHeader>
        <KeyWordContainer>
          <KeyWord>키워드</KeyWord>
          <KeyWordDetail>같은 키워드를 2명 이상 작성하면 공개됩니다.</KeyWordDetail>
          <KeyWordDivider />
          <KeyWord>내 키워드</KeyWord>
          <KeyWordDetail>#롤 #애니</KeyWordDetail>
        </KeyWordContainer>
      </ChatRoomContainer>
    </>
  );
};
export default ChatRoomPage;
const KeyWordDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #f0f0f0;
  margin: 11px 0;
`;
const KeyWordDetail = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #7c7c7c;
  margin-top: 8px;
`;
const KeyWordContainer = styled.div`
  border: 1px solid #e4e4e4;
  width: 342px;
  height: content-fit;
  border-radius: 12px;
  padding: 21px 22px;
`;
const KeyWord = styled.div`
  display: flex;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: #3e3333;
`;
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
  align-items: center;
  width: 100dvw;
  height: 100vh;
  padding: 24px;
  background-color: rgb(255, 255, 255);
  gap: 11px;
`;
const ChatRoomHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  width: 100%;
  font-size: 16px;
`;
