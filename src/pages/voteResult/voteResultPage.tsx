import styled from '@emotion/styled';
import { Container, Header } from '@components/shared/UIStyles';
import { SubTitle, Title } from '@components/shared/TextStyles';
import RabbitIcon from '@assets/chatRoom/character/rabbit.svg?react';

const VoteResult = () => {
  return (
    <Container>
      <VoteResultHeader>
        <ResultText>TMI 맞추기 성공!</ResultText>
        <SubTitle>하나 님은 TMI의 주인이 맞습니다.</SubTitle>
      </VoteResultHeader>
    </Container>
  );
};

export default VoteResult;

const VoteResultHeader = styled(Header)`
  margin-top: 47px;
  gap: 22px;
`;
const ResultText = styled(Title)`
  color: #3e3333;
`;
