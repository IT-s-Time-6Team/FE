import axios from 'axios';

export const discussionSkip = async (roomKey: string) => {
  try {
    const res = await axios.post(`/api/balance/rooms/${roomKey}/discussion/skip`);
    console.log(res);
    return res.data;
  } catch (error: unknown) {
    console.error('error', error);
    throw error;
  }
};
