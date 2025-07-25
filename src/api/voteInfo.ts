import axios from 'axios';

export const getVoteInfo = async (roomKey: string) => {
  try {
    const res = await axios.get(`/api/tmi/rooms/${roomKey}/votes`, { withCredentials: true });
    console.log('투표 정보 조회:', res);
    return res.data;
  } catch (error: unknown) {
    console.error('error:', error);
    throw error;
  }
};
