import styled from '@emotion/styled';
import { Container, Header } from '@components/shared/UIStyles';
import { SubTitle, Title } from '@components/shared/TextStyles';

const VoteResult = () => {
  return (
    <Container>
      <VoteResultHeader>
        <ResultText>TMI 맞추기 성공!</ResultText>
        <SubTitle>하나 님은 TMI의 주인이 맞습니다.</SubTitle>
      </VoteResultHeader>
      <VoteCandidateContainer>
        <CandidateCharacter />
        <CandidateTMI>오늘 아침에 양치하다가 칫솔을 떨어뜨려서 새 칫솔로 교체했어요.</CandidateTMI>
      </VoteCandidateContainer>
    </Container>
  );
};

export default VoteResult;

const VoteResultHeader = styled(Header)`
  margin-top: 47px;
`;
const ResultText = styled(Title)`
  color: #3e3333;
`;
const VoteCandidateContainer = styled(Container)`
  
  margin-top: 22px;
  gap: 22px;
  border-radius: 12px;
  background: rgba(240, 240, 240, 0.4);
`;
const CandidateCharacter = styled.img`
  width: 100px;
  height: 134px;
`;
const CandidateTMI = styled(SubTitle)`
  padding: 19px 24px;

  color: #3e3333;
  line-height: 150%;
`;
