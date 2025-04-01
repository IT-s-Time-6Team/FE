import styled from '@emotion/styled';
interface SummaryModalProps {
  onClose: () => void;
}

const SummaryModal = ({ onClose }: SummaryModalProps) => {
  return (
    <>
      <Mask onClick={onClose} />
      <ModalBody>
        <ProfileContainer>
          <ProfileImage />
          <ProfileTextContainer>
            <Label>이름</Label>
            <Name>하나</Name>
          </ProfileTextContainer>
        </ProfileContainer>
        <Divider />
        <InfoContainer>
          <KeywordContainer>
            <Label>공감한 키워드</Label>
            <KeywordList>
              <KeywordWrapper>
                <Keyword>#LOL</Keyword>
                <Keyword>#애니</Keyword>
              </KeywordWrapper>
              <MoreKeywords>+3</MoreKeywords>
            </KeywordList>
          </KeywordContainer>
          <KeywordContainer>
            <Label>총 대화시간</Label>
            <Keyword>30분 12초</Keyword>
          </KeywordContainer>
          <KeywordContainer>
            <Label>가장 많은 키워드를 작성한 사람</Label>
            <Keyword>1위: 하나(3개)</Keyword>
          </KeywordContainer>
          <KeywordContainer>
            <Label>취미가 가장 많이 겹친 사람</Label>
            <Keyword>1위: 하나(2개)</Keyword>
          </KeywordContainer>
        </InfoContainer>
        <SaveInstruction>이미지를 꾹 눌러 저장해 보세요.</SaveInstruction>
      </ModalBody>
    </>
  );
};
export default SummaryModal;
const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;
const ModalBody = styled.div`
  width: 303px;
  height: 383px;
  border-radius: 12px;
  background: #fff;
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 36px 23px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ProfileContainer = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;

const ProfileImage = styled.div`
  width: 51px;
  height: 51px;
  background-color: #d9d9d9;
  border-radius: 8px;
`;

const ProfileTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.p`
  font-size: 14px;
  color: #7c7c7c;
  font-weight: 500;
`;

const Name = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
const KeywordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const KeywordList = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const KeywordWrapper = styled.div`
  display: flex;
  gap: 11px;
  align-items: center;
  max-width: 215px;
`;

const Keyword = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const MoreKeywords = styled.div`
  width: 29px;
  height: 21px;
  background-color: #f0f0f0;
  border-radius: 3px;
  box-sizing: border-box;
  color: #7c7c7c;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Divider = styled.div`
  width: 257px;
  height: 1px;
  background-color: #f0f0f0;
`;
const SaveInstruction = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: white;
  position: absolute;
  bottom: -28px;
  left: 64px;
`;
