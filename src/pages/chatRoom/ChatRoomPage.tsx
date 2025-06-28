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
  //입력 관련 상태
  const [isInput, setIsInput] = useState(false);
  const [input, setInput] = useState<string>('');

  // 채팅방 정보
  const [roomData, setRoomData] = useState<RoomInfo>();
  const { roomKey } = useParams();

  //사용자 목록
  const [users, setUsers] = useState<User[]>([]);

  //메시지 및 키워드 관련 상태
  const [messages, setMessages] = useState<{ type: string; content: string }>();

  //웹소켓 관련 상태
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [, setConnected] = useState(false);

  //키워드 관련
  const [mykeyword, setMyKeyword] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string[]>([]);

  // 인원 수
  const [peoplenum, setPeoplenum] = useState<number>(0);

  const [isInviteOpen, setIsInviteOpen] = useState<boolean>(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false); // 방 종료 5분전 메시지
  const [isClosedOpen, setIsClosedOpen] = useState(false); // 방장 종료 메시지
  const [isEndedOpen, setIsEndedOpen] = useState(false); // 방 종료 메시지

  // 사용자 정보
  const user = useRoomUsersStore((state) => state.user);

  const navigate = useNavigate();

  //방 종료 여부
  const hasRoomEnded = useRef(false);

  //키워드 전송 함수
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

  // 컴포넌트 언마운트 시 웹소켓 연결 해제
  useEffect(() => {
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [stompClient]);

  // 웹소켓 연결 함수
  const connect = () => {
    // SockJS를 사용하여 웹소켓 연결
    const socket = new SockJS('/api/connect');
    // STOMP 클라이언트 생성
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
          let data;
          try {
            data = JSON.parse(message.body);
          } catch (e) {
            console.error('메시지 파싱 오류:', e);
            return;
          }
          switch (data.type) {
            //방 입장 및 재입장
            case 'ENTER':
              setMessages({ type: 'SYSTEM', content: `${data.nickname}님이 입장하셨습니다.` });
              setPeoplenum(data.data.userCount);
              setUsers((prev) => [
                ...prev,
                { state: '', nickname: data.nickname, character: data.character },
              ]);
              console.log('입장한 사용자:', data.character);
              console.log('입장한 사용자 닉네임:', data.nickname);
              setInput('');
              break;
            case 'REENTER':
              setMessages({ type: 'SYSTEM', content: `${data.nickname}님이 재입장하셨습니다.` });
              setPeoplenum(data.data.userCount);
              setUsers((prev) => [
                ...prev,
                { state: '', nickname: data.nickname, character: data.character },
              ]);
              setMyKeyword(data.data.keywords);
              setInput('');
              break;
            //방 퇴장
            case 'LEAVE':
              setMessages({ type: 'SYSTEM', content: `${data.nickname}님이 퇴장하셨습니다.` });
              setPeoplenum(data.data.userCount);
              setUsers((prev) => prev.filter((user) => user.nickname !== data.nickname));
              break;
            //에러
            case 'ERROR':
              alert('형식 오류');
              break;
            //타이핑 이벤트
            case 'KEY_EVENT':
              setUsers((prev) =>
                prev.map((user) =>
                  user.nickname === data.nickname ? { ...user, state: 'typing' } : user,
                ),
              );
              break;
            case 'ANALYSIS_RESULT': {
              const matchedKeywords =
                data.data?.filter(
                  (item: { count: number }) => item.count >= (roomData?.requiredAgreements ?? 2),
                ) ?? [];
              const keywordNames = matchedKeywords.map(
                (item: { referenceName: dataInfo }) => item.referenceName,
              );

              if (keywordNames.length > 0) {
                setKeyword(keywordNames);
              } else {
                setKeyword([]);
              }
              break;
            }
            case 'ROOM_EXPIRED':
              setIsEndedOpen(true);
              hasRoomEnded.current = true;
              return;
            case 'ROOM_EXPIRY_WARNING':
              setIsWarningOpen(true);
              break;
            case 'LEADER_ROOM_EXPIRED':
              setIsClosedOpen(true);
              hasRoomEnded.current = true;
              return;
            default:
              console.warn('알 수 없는 메시지 타입:', data.type);
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

  // 방 나가기 및 종료 처리
  // 방장이면 방을 종료하고, 참여자면 방을 나감
  const disconnect = () => {
    if (user?.isLeader) {
      if (stompClient) {
        if (roomKey) {
          expireRoom(roomKey);
          setIsClosedOpen(true);
        }
        stompClient.deactivate();
        setConnected(false);
      }
    } else {
      setConnected(false);
      stompClient?.deactivate();
      navigate('/rooms');
    }
  };

  // 방 KEY가 있을 때만 방 정보를 가져옴
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

  // 방 데이터가 있을 때만 connect 함수 호출
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
          <Characters count={peoplenum} user={users} />
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
