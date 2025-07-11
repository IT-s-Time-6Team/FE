import Button from '@components/shared/Button';
import { Header } from '@components/shared/UIStyles';
import { Title, SubTitle } from '@components/shared/TextStyles';
import errorIcon from '../../assets/error_page_icon.svg';
import { useNavigate } from 'react-router-dom';
import { ExpiryBox, ExpiryContainer, ProfileImage } from '../../styles/roomExit/exitPageStyles';

// 채팅룸 종료 오류 페이지
const BalanceExpiredPage = () => {
  const navigate = useNavigate();
  return (
    <ExpiryContainer>
      <ExpiryBox>
        <ProfileImage src={errorIcon} />
        <Header>
          <Title>밸런스 선택이 종료되었어요.</Title>
          <SubTitle>이미 종료된 방이에요. 새 방을 만들어 볼까요?</SubTitle>
        </Header>
      </ExpiryBox>
      <Button text='새로운 채팅룸 만들기' onClick={() => navigate('/rooms')} />
    </ExpiryContainer>
  );
};
export default BalanceExpiredPage;
