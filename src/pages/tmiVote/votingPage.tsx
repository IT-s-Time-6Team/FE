import styled from '@emotion/styled';
import CountUp from 'react-countup';
import voteIcon from '@assets/v2/Voting.svg';
import { Title, SubTitle } from '@components/shared/TextStyles';
import { Container } from '@components/shared/UIStyles';
import { useWebSocketStore } from '@store/useWebSocketStore';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';

import { useLocation } from 'react-router-dom';
const VotingPage = () => {
  const { client, setClient } = useWebSocketStore();
  const [processRate, setProcessRate] = useState<number>(0);
  const location = useLocation();
  const hasRoomEnded = useRef(false);
  const navigate = useNavigate();
  const roomKey = location.state?.roomKey;

  const fetchProcessRate = async () => {
    if (!roomKey) return;
    try {
      const res = await axios.get(`/api/tmi/rooms/${roomKey}/status`, {
        withCredentials: true,
      });
      if (res.data) {
        console.log('투표 진행 상태:', res.data.data);
        console.log('투표 진행률:', res.data.data.progress);
        setProcessRate(res.data.data.progress);
        if (res.data.data.progress === 100) {
          hasRoomEnded.current = true;
          setTimeout(() => {
            navigate(`/tmi/${roomKey}/voteResult`, {
              state: { roomKey },
            });
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
    if (!roomKey) return;
    // 이미 연결된 client가 있다면 재연결 X
    if (client && client.connected) {
      console.log('이미 연결된 웹소켓 사용');
      const subscription = client.subscribe(`/topic/room/${roomKey}/messages`, (message) => {
        try {
          if (hasRoomEnded.current) return;
          const data = JSON.parse(message.body);
          if (data.type === 'TMI_VOTING_PROGRESS') {
            setProcessRate(data.data);
          } else if (data.type === 'TMI_ROUND_COMPLETED') {
            navigate(`/tmi/${roomKey}/voteResult`, {
              state: { roomKey },
            });
          } else if (data.type === 'TMI_ALL_COMPLETED') {
            // navigate(`/tmi/${roomKey}/voting`);
          }
        } catch (e) {
          console.error('메시지 파싱 오류:', e);
        }
      });

      return () => subscription.unsubscribe(); // cleanup
    }
    const socket = new SockJS('/api/connect');
    const newClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('웹소켓 연결 성공!');
        setClient(newClient);
        newClient.subscribe(`/topic/room/${roomKey}/messages`, (message) => {
          try {
            if (hasRoomEnded.current) return;
            const data = JSON.parse(message.body);
            if (data.type === 'TMI_VOTING_PROGRESS') {
              setProcessRate(data.data);
            } else if (data.type === 'TMI_ROUND_COMPLETED') {
              navigate(`/tmi/${roomKey}/voteResult`, {
                state: { roomKey },
              });
            } else if (data.type === 'TMI_ALL_COMPLETED') {
              // 모든 TMI 투표 완료 -> 게임 결과 페이지로 이동
              /* navigate(`/tmi/${roomKey}/voting`, {
                state: { roomKey },
              }); */
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

    newClient.activate();
    setClient(newClient);

    return () => {};
  }, [roomKey]);

  return (
    <Container gap='7px'>
      <ProfileImage src={voteIcon} />
      <Title>투표가 진행중이에요!</Title>
      <SubTitle>멤버들이 투표를 하고 있어요. 조금만 기다려주세요!</SubTitle>
      <CountUp
        key={processRate}
        end={processRate}
        duration={3}
        suffix='%'
        style={{ fontSize: '30px', color: '#000', fontWeight: '600', paddingTop: '15px' }}
      />
    </Container>
  );
};
export default VotingPage;

const ProfileImage = styled.img`
  margin-top: 150px;
  margin-bottom: 23px;
  justify-self: center;
`;
