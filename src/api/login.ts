import api from './api';

export const joinRoom = async (
  roomKey: string,
  payload: { nickname: string; password: string },
) => {
  try {
    const res = await api.post(`/rooms/${roomKey}/member`, payload);
    console.log('로그인 성공');
    return res;
  } catch (error: unknown) {
    console.error('error:', error);
    throw error;
  }
};
