import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@layout/Layout';
import ChatRoomCreatedPage from '@pages/chatRommCreated/chatRoomCreatedPage';
import GlobalStyles from '../src/styles/GlobalStyles';
import ChatRoomExitPage from '@pages/chatRoomExit/chatRoomExitPage';
import OnBoardingPage from '@pages/onBoarding/onBoardingPage';
import MainPage from '@pages/Main/MainPage';
import UserEnterChatRoom from '@pages/userEnterChatRoom/userEnterChatRoom';
import ChatRoomPage from '@pages/chatRoom/ChatRoomPage';
import VoteResult from '@pages/voteResult/voteResultPage';
import TmiVotePage from '@pages/tmiVote/TmiVotePage';
import VotingPage from '@pages/tmiVote/votingPage';
import TMIInputPage from '@pages/TMIRoom/TMIInputPage';
import TmiExitPage from '@pages/tmiExit/tmiExitPage';
import LoadPage from '@pages/TMIRoom/LoadPage';
import HintAndDiscussionPage from '@pages/TMIRoom/HintAndDisscussionPage';
import BalanceQuestionPage from '@pages/BalanceRoom/BalanceQuestionPage';
import BalanceVotePage from '@pages/BalanceRoom/BalanceVotePage';
import BalanceLoadPage from '@pages/BalanceRoom/BalanceLoadPage';
import BalanceResultPage from '@pages/BalanceRoom/BalanceResultPage';
import BalanceRankingPage from '@pages/BalanceRoom/BalanceRankingPage';
import BalanceExitPage from '@pages/balanceExit/balanceExitPage';
import BalanceReadyToNextPage from '@pages/BalanceRoom/BalanceReadyToNextPage';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path='/chatRoomCreated' element={<ChatRoomCreatedPage />} />
            <Route path='/userEnterChatRoom' element={<UserEnterChatRoom />} />
          </Route>

          <Route element={<Layout />}>
            <Route index element={<OnBoardingPage />} />
            <Route path='/rooms' element={<MainPage />} />
            <Route path='/rooms/:roomKey/member' element={<UserEnterChatRoom />} />
            <Route path='/rooms/exit' element={<ChatRoomExitPage />} />
            <Route path='/rooms/:roomKey/chat' element={<ChatRoomPage />} />
            {/* TMI Room Routes */}
            <Route path='/tmi/:roomKey/vote' element={<TmiVotePage />} />
            <Route path='/tmi/:roomKey/voting' element={<VotingPage />} />
            <Route path='/tmi/:roomKey/input' element={<TMIInputPage />} />
            <Route path='/tmi/:roomKey/load' element={<LoadPage />} />
            <Route path='/tmi/:roomKey/hint' element={<HintAndDiscussionPage />} />
            <Route path='/tmi/:roomKey/voteResult' element={<VoteResult />} />
            <Route path='/tmi/exit' element={<TmiExitPage />} />
            {/* Balance Room Routes */}
            <Route path='/balance/:roomKey/load' element={<LoadPage />} />
            <Route path='/balance/:roomKey/question' element={<BalanceQuestionPage />} />
            <Route path='/balance/:roomKey/discussion' element={<HintAndDiscussionPage />} />
            <Route path='/balance/:roomKey/vote' element={<BalanceVotePage />} />
            <Route path='/balance/:roomKey/voteload' element={<BalanceLoadPage />} />
            <Route path='/balance/:roomKey/result' element={<BalanceResultPage />} />
            <Route path='/balance/:roomKey/rank' element={<BalanceRankingPage />} />
            <Route path='/balance/exit' element={<BalanceExitPage />} />
            <Route path='/balance/:roomKey/ready' element={<BalanceReadyToNextPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
