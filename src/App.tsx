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
          </Route>

          <Route>
            <Route path='/voteResult' element={<VoteResult />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
