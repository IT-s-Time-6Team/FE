import styled from '@emotion/styled';
interface ForceCloseModalProps {
  onClose: (open: boolean) => void;
}
const ForceCloseModal = ({ onClose }: ForceCloseModalProps) => {
  return (
    <OverLay onClick={() => onClose(false)}>
      <ModalContent>
        정말 종료하시겠어요?
        <ModalDetail>
          힌트 타임이 종료되고 <br />
          다시 TMI 입력 화면으로 돌아갑니다.
        </ModalDetail>
        <Divider />
        <ButtonContainer>
          <Button onClick={() => onClose(false)}>아니요</Button>
          <ButtonDivider />
          <Button onClick={() => onClose(true)} active={true}>
            예
          </Button>
        </ButtonContainer>
      </ModalContent>
    </OverLay>
  );
};
export default ForceCloseModal;
const Button = styled.button<{ active?: boolean }>`
  background-color: transparent;
  border: none;
  color: #3e3333;
  ${({ active }) => active && 'color: #FF7913;'}
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin: 15px 10px;
  &:hover {
    color: #1a1a1a;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const ButtonDivider = styled.div`
  width: 1px;
  height: 20px;
  background-color: #e4e4e4;
  margin: 0 10px;
`;
const OverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: white;
`;
const ModalContent = styled.div`
  background-color: white;
  padding-top: 20px;
  border-radius: 10px;
  width: 258px;
  text-align: center;
  color: black;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
`;
const ModalDetail = styled.div`
  font-size: 14px;
  margin-top: 10px;
  color: #7c7c7c;
`;
const Divider = styled.div`
  height: 1px;
  background-color: #e4e4e4;
  margin-top: 20px;
`;
