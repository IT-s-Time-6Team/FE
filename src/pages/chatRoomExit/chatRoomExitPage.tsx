import ChatRoomSummaryPage from './chatRoomSummaryPage';
import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import ChatRoomExpiredPage from './chatRoomExpiredPage';
import { getRoomResult } from '@api/roomResult';
import { RoomResult } from './chatRoomSummaryPage';
// 채팅룸 종료 페이지
const ChatRoomExitPage = () => {
  const [searchParams] = useSearchParams();
  const isExpired = searchParams.get('isExpired') === 'true';
  const location = useLocation();
  const roomKey = location.state?.roomKey;
  const [roomResult, setRoomResult] = useState<RoomResult | null | undefined>();
  useEffect(() => {
    if (!isExpired && roomKey) {
      getRoomResult(roomKey)
        .then((res) => setRoomResult(res.data))
        .catch(() => setRoomResult(null));
    }
  }, [roomKey, isExpired]);

  if (isExpired || !roomKey || roomResult === null) return <ChatRoomExpiredPage />;

  if (roomResult === undefined) return null;
  return <ChatRoomSummaryPage roomResult={roomResult} />;
};
export default ChatRoomExitPage;
