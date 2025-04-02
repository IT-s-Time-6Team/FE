import ChatRoomSummaryPage from './chatRoomSummaryPage';
import { useSearchParams } from 'react-router-dom';
import ChatRoomExpiredPage from './chatRoomExpiredPage';
// 채팅룸 종료 페이지
const ChatRoomExitPage = () => {
  const [searchParams] = useSearchParams();
  const isExpired = searchParams.get('isExpired') === 'true';
  return <>{isExpired ? <ChatRoomExpiredPage /> : <ChatRoomSummaryPage />}</>;
};
export default ChatRoomExitPage;
