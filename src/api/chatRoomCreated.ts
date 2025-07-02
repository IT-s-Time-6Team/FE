import axios from 'axios';
import api from './api';

export const createRoom = async (payload: {
  requiredAgreements: number;
  maxMember: number;
  durationMinutes?: number;
  gameMode: 'NORMAL' | 'TMI' | 'INPROGRESS';
}) => {
  try {
    const res = await api.post('/api/rooms', payload);
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
