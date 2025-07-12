import axios from 'axios';

interface TmiVotingResultsResponse {
  tmiContent: string;
  correctAnswer: string;
  myVote: string;
  myCharacterType: string;
  answerMemberCharacterType?: string;
  isCorrect: boolean;
  votingResults: Record<string, number>;
  round: number;
}
export interface MemberScore {
  memberName: string;
  currentScore: number;
  scoreChange: number;
  rank: number;
}
export interface BalanceVotingResultsResponse {
  myChoice: 'A' | 'B';
  choiceACount: number;
  choiceBCount: number;
  choiceAPercentage: number;
  choiceBPercentage: number;
  majorityChoice: 'A' | 'B';
  isTie: boolean;
  scoreChange: number;
  currentScore: number;
  currentRank: number;
  currentRound: number;
  allMemberScores: MemberScore[];
}

export const getTmiVoteResult = async (roomKey: string) => {
  const response = await axios.get<{ data: TmiVotingResultsResponse }>(
    `/api/tmi/rooms/${roomKey}/votes/result`,
  );
  console.log(response.data);
  return response.data.data;
};
export const getBalanceVoteResult = async (roomKey: string) => {
  const response = await axios.get<{ data: BalanceVotingResultsResponse }>(
    `/api/balance/rooms/${roomKey}/votes/result`,
  );
  console.log(response.data);
  return response.data.data;
};
