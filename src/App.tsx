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
import TMILoadPage from '@pages/TMIRoom/TMILoadPage';
import TMIHintPage from '@pages/TMIRoom/TMIHintPage';
import BalanceQuestionPage from '@pages/BalanceRoom/BalanceQuestionPage';
import BalanceDiscussionPage from '@pages/BalanceRoom/BalanceDiscussionPage';

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
            <Route path='/tmi/:roomKey/vote' element={<TmiVotePage />} />
            <Route path='/tmi/:roomKey/voting' element={<VotingPage />} />
            <Route path='/tmi/:roomKey/input' element={<TMIInputPage />} />
            <Route path='/tmi/:roomKey/load' element={<TMILoadPage />} />
            <Route path='/tmi/:roomKey/hint' element={<TMIHintPage />} />
            <Route path='/tmi/:roomKey/voteResult' element={<VoteResult />} />
            <Route path='/balance/:roomKey/load' element={<TMILoadPage />} />
            <Route path='/balance/:roomKey/question' element={<BalanceQuestionPage />} />
            <Route path='/balance/:roomKey/discussion' element={<BalanceDiscussionPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
