import api from './api';

export const getRoomResult = async (roomKey: string) => {
  try {
    const res = await api.get(`/rooms/${roomKey}/result`);
    return res;
  } catch (error: unknown) {
    console.error('error:', error);
    throw error;
  }
};
