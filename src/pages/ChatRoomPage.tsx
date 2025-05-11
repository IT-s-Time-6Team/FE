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
import axios from 'axios';
import { getRoom } from '@api/chatRoomCreated';

interface User {
  id: number;
  name: string;
}
// interface RoomInfo {
//   roomKey: string;
//   requiredAgreements: number;
//   maxMember: number;
//   durationMinutes?: number;
//   gameMode: string;
//   createdAt: string;
//   closedAt: string | null;
//   isClosed: boolean;
// }

const ChatRoomPage = () => {
  const [isInput, setIsInput] = useState(false);
  const [input, setInput] = useState<string>('');
  // const [roomData, setRoomData] = useState<RoomInfo>();
  const usersExp: User[] = [
    { id: 1, name: 'rabbit' },
    { id: 2, name: 'chick' },
    { id: 3, name: 'pan' },
    { id: 4, name: 'rabbit' },
    { id: 5, name: 'chick' },
    { id: 6, name: 'pan' },
    { id: 7, name: 'rabbit' },
  ];
  const [users] = useState<User[]>(usersExp);
  const roomsKey = '0671py';

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        // 로그인 요청
        await axios.post(
          '/api/rooms/0671py/member',
          {
            nickname: 'test2',
            password: '123ddd@',
          },
          {
            withCredentials: true,
          },
        );
        // 로그인 성공 후 방 정보 가져오기
        const roomResponse = await getRoom(roomsKey);
        console.log('방 정보:', roomResponse.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          if (status === 403) {
            console.error(err);
            alert('중복된 닉네임입니다. 다른 닉네임을 입력해주세요!');
          } else {
            console.error(err);
            alert('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
          }
        } else {
          console.error(err);
          alert('알 수 없는 오류가 발생했습니다.');
        }
      }
    };

    fetchRoomData();
  }, []);

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
