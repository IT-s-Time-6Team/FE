import {
  ChatRoomContainer,
  ChatRoomHeader,
  CloseButton,
  ChatContainer,
  UserEntry,
} from '../../styles/chatRoom/chatRoom';
import styled from '@emotion/styled';
import InfoIcon from '@assets/chatRoom/info.svg';
import { useEffect, useState, useRef } from 'react';
import Characters from '../../components/chatRoom/Characters';
import { expireRoom, getRoom } from '@api/chatRoomCreated';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { RoomInfo, User, dataInfo } from '../../types/chatRoom';
import ChatInputComponents from '@components/chatRoom/ChatInputComponents';
import KeyWordComponents from '@components/chatRoom/KeyWordComponents';
import MyKeyWordComponents from '@components/chatRoom/MyKeyWordComponents';
import SendKeywords from '../../utils/SendKeywords';
import InviteModal from '@components/chatRoom/InviteModal';
import { ModalPortal } from '@components/shared/ModalPortal';
import MessageModal from '@components/chatRoom/messageModal';
import useRoomUsersStore from '@store/useRoomUsersStore';

const ChatRoomPage = () => {
  const [isInput, setIsInput] = useState(false);
  const [input, setInput] = useState<string>('');
  const [roomData, setRoomData] = useState<RoomInfo>();
  const { roomKey } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<{ type: string; content: string }>();
  const [keyword, setKeyword] = useState<string[]>([]);
  const [mykeyword, setMyKeyword] = useState<string[]>([]);
  const [peoplenum, setPeoplenum] = useState<number>(0);
  const [isInviteOpen, setIsInviteOpen] = useState<boolean>(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false); // 방 종료 5분전 메시지
  const [isClosedOpen, setIsClosedOpen] = useState(false); // 방장 종료 메시지
  const [isEndedOpen, setIsEndedOpen] = useState(false); // 방 종료 메시지
  const user = useRoomUsersStore((state) => state.user);
  const hasRoomEnded = useRef(false);
  const sendKeyword = () => {
    SendKeywords({
      stompClient,
      roomKey: roomKey ?? '',
      input,
      setInput,
      setMyKeyword,
      mykeyword,
    });
  };

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
        // 채팅방 메시지 구독
        client.subscribe(`/topic/room/${roomKey}/messages`, (message) => {
          try {
            if (hasRoomEnded.current) return;

            const data = JSON.parse(message.body);
            if (data.type === 'ENTER') {
              setMessages({ type: 'SYSTEM', content: `${data.nickname}님이 입장하셨습니다.` });
              setPeoplenum(data.data.userCount);
              setUsers((prev) => [...prev, { state: '', nickname: data.nickname }]);
              setInput('');
            } else if (data.type === 'REENTER') {
              setMessages({ type: 'SYSTEM', content: `${data.nickname}님이 재입장하셨습니다.` });
              setPeoplenum(data.data.userCount);
              setUsers((prev) => [...prev, { state: '', nickname: data.nickname }]);
              setMyKeyword(data.data.keywords);
              setInput('');
            } else if (data.type === 'LEAVE') {
              setMessages({ type: 'SYSTEM', content: `${data.nickname}님이 퇴장하셨습니다.` });
              setPeoplenum(data.data.userCount);
              setUsers((prev) => prev.filter((user) => user.nickname !== data.nickname));
            } else if (data.type === `ERROR`) {
              alert('형식 오류');
            } else if (data.type === 'kEY_EVENT') {
              setUsers([...users, { state: 'typing', nickname: data.nickname }]);
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
                setKeyword(keywordNames);
              } else {
                setKeyword([]);
              }
            } else if (data.type === 'ROOM_EXPIRED') {
              console.log('방 만료됨');
              setIsEndedOpen(true);
              hasRoomEnded.current = true;
              return;
            } else if (data.type === 'ROOM_EXPIRY_WARNING') {
              console.log('방 종료 5분 남음');
              setIsWarningOpen(true);
            } else if (data.type === 'LEADER_ROOM_EXPIRED') {
              console.log('방장이 방 종료');
              setIsClosedOpen(true);
              hasRoomEnded.current = true;
              return;
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
        if (user?.isLeader) {
          navigate('/rooms/exit', { state: { roomKey } });
        }
      },
      onStompError: (frame) => {
        console.error('STOMP 에러:', frame);
      },
    });

    client.activate();
    setStompClient(client);
  };

  const disconnect = () => {
    if (user?.isLeader) {
      console.log('방장입니다. 방을 종료합니다.');
      if (stompClient) {
        if (roomKey) {
          expireRoom(roomKey);
          setIsClosedOpen(true);
        }
        stompClient.deactivate();
      }
    } else {
      stompClient?.deactivate();
      navigate('/rooms');
    }
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      if (!roomKey) return;
      try {
        const res = await getRoom(roomKey);
        setRoomData(res.data);
      } catch (error) {
        console.error('Error fetching room data:', error);
        navigate('/rooms/exit');
      }
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
          <InfoButton onClick={() => setIsInviteOpen(true)} src={InfoIcon} alt='info' />
          <CloseButton onClick={disconnect}>{user?.isLeader ? '종료' : '나가기'}</CloseButton>
        </ChatRoomHeader>
        <KeyWordComponents keyword={keyword} peoplenum={peoplenum} />
        <ChatContainer>
          <UserEntry>{messages?.content}</UserEntry>
          <Characters count={peoplenum} />
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
      {isInviteOpen && (
        <ModalPortal>
          <InviteModal onClose={() => setIsInviteOpen(false)} roomId={roomKey ?? ''} />
        </ModalPortal>
      )}
      {isEndedOpen && (
        <ModalPortal>
          <MessageModal onClose={() => setIsEndedOpen(false)} kind='ended' roomkey={roomKey} />
        </ModalPortal>
      )}
      {isClosedOpen && !user?.isLeader && (
        <ModalPortal>
          <MessageModal onClose={() => setIsClosedOpen(false)} kind='closed' roomkey={roomKey} />
        </ModalPortal>
      )}

      {isWarningOpen && (
        <ModalPortal>
          <MessageModal onClose={() => setIsWarningOpen(false)} kind='warning' />
        </ModalPortal>
      )}
    </>
  );
};
export default ChatRoomPage;
const InfoButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
