import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@layout/Layout';
import Home from '@pages/Home/Home';
import ChatRoomCreatedPage from '@pages/chatRommCreated/chatRoomCreatedPage';
import GlobalStyles from '../src/styles/GlobalStyles';
import ChatRoomExitPage from '@pages/chatRoomExit/chatRoomExitPage';
import OnBoardingPage from '@pages/onBoarding/onBoardingPage';
import MainPage from '@pages/Main/MainPage';
import UserEnterChatRoom from '@pages/userEnterChatRoom/userEnterChatRoom';

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
            <Route index element={<Home />} />
            <Route path='/onBoarding' element={<OnBoardingPage />} />
            <Route path='/main' element={<MainPage />} />
            <Route path='/chatRoom/exit' element={<ChatRoomExitPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
