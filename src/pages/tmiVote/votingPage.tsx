import styled from '@emotion/styled';
import CountUp from 'react-countup';
import voteIcon from '@assets/v2/Voting.svg';
import { Title, SubTitle } from '@components/shared/TextStyles';
import { Container } from '@components/shared/UIStyles';
const VotingPage = () => {
  return (
    <Container gap='7px'>
      <ProfileImage src={voteIcon} />
      <Title>투표가 진행중이에요!</Title>
      <SubTitle>멤버들이 투표를 하고 있어요. 조금만 기다려주세요!</SubTitle>
      <CountUp
        end={100}
        duration={3}
        suffix='%'
        style={{ fontSize: '30px', color: '#000', fontWeight: '600', paddingTop: '15px' }}
      />
    </Container>
  );
};
export default VotingPage;

const ProfileImage = styled.img`
  margin-top: 150px;
  margin-bottom: 23px;
  justify-self: center;
`;
