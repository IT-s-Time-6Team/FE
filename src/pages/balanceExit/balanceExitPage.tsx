import BalanceSummaryPage from './balanceSummaryPage';
import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import BalanceExpiredPage from './balanceExpiredPage';
import { getBalanceResult } from '@api/roomResult';
import { FinalResult } from './balanceSummaryPage';
// 채팅룸 종료 페이지
const BalanceExitPage = () => {
  const [searchParams] = useSearchParams();
  const isExpired = searchParams.get('isExpired') === 'true';
  const location = useLocation();
  const roomKey = location.state?.roomKey;
  const [roomResult, setRoomResult] = useState<FinalResult | null | undefined>();
  useEffect(() => {
    if (!isExpired && roomKey) {
      getBalanceResult(roomKey)
        .then((res) => setRoomResult(res.data))
        .catch(() => setRoomResult(null));
    }
  }, [roomKey, isExpired]);

  if (isExpired || !roomKey || roomResult === null) return <BalanceExpiredPage />;

  if (roomResult === undefined) return null;
  return <BalanceSummaryPage roomResult={roomResult} />;
};
export default BalanceExitPage;
