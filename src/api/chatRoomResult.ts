import axios from 'axios';

export const getRoomResult = async (roomKey: string) => {
  try {
    const res = await axios.get(`/api/rooms/${roomKey}/result`, { withCredentials: true });
    console.log('요약 결과 조회:', res);
    return res.data;
  } catch (error: unknown) {
    console.error('error:', error);
    throw error;
  }
};
