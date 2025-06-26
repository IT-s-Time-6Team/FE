import styled from '@emotion/styled';
import { Container, Header } from '@components/shared/UIStyles';
import { SubTitle, Title } from '@components/shared/TextStyles';
import Button from '@components/chatRoomExit/Button';

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
      <ResultContainer>
        <ResultHeader>투표 결과</ResultHeader>
        <MyVoteContainer>
          <VoteText>나의 투표</VoteText>
          <VoteSubContainer>
            <SubTitle>하나</SubTitle>
          </VoteSubContainer>
        </MyVoteContainer>
        <Result>
          <VoteText>투표 결과</VoteText>
          <VoteSubContainer>
            <VotenameContainer>
              <SubTitle>하나</SubTitle>
              <SubTitle>3표</SubTitle>
            </VotenameContainer>
          </VoteSubContainer>
        </Result>
      </ResultContainer>
      <Button onClick={() => {}} text='다음으로' />
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
const VoteCandidateContainer = styled(Header)`
  width: 301px;
  margin-top: 22px;
  gap: 22px;
  border-radius: 12px;
`;
const CandidateCharacter = styled.img`
  width: 100px;
  height: 134px;
`;
const CandidateTMI = styled(SubTitle)`
  padding: 19px 24px;
  border-radius: 12px;

  text-align: center;
  color: #3e3333;
  line-height: 150%;
  background: rgba(240, 240, 240, 0.4);
`;

const ResultContainer = styled(Header)`
  margin-top: 38px;
  margin-bottom: 100px;
  width: 301px;
`;
const ResultHeader = styled(Header)`
  margin-bottom: 18px;
  font-size: 14px;
  font-weight: 600;
`;
const MyVoteContainer = styled(Header)`
  width: 100%;
  padding: 18px 0 21px 0;
  flex-direction: row;

  align-items: flex-start;
  gap: 37px;

  border-top: 1px solid #e4e4e4;
`;
const Result = styled(MyVoteContainer)`
  padding-top: 21px;
  border-top: 1px solid #f0f0f0;
`;
const VoteText = styled(SubTitle)`
  font-weight: 600;
`;
const VoteSubContainer = styled(Header)`
  gap: 14px;
`;
const VotenameContainer = styled(Header)`
  flex-direction: row;
  gap: 13px;
`;
