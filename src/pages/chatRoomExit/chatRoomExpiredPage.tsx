import styled from '@emotion/styled';
import Button from '@components/chatRoomExit/Button';
const ChatRoomExpiredPage = () => {
  return (
    <Container>
      <div
        style={{
          width: '136px',
          height: '136px',
          backgroundColor: '#D9D9D9',
          marginTop: '216px',
          marginBottom: '23px',
          alignSelf: 'center',
        }}
      ></div>
      <Header>
        <Title>채팅룸이 종료되었어요.</Title>
        <SubTitle>이미 종료된 채팅룸이에요. 새 방을 만들어 볼까요?</SubTitle>
      </Header>
      <Button text='새로운 채팅룸 만들기' />
    </Container>
  );
};
export default ChatRoomExpiredPage;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;
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
