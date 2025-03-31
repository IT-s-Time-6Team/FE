import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@layout/Layout';
import Home from '@pages/Home/Home';
import ChatRoomPage from '@pages/ChatRoomPage';
import GlobalStyles from '../src/styles/GlobalStyles';
import ChatRoomExitPage from '@pages/chatRoomExitPage';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/chatRoom' element={<ChatRoomPage />} />
            <Route path='/chatRoom/exit' element={<ChatRoomExitPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
