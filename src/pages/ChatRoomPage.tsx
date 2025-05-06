import {
  ChatRoomContainer,
  ChatRoomHeader,
  Logo,
  CloseButton,
  KeyWordContainer,
  KeyWord,
  PeopleCount,
  KeyWordDivider,
  KeyWordDetail,
  ChatContainer,
  UserEntry,
  ChatInputContainer,
  ChatInput,
  SendButton,
} from '../styles/chatRoom/chatRoom';
import SendIcon from '../assets/send.svg?react'; // default import
import { useEffect, useState } from 'react';
import Characters from '../components/chatRoom/Characters';
import people from '../assets/chatRoom/people.svg';
interface User {
  id: number;
  name: string;
}
const ChatRoomPage = () => {
  const [isInput, setIsInput] = useState(false);
  const [input, setInput] = useState<string>('');
  const usersExp: User[] = [
    { id: 1, name: 'rabbit' },
    { id: 2, name: 'chick' },
    { id: 3, name: 'pan' },
  ];
  const [users] = useState<User[]>(usersExp);
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
          <KeyWord>
            사람들이 공감한 키워드
            <PeopleCount>
              <img src={people} alt={people} />
              {users.length}
            </PeopleCount>
          </KeyWord>
          <KeyWordDivider />
          <KeyWordDetail>같은 키워드를 2명 이상 작성하면 공개됩니다.</KeyWordDetail>
        </KeyWordContainer>
        <ChatContainer>
          <UserEntry>하나님이 입력 중입니다...</UserEntry>
          <Characters users={users} />
        </ChatContainer>
        <KeyWordContainer>
          <KeyWord>내가 입력한 공감 키워드</KeyWord>
          <KeyWordDivider />
          <KeyWordDetail>아직 키워드를 입력하지 않았습니다.</KeyWordDetail>
        </KeyWordContainer>
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
