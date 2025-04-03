import styled from '@emotion/styled';
import Button from '@components/chatRoomExit/Button';
import { Container, Header } from '@components/shared/UIStyles';
import { Title, SubTitle } from '@components/shared/TextStyles';
import errorIcon from '../../assets/error_page_icon.svg';

// 채팅룸 종료 오류 페이지
const ChatRoomExpiredPage = () => {
  return (
    <Container>
      <ProfileImage src={errorIcon} />
      <Header>
        <Title>채팅룸이 종료되었어요.</Title>
        <SubTitle>이미 종료된 채팅룸이에요. 새 방을 만들어 볼까요?</SubTitle>
      </Header>
      <Button text='새로운 채팅룸 만들기' />
    </Container>
  );
};
export default ChatRoomExpiredPage;

const ProfileImage = styled.img`
  margin-top: 216px;
  margin-bottom: 23px;
  align-self: center;
`;
