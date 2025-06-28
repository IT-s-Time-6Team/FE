import CountUp from 'react-countup';
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
      <CountUp
        end={100}
        duration={3}
        suffix='%'
        style={{ fontSize: '30px', color: '#000', fontWeight: '600' }}
      />
    </ChatRoomContainer>
  );
};
export default TMILoadPage;
const Space = styled.div`
  height: 50px;
`;
