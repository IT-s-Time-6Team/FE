import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@layout/Layout';
import Home from '@pages/Home/Home';
import GlobalStyles from '../src/styles/GlobalStyles';
import ChatRoomExitPage from '@pages/chatRoomExit/chatRoomExitPage';
import OnBoardingPage from '@pages/onBoarding/onBoardingPage';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/onBoarding' element={<OnBoardingPage />} />
            <Route path='/chatRoom/exit' element={<ChatRoomExitPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
