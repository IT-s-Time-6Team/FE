import axios from 'axios';

export const gameModeStatus = async (roomKey: string) => {
  try {
    const res = await axios.get(`/api/rooms/${roomKey}`, { withCredentials: true });
    console.log('게임 모드 조회:', res);
    return res.data;
  } catch (error: unknown) {
    console.error('error:', error);
    throw error;
  }
};
