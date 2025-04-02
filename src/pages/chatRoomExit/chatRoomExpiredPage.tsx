import styled from '@emotion/styled';
import Button from '@components/chatRoomExit/Button';
import { Container, Header } from '@components/chatRoomExit/UIStyles';
// 채팅룸 종료 오류 페이지
const ChatRoomExpiredPage = () => {
  return (
    <Container>
      <ProfileImage />
      <Header>
        <Title>채팅룸이 종료되었어요.</Title>
        <SubTitle>이미 종료된 채팅룸이에요. 새 방을 만들어 볼까요?</SubTitle>
      </Header>
      <Button text='새로운 채팅룸 만들기' />
    </Container>
  );
};
export default ChatRoomExpiredPage;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;
const SubTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #7c7c7c;
  text-align: center;
`;
const ProfileImage = styled.div`
  width: 136px;
  height: 136px;
  background-color: #d9d9d9;
  margin-top: 216px;
  margin-bottom: 23px;
  align-self: center;
`;
