import axios from 'axios';

export const skipTMIHint = async (roomKey: string) => {
  try {
    const res = await axios.post(`/api/tmi/rooms/${roomKey}/hint/skip`);
    console.log(res);
    return res.data;
  } catch (error: unknown) {
    console.error('error', error);
    throw error;
  }
};
