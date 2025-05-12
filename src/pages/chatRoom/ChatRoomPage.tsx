import {
  ChatRoomContainer,
  ChatRoomHeader,
  CloseButton,
  ChatContainer,
  UserEntry,
} from '../../styles/chatRoom/chatRoom';
import { useEffect, useState } from 'react';
import Characters from '../../components/chatRoom/Characters';
import { expireRoom, getRoom } from '@api/chatRoomCreated';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { User, RoomInfo, dataInfo } from '../../types/chatRoom';
import ChatInputComponents from '@components/chatRoom/ChatInputComponents';
import KeyWordComponents from '@components/chatRoom/KeyWordComponents';
import MyKeyWordComponents from '@components/chatRoom/MyKeyWordComponents';

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
  const navigate = useNavigate();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<{ type: string; content: string }>();
  const [keyword, setKeyword] = useState('');
  const [, setConnected] = useState(false);
  const [mykeyword, setMyKeyword] = useState<string[]>([]);
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
              setMessages({ type: 'SYSTEM', content: `${data.nickname}님이 입장하셨습니다.` });
              setPeoplenum((prev) => prev + 1);
              setInput('');
            } else if (data.type === 'REENTER') {
              setMessages({ type: 'SYSTEM', content: `${data.nickname}님이 재입장하셨습니다.` });
            } else if (data.type === `ERROR`) {
              alert('형식 오류');
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
              } else {
                setKeyword('같은 키워드를 2명 이상 작성하면 공개됩니다.');
              }
            } else if (data.type === 'ROOM_EXPIRED') {
              alert('방이 만료되었습니다.');
              navigate('/rooms/exit');
            }
          } catch (e) {
            console.error('메시지 파싱 오류:', e);
          }
        });

        // 키워드 전송 결과 구독
        client.subscribe('/user/queue/keyword-confirmation', (message) => {
          try {
            const data = JSON.parse(message.body);
            console.log('키워드 전송 결과:', data);
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
        navigate('/rooms/exit');
      },
      onStompError: (frame) => {
        console.error('STOMP 에러:', frame);
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
    if (roomKey) {
      expireRoom(roomKey);
      navigate('/rooms/exit');
    }
  };

  const sendKeyword = () => {
    if (stompClient && input.trim()) {
      const keywords = input
        .split('#')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      if (keywords.length === 0) {
        setInput('');
        setKeyword('');
        return;
      }

      const newKeywords = keywords.filter((k) => !mykeyword.includes(k));

      if (newKeywords.length === 0) {
        setInput('');
        setKeyword('');
        return;
      }

      // 서버 전송
      newKeywords.forEach((keyword) => {
        stompClient.publish({
          destination: `/app/room/${roomKey}/keyword`,
          body: JSON.stringify({ keyword }),
        });
      });

      setMyKeyword((prev) => [...prev, ...newKeywords]);
      setInput('');
      setKeyword('');
    }
  };

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

  return (
    <>
      <ChatRoomContainer>
        <ChatRoomHeader>
          <CloseButton onClick={disconnect}>종료</CloseButton>
        </ChatRoomHeader>
        <KeyWordComponents keyword={keyword} peoplenum={peoplenum} />
        <ChatContainer>
          <UserEntry>{messages?.content}</UserEntry>
          <Characters users={users} />
        </ChatContainer>
        <MyKeyWordComponents mykeyword={mykeyword} />
      </ChatRoomContainer>
      <ChatInputComponents
        input={input}
        setInput={setInput}
        isInput={isInput}
        sendKeyword={sendKeyword}
        setIsInput={setIsInput}
      />
    </>
  );
};
export default ChatRoomPage;
