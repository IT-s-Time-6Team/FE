import styled from '@emotion/styled';
import CountUp from 'react-countup';
import voteIcon from '@assets/v2/Voting.svg';
import { Title, SubTitle } from '@components/shared/TextStyles';
import { Container } from '@components/shared/UIStyles';
import { useWebSocketStore } from '@store/useWebSocketStore';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { useLocation } from 'react-router-dom';
const BalanceLoadPage = () => {
  const { client } = useWebSocketStore();
  const [processRate, setProcessRate] = useState<number>(0);
  const location = useLocation();
  const hasRoomEnded = useRef(false);
  const navigate = useNavigate();
  const roomKey = location.state?.roomKey;
  const questionA = location.state?.questionA;
  const questionB = location.state?.questionB;

  const fetchProcessRate = async () => {
    if (!roomKey) return;
    try {
      const res = await axios.get(`/api/balance/rooms/{roomKey}/status`, {
        withCredentials: true,
      });
      if (res.data) {
        console.log('투표 진행 상태:', res.data.data);
        console.log('투표 진행률:', res.data.data.progress);
        setProcessRate(res.data.data.progress);
        if (res.data.data.progress === 100) {
          hasRoomEnded.current = true;
          setTimeout(() => {
            navigate(`/balance/${roomKey}/result`, {
              state: { roomKey, questionA, questionB },
            }); // 투표 결과 확인 페이지로 이동
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
    if (!client || !roomKey) {
      console.log('WebSocket 클라이언트나 roomKey가 없습니다.');
      console.log('클라이언트 상태:', client);

      return;
    }

    const trySubscribe = () => {
      if (client.connected) {
        console.log('WebSocket 연결됨:', client.connected);

        const sub = client.subscribe(`/topic/room/${roomKey}/messages`, (message) => {
          try {
            const data = JSON.parse(message.body);
            if (data.type === '') {
              setProcessRate(0);
            } else if (data.type === 'BALANCE_VOTING_PROGRESS') {
              console.log('투표 진행률 업데이트:', data.data);
              setProcessRate(data.data.data || 0);
            }
          } catch (e) {
            console.error('메시지 파싱 오류:', e);
          }
        });

        // clearInterval(interval); // 연결됐으면 반복 중단 (ensure 'interval' is defined if used)
        return () => sub.unsubscribe();
      }
    };

    trySubscribe();
  }, [client, roomKey, navigate]);

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
export default BalanceLoadPage;

const ProfileImage = styled.img`
  margin-top: 150px;
  margin-bottom: 23px;
  justify-self: center;
`;
