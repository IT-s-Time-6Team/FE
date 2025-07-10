import CountUp from 'react-countup';
import { ChatRoomContainer } from '../../styles/chatRoom/chatRoom';
import { TMIdetail, TMIImg, TMItitle } from './TMIInputPage';
import pan from '@assets/tmi/pan.svg';
import styled from '@emotion/styled';
import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { getRoom } from '@api/chatRoomCreated';
import { RoomInfo } from 'src/types/chatRoom';
import axios from 'axios';
import { useWebSocketStore } from '@store/useWebSocketStore';
import useGameModeStore from '@store/useGameModeStore';
// 게임 모드에 따른 로딩 페이지
type GameMode = 'TMI' | 'BALANCE';

interface ModeConfig {
  title: string;
  detail: string;
}
const MODE_CONFIG: Record<GameMode, ModeConfig> = {
  TMI: {
    title: 'TMI를 수집하는 중...',
    detail: '다른 멤버들이 아직 TMI를 입력하고 있어요.',
  },
  BALANCE: {
    title: '잠시만 기다려주세요!',
    detail: '방을 생성하고 있어요. 조그만 기다려 주세요.',
  },
};

const TMILoadPage = () => {
  const { setClient } = useWebSocketStore();
  const [processRate, setProcessRate] = useState<number>(0);
  const [roomData, setRoomData] = useState<RoomInfo>();
  const { roomKey } = useParams();
  const hasRoomEnded = useRef(false);
  const gameMode = useGameModeStore((state) => state.gameMode as GameMode);
  const { title, detail } = MODE_CONFIG[gameMode];

  const navigate = useNavigate();

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

  const fetchProcessRate = async () => {
    if (!roomKey) return;
    try {
      // 게임 모드에 따른 API 엔드포인트 설정
      const res = await axios.get(`/api/${gameMode.toLowerCase()}/rooms/${roomKey}/status`, {
        withCredentials: true,
      });
      //TMI 모드
      if (res.data && gameMode === 'TMI') {
        console.log('TMI 수집 상태:', res.data.data);
        console.log('TMI 수집 진행률:', res.data.data.progress);
        setProcessRate(res.data.data.progress);
        if (
          (res.data.data.currentStep == 'COLLECTING_TMI' && res.data.data.progress === 100) ||
          res.data.data.currentStep == 'HINT'
        ) {
          hasRoomEnded.current = true;
          setTimeout(() => {
            navigate(`/tmi/${roomKey}/hint`);
          }, 5000);
        }
        //BALANCE 모드
      } else if (res.data && gameMode === 'BALANCE') {
        console.log('멤버 모집 상태:', res.data.data);
        if (res.data.data.currentStep == 'QUESTION_REVEAL') {
          hasRoomEnded.current = true;
          setTimeout(() => {
            navigate(`/balance/${roomKey}/question`);
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Error fetching process rate:', error);
      navigate('/rooms/exit');
    }
  };
  useEffect(() => {
    if (!roomKey) return;
    fetchProcessRate();
  }, []);

  useEffect(() => {
    if (!roomKey || !roomData) return;

    const socket = new SockJS('/api/connect');
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('웹소켓 연결 성공!');
        setClient(client);
        client.subscribe(`/topic/room/${roomKey}/messages`, (message) => {
          try {
            console.log('수신된 메시지:', message);
            if (hasRoomEnded.current) return;
            const data = JSON.parse(message.body);
            console.log('수신된 데이터', data);
            // TMI 모드 웹소켓 연결
            if (data.type === 'TMI_COLLECTION_PROGRESS') {
              console.log('TMI 수집 진행률:', data.data);
              setProcessRate(data.data);
            } else if (data.type === 'TMI_COLLECTION_COMPLETED') {
              setProcessRate(100);
              setTimeout(() => {
                navigate(`/tmi/${roomKey}/hint`);
              }, 5000);
            }
            // BALANCE 모드 웹소켓 연결
            else if (data.type === 'BALANCE_GAME_READY') {
              const process = (data.data.currentCount / data.data.totalCount) * 100;
              setProcessRate(process);
            } else if (data.type === 'BALANCE_ALL_MEMBERS_JOINED') {
              setProcessRate(100);
              setTimeout(() => {
                navigate(`/balance/${roomKey}/question`);
              }, 3000);
            }
          } catch (e) {
            console.error('메시지 파싱 오류:', e);
          }
        });
      },
      onStompError: (frame) => {
        console.error('STOMP 에러:', frame);
      },
    });

    client.activate();
    setClient(client);

    return () => {};
  }, [roomData, roomKey]);

  return (
    <ChatRoomContainer>
      <Space />
      <TMIImg src={pan} alt='pan' />
      <TMItitle>{title}</TMItitle>
      <TMIdetail>{detail}</TMIdetail>
      <CountUp
        key={processRate}
        end={processRate}
        duration={3}
        suffix='%'
        style={{ fontSize: '30px', color: '#000', fontWeight: '600' }}
      />
    </ChatRoomContainer>
  );
};

export default TMILoadPage;

const Space = styled.div`
  height: 50px;
`;
