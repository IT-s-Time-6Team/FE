import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@layout/Layout';
import Home from '@pages/Home/Home';
import ChatRoomCreatedPage from '@pages/chatRoomCreatedPage';
import GlobalStyles from '../src/styles/GlobalStyles';
import ChatRoomExitPage from '@pages/chatRoomExit/chatRoomExitPage';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path='/chatRoomCreated' element={<ChatRoomCreatedPage />} />
          </Route>

          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/chatRoom/exit' element={<ChatRoomExitPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
