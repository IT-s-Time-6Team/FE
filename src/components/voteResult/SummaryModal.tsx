import styled from '@emotion/styled';
import { Mask, ModalBody } from '@components/shared/ModalStyles';
import { SubTitle } from '@components/shared/TextStyles';
import { Header } from '@components/shared/UIStyles';
import { CharacterMap, CharacterKey } from '@components/shared/CharacterMap';

interface SummaryModalProps {
  onClose: () => void;
  correctAnswer: string;
  tmiContent: string;
  character: string;
}

const SummaryModal = ({ onClose, correctAnswer, tmiContent, character }: SummaryModalProps) => {
  const charKey = character.toUpperCase() as CharacterKey;
  const characterImg = CharacterMap[charKey];
  return (
    <Mask onClick={onClose}>
      <ModalBoddy>
        <ModalTitle>정답은 {correctAnswer} 님이었습니다.</ModalTitle>
        <MainContainer>
          <CharacterImg src={characterImg} />
          <Divider />
          <TmiText>{tmiContent}</TmiText>
        </MainContainer>
      </ModalBoddy>
    </Mask>
  );
};

export default SummaryModal;

const ModalBoddy = styled(ModalBody)`
  width: 258px;
  height: 282px;
  padding: 25px 34px;
  justify-content: flex-start;
  top: 32%;
  left: 50%;
`;
const ModalTitle = styled.p`
  color: #3e3333;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;
const MainContainer = styled(Header)`
  margin-top: 20px;
  gap: 0px;
`;
const Divider = styled.div`
  margin-top: 22px;
  width: 46.5px;
  border: 1px solid #f0f0f0;
`;

const CharacterImg = styled.img`
  width: 117.445px;
  height: 117px;
`;
const TmiText = styled(SubTitle)`
  padding-top: 14px;
  width: 100%;
  text-align: center;
  font-weight: 600;
  line-height: 140%;
`;
