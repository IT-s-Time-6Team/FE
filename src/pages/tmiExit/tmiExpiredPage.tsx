import styled from '@emotion/styled';
import Button from '@components/shared/Button';
import { Container, Header } from '@components/shared/UIStyles';
import { Title, SubTitle } from '@components/shared/TextStyles';
import errorIcon from '../../assets/error_page_icon.svg';
import { useNavigate } from 'react-router-dom';

// 채팅룸 종료 오류 페이지
const TmiExpiredPage = () => {
  const navigate = useNavigate();
  return (
    <ExpiryContainer>
      <Box>
        <ProfileImage src={errorIcon} />
        <Header>
          <Title>TMI 입력이 종료되었어요.</Title>
          <SubTitle>이미 종료된 방이에요. 새 방을 만들어 볼까요?</SubTitle>
        </Header>
      </Box>
      <Button text='새로운 채팅룸 만들기' onClick={() => navigate('/rooms')} />
    </ExpiryContainer>
  );
};
export default TmiExpiredPage;

const ProfileImage = styled.img`
  margin-top: 150px;
  margin-bottom: 23px;
  justify-self: center;
`;
const ExpiryContainer = styled(Container)`
  justify-content: space-between;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
