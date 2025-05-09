import api from './api';

export const createRoom = async (payload: {
  requiredAgreements: number;
  maxMember: number;
  durationMinutes?: number;
  gameMode: 'NORMAL';
}) => {
  try {
    const res = await api.post('/rooms', payload);
    return res.data;
  } catch (error: unknown) {
    console.error('error: ', error);
    throw error;
  }
};
