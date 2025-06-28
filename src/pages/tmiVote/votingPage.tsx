import styled from '@emotion/styled';
import errorIcon from '../../assets/error_page_icon.svg';
import { Title, SubTitle } from '@components/shared/TextStyles';
import { Container } from '@components/shared/UIStyles';
const VotingPage = () => {
  return (
    <Container gap='7px'>
      <ProfileImage src={errorIcon} />
      <Title>투표가 진행중이에요!</Title>
      <SubTitle>멤버들이 투표를 하고 있어요. 조금만 기다려주세요!</SubTitle>
      <ScoreTitle>00%</ScoreTitle>
    </Container>
  );
};
export default VotingPage;

const ProfileImage = styled.img`
  margin-top: 150px;
  margin-bottom: 23px;
  justify-self: center;
`;
const ScoreTitle = styled(Title)`
  font-size: 30px;
  margin-top: 20px;
`;
