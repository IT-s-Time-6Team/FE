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
  Characters,
  CharacterImg,
  ChatInputContainer,
  ChatInput,
  SendButton,
} from '../styles/chatRoom/chatRoom';
import SendIcon from '../assets/send.svg?react'; // default import
import { useEffect, useState } from 'react';
import rabbit from '../assets/chatRoom/character/rabbit.svg';
import bear from '../assets/chatRoom/character/bear.svg';
import cat from '../assets/chatRoom/character/cat.svg';
import chick from '../assets/chatRoom/character/chick.svg';
import pan from '../assets/chatRoom/character/pan.svg';
import pig from '../assets/chatRoom/character/pig.svg';
import snake from '../assets/chatRoom/character/snake.svg';
import people from '../assets/chatRoom/people.svg';
interface User {
  id: number;
  name: string;
}
const ChatRoomPage = () => {
  const [isInput, setIsInput] = useState(false);
  const [input, setInput] = useState<string>('');
  const CharacterImgs = [rabbit, chick, pan, cat, pig, snake, bear];
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
          <Characters>
            {users.map((user, index) => {
              const total = CharacterImgs.length;
              if (index === 6) {
                return (
                  <CharacterImg
                    key={index}
                    src={CharacterImgs[index]}
                    alt={`${user.name}`}
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                );
              }
              const angle = (index / (total - 1)) * 2 * Math.PI - Math.PI + 1.2;
              const radius = 40;
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              return (
                <CharacterImg
                  key={index}
                  src={CharacterImgs[index]}
                  alt={`${user.name}`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              );
            })}
          </Characters>
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
