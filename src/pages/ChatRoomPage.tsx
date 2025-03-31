import styled from '@emotion/styled';
import SendIcon from '../assets/send.svg?react'; // default import
import { useEffect, useState } from 'react';

const ChatRoomPage = () => {
  const [isInput, setIsInput] = useState(false);
  const [input, setInput] = useState<string>('');
  useEffect(() => {
    if (input.length > 0) {
      setIsInput(true);
    } else {
      setIsInput(false);
    }
  }, [input]);
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
        <ChatContainer>
          <UserEntry>하나님이 입장하셨습니다.</UserEntry>
        </ChatContainer>
      </ChatRoomContainer>
      <ChatInputContainer>
        <ChatInput value={input} onChange={(e) => setInput(e.target.value)} />
        <SendButton isInput={isInput}>
          <SendIcon />
        </SendButton>
      </ChatInputContainer>
    </>
  );
};
export default ChatRoomPage;
const ChatInput = styled.textarea`
  width: 80%;
  border: none;
  font-size: 14px;
`;
const SendButton = styled.button<{ isInput: boolean }>`
  background-color: transparent;
  color: ${(props) => (props.isInput ? '#ff7913' : '#dadada')};
  height: 35px;
  svg {
    width: 35px;
    height: 35px;
    transition: color 0.1s ease;
  }
  &:hover {
    color: #ff7913;
  }
`;
const ChatInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  border: none;
  border-top: 1px solid #e4e4e4;
  width: 100%;
  height: 125px;
  padding: 19px 24px;
  display: flex;
  justify-content: space-between;
`;
const UserEntry = styled.div`
  width: 100%;
  background-color: #f0f0f066;
  padding: 10px 22px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  color: #7c7c7c;
`;
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
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
  height: calc(100dvh - 124px);
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
