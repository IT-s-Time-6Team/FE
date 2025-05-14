import axios from 'axios';
export const getQuestions = async (keyword: string) => {
  try {
    const res = await axios.get(`/api/questions?keyword=${keyword}`, {
      withCredentials: true,
    });
    console.log('키워드:', keyword, res);
    return res.data;
  } catch (error: unknown) {
    console.error('error: ', error);
    throw error;
  }
};
