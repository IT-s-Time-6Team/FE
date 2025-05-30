export interface User {
  state: string;
  nickname: string;
}
export interface RoomInfo {
  roomKey: string;
  requiredAgreements: number;
  maxMember: number;
  durationMinutes?: number;
  gameMode: string;
  createdAt: string;
  closedAt: string | null;
  isClosed: boolean;
}
export interface dataInfo {
  type: string;
  nickname: string;
  content: string;
  timestamp: string;
  data: {
    referenceName: string;
    count: number;
    variations: string[];
  }[];
}
