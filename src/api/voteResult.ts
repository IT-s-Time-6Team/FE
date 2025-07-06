import axios from 'axios';

interface VotingResultsResponse {
  tmiContent: string;
  correctAnswer: string;
  myVote: string;
  isCorrect: boolean;
  votingResults: Record<string, number>;
  round: number;
}

export const getTmiVoteResult = async (roomKey: string) => {
  const response = await axios.get<{ data: VotingResultsResponse }>(
    `/api/tmi/rooms/${roomKey}/votes/result`,
  );
  console.log(response.data);
  return response.data.data;
};
