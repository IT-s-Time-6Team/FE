import styled from '@emotion/styled';
import { ModalBody } from '@components/shared/ModalStyles';
import { Title, SubTitle } from '@components/shared/TextStyles';
const KeywordCard = () => {
  return (
    <KeywordModalBody>
      <Title>#LOL</Title>
      <KeywordSubTitle>Q. 롤에서 맞라인으로 나왔을 때 가장 싫은 챔피언은?</KeywordSubTitle>
    </KeywordModalBody>
  );
};
export default KeywordCard;
const KeywordModalBody = styled(ModalBody)`
  width: 268px;
  height: 282px;
  align-items: center;
  padding: 34px 29px;
  padding-bottom: 90px;
`;
const KeywordSubTitle = styled(SubTitle)`
  text-align: center;
  line-height: 140%;
`;
