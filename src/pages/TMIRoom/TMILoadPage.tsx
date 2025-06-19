import { ChatRoomContainer } from '../../styles/chatRoom/chatRoom';
import { TMIdetail, TMIImg, TMItitle } from './TMIInputPage';
import pan from '@assets/tmi/TMIPan.svg';
import styled from '@emotion/styled';

const TMILoadPage = () => {
  return (
    <ChatRoomContainer>
      <Space />
      <TMIImg src={pan} alt='pan' />
      <TMItitle>TMI를 수집하는 중</TMItitle>
      <TMIdetail>다른 멤버들이 아직 TMI를 입력하고 있어요.</TMIdetail>
      <h1>00%</h1>
    </ChatRoomContainer>
  );
};
export default TMILoadPage;
const Space = styled.div`
  height: 50px;
`;
