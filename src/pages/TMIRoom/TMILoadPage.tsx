import CountUp from 'react-countup';
import { ChatRoomContainer } from '../../styles/chatRoom/chatRoom';
import { TMIdetail, TMIImg, TMItitle } from './TMIInputPage';
import pan from '@assets/tmi/TMIPan.svg';
import styled from '@emotion/styled';
import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { getRoom } from '@api/chatRoomCreated';
import { RoomInfo } from 'src/types/chatRoom';
import axios from 'axios';
import { useWebSocketStore } from '@store/useWebSocketStore';

const TMILoadPage = () => {
  const { setClient } = useWebSocketStore();
  const [processRate, setProcessRate] = useState<number>(0);
  const [roomData, setRoomData] = useState<RoomInfo>();
  const { roomKey } = useParams();
  const hasRoomEnded = useRef(false);

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
      const res = await axios.get(`/api/tmi/rooms/${roomKey}/status`, {
        withCredentials: true,
      });
      if (res.data) {
        console.log('TMI 수집 상태:', res.data.data);
        console.log('TMI 수집 진행률:', res.data.data.progress);
        setProcessRate(res.data.data.progress);
        if (
          res.data.data.currentStep == 'COLLECTING_TMI' ||
          (res.data.data.currentStep == 'HINT' && res.data.data.progress === 100)
        ) {
          hasRoomEnded.current = true;
          setTimeout(() => {
            navigate(`/tmi/${roomKey}/hint`);
          }, 5000);
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
            if (hasRoomEnded.current) return;
            const data = JSON.parse(message.body);
            if (data.type === 'TMI_COLLECTION_PROGRESS') {
              console.log('TMI 수집 진행률:', data.data);
              setProcessRate(data.data);
            } else if (data.type === 'TMI_COLLECTION_COMPLETED') {
              setProcessRate(100);
              setTimeout(() => {
                navigate(`/tmi/${roomKey}/hint`);
              }, 5000);
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
      <TMItitle>TMI를 수집하는 중</TMItitle>
      <TMIdetail>다른 멤버들이 아직 TMI를 입력하고 있어요.</TMIdetail>
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
