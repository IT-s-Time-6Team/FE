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
import { getRoom } from '@api/chatRoomCreated';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

interface User {
  id: number;
  name: string;
}
interface RoomInfo {
  roomKey: string;
  requiredAgreements: number;
  maxMember: number;
  durationMinutes?: number;
  gameMode: string;
  createdAt: string;
  closedAt: string | null;
  isClosed: boolean;
}
interface dataInfo {
  type: string;
  nickname: string;
  content: string;
  timestamp: string;
  data: {
    referenceName: string;
    count: number;
    variations: string[];
  }[];
}
const ChatRoomPage = () => {
  const [isInput, setIsInput] = useState(false);
  const [input, setInput] = useState<string>('');
  const [roomData, setRoomData] = useState<RoomInfo>();
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
  const { roomKey } = useParams();

  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [, setMessages] = useState<{ type: string; content: string }[]>([]);
  const [keyword, setKeyword] = useState('');
  const [, setConnected] = useState(false);
  const [mykeyword, setMyKeyword] = useState<string>('');
  const [peoplenum, setPeoplenum] = useState<number>(0);

  useEffect(() => {
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [stompClient]);

  const connect = () => {
    const socket = new SockJS('/api/connect');
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log('[STOMP DEBUG]', str);
      },
      onConnect: () => {
        console.log('웹소켓 연결 성공!');
        setConnected(true);
        // 채팅방 메시지 구독
        client.subscribe(`/topic/room/${roomKey}/messages`, (message) => {
          try {
            const data = JSON.parse(message.body);
            if (data.type === 'ENTER') {
              setMessages((prev) => [
                ...prev,
                { type: 'SYSTEM', content: `${data.nickname}님이 입장하셨습니다.` },
              ]);
              setPeoplenum((prev) => prev + 1);
              setInput('');
            } else if (data.type === 'REENTER') {
              setMessages((prev) => [
                ...prev,
                { type: 'SYSTEM', content: `${data.nickname}님이 재입장하셨습니다.` },
              ]);
            } else if (data.type === `ERROR`) {
              setMessages((prev) => [
                ...prev,
                { type: 'SYSTEM', content: `${data.nickname}님이 형식이 잘못됐습니다.` },
              ]);
            } else if (data.type === 'ANALYSIS_RESULT') {
              const matchedKeywords =
                data.data?.filter(
                  (item: { count: number }) => item.count >= (roomData?.requiredAgreements ?? 2),
                ) ?? [];
              console.log('matchedKeywords:', matchedKeywords);
              const keywordNames = matchedKeywords.map(
                (item: { referenceName: dataInfo }) => item.referenceName,
              );

              if (keywordNames.length > 0) {
                const allKeywords = keywordNames.join(' ');

                setKeyword(allKeywords);
                setMessages((prev) => [
                  ...prev,
                  { type: 'SYSTEM', content: `${allKeywords}을(를) 입력했습니다.` },
                ]);
              } else {
                setMessages((prev) => [
                  ...prev,
                  { type: 'SYSTEM', content: `공감된 키워드가 없습니다.` },
                ]);
              }
            }
          } catch (e) {
            console.error('메시지 파싱 오류:', e);
          }
        });

        // 키워드 전송 결과 구독
        client.subscribe('/user/queue/keyword-confirmation', (message) => {
          try {
            const data = JSON.parse(message.body);
            setMessages((prev) => [...prev, data]);
          } catch (e) {
            console.error('개인 메시지 파싱 오류:', e);
          }
        });

        // 에러 메시지 구독
        client.subscribe('/user/queue/errors', (message) => {
          try {
            JSON.parse(message.body);
          } catch (e) {
            console.error('에러 메시지 파싱 오류:', e);
          }
        });
      },
      onDisconnect: () => {
        console.log('웹소켓 연결 해제');
        setConnected(false);
        setMessages((prev) => [...prev, { type: 'SYSTEM', content: '웹소켓 연결 해제' }]);
      },
      onStompError: (frame) => {
        console.error('STOMP 에러:', frame);
        setMessages((prev) => [...prev, { type: 'ERROR', content: `STOMP 에러: ${frame}` }]);
      },
    });

    client.activate();
    setStompClient(client);
  };

  const disconnect = () => {
    if (stompClient) {
      stompClient.deactivate();
      setConnected(false);
    }
  };

  const sendKeyword = () => {
    if (stompClient && input.trim()) {
      // 1. input에서 해시태그 단어만 추출
      const keywords = input
        .split('#') // '#' 기준으로 쪼개기
        .map((s) => s.trim()) // 공백 제거
        .filter((s) => s.length > 0); // 빈 문자열 제거

      if (keywords.length === 0) return;

      // 2. 서버에 전송
      if (stompClient) {
        keywords.forEach((keyword) => {
          stompClient.publish({
            destination: `/app/room/${roomKey}/keyword`,
            body: JSON.stringify({ keyword }),
          });
        });

        // 3. 내 키워드 누적용 상태 갱신
        setMyKeyword((prev) =>
          prev
            ? `${prev} ${keywords.map((k) => `${k}`).join(' ')}`
            : keywords.map((k) => `${k}`).join(' '),
        );

        setKeyword('');
        setInput('');
      }
    }
  };

  useEffect(() => {}, [peoplenum]);
  useEffect(() => {
    const fetchRoomData = async () => {
      if (!roomKey) return;
      const res = await getRoom(roomKey);
      setRoomData(res.data);
    };
    fetchRoomData();
  }, [roomKey]);

  useEffect(() => {
    if (roomData) {
      connect();
    }
  }, [roomData]);

  useEffect(() => {
    if (input.length > 0) {
      setIsInput(true);
    } else {
      setIsInput(false);
    }
  }, [input]);
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.isComposing) {
      return;
    }
    if (e.key === 'Enter' && isInput) {
      sendKeyword();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <ChatRoomContainer>
        <ChatRoomHeader>
          <Logo>로고</Logo>
          <CloseButton onClick={disconnect}>종료</CloseButton>
        </ChatRoomHeader>
        <KeyWordContainer>
          <KeyWord>
            사람들이 공감한 키워드
            <PeopleCount>
              <img src={people} alt={people} />
              {peoplenum}
            </PeopleCount>
          </KeyWord>
          <KeyWordDivider />
          <KeyWordDetail>
            {keyword ? `${keyword}` : '같은 키워드를 2명 이상 작성하면 공개됩니다.'}
          </KeyWordDetail>
        </KeyWordContainer>
        <ChatContainer>
          <UserEntry>하나님이 입력 중입니다...</UserEntry>
          <Characters users={users} />
        </ChatContainer>
        <KeyWordContainer>
          <KeyWord>내가 입력한 공감 키워드</KeyWord>
          <KeyWordDivider />
          <KeyWordDetail>
            {mykeyword ? `${mykeyword}` : `아직 키워드를 입력하지 않았습니다.`}
          </KeyWordDetail>
        </KeyWordContainer>
      </ChatRoomContainer>
      <ChatInputContainer>
        <ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`키워드를 입력해 주세요.\n(키워드마다 앞에 #을 붙여주세요. 예: #게임)`}
        />
        <SendButton isInput={isInput} onClick={sendKeyword} disabled={!isInput}>
          <SendIcon />
        </SendButton>
      </ChatInputContainer>
    </>
  );
};
export default ChatRoomPage;
