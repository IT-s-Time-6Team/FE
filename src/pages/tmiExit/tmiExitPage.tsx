import ChatRoomSummaryPage from './tmiSummaryPage';
import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import ChatRoomExpiredPage from './tmiExpiredPage';
import { getTmiResult } from '@api/chatRoomResult';
import { RoomResult } from './tmiSummaryPage';
// 채팅룸 종료 페이지
const TmiExitPage = () => {
  const [searchParams] = useSearchParams();
  const isExpired = searchParams.get('isExpired') === 'true';
  const location = useLocation();
  const roomKey = location.state?.roomKey;
  const [roomResult, setRoomResult] = useState<RoomResult | null | undefined>();
  useEffect(() => {
    if (!isExpired && roomKey) {
      getTmiResult(roomKey)
        .then((res) => setRoomResult(res.data))
        .catch(() => setRoomResult(null));
    }
  }, [roomKey, isExpired]);

  if (isExpired || !roomKey || roomResult === null) return <ChatRoomExpiredPage />;

  if (roomResult === undefined) return null;
  return <ChatRoomSummaryPage roomResult={roomResult} />;
};
export default TmiExitPage;
