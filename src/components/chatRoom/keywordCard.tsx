import styled from '@emotion/styled';
import { Title, SubTitle } from '@components/shared/TextStyles';
type KeywordCardProps = {
  title: string;
  question: string;
};

const KeywordCard = ({ title, question }: KeywordCardProps) => {
  return (
    <KeywordBody>
      <Title>{title}</Title>
      <KeywordSubTitle>{question}</KeywordSubTitle>
    </KeywordBody>
  );
};
export default KeywordCard;
const KeywordBody = styled.div`
  width: 268px;
  height: 282px;
  align-items: center;
  padding: 34px 29px;
  padding-bottom: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const KeywordSubTitle = styled(SubTitle)`
  text-align: center;
  line-height: 140%;
`;
