import axios from 'axios';
import api from './api';

export const createRoom = async (payload: {
  requiredAgreements?: number;
  maxMember: number;
  balanceQuestionCount?: number;
  durationMinutes?: number;
  gameMode: string;
}) => {
  try {
    let dataToSend;

    if (payload.gameMode === 'TMI') {
      // TMI 모드일 때: maxMember, gameMode만 보냄
      dataToSend = {
        maxMember: payload.maxMember,
        gameMode: payload.gameMode,
      };
    } else if (payload.gameMode === 'BALANCE') {
      dataToSend = {
        maxMember: payload.maxMember,
        gameMode: payload.gameMode,
        balanceQuestionCount: payload.balanceQuestionCount,
      };
    } else {
      // 나머지 모드일 때: 전체 payload 전송
      dataToSend = payload;
    }

    const res = await api.post('/api/rooms', dataToSend);
    return res.data;
  } catch (error: unknown) {
    console.error('error: ', error);
    throw error;
  }
};

export const getRoom = async (roomKey: string) => {
  try {
    const res = await axios.get(`/api/rooms/${roomKey}`, {
      withCredentials: true,
    });
    console.log('방 정보:', res);
    return res.data;
  } catch (error: unknown) {
    console.log('방 정보 가져오기 실패:', error);
    console.error('error: ', error);
    throw error;
  }
};
export const expireRoom = async (roomKey: string) => {
  try {
    const res = await axios.patch(`/api/rooms/${roomKey}/close`);
    console.log('방 종료:', res);
  } catch (error: unknown) {
    console.error('error: ', error);
    throw error;
  }
};
