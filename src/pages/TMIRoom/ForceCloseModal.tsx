import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { skipTMIHint } from '@api/hintSkip';
import useGameModeStore from '@store/useGameModeStore';
import { discussionSkip } from '@api/discussionSkip';

interface ForceCloseModalProps {
  onClose: (open: boolean) => void;
  roomKey: string;
}

type GameMode = 'TMI' | 'BALANCE';

interface ModeConfig {
  detail: string;
}
const MODE_CONFIG: Record<GameMode, ModeConfig> = {
  TMI: {
    detail: '힌트 타임이 종료되고 \n다시 TMI 입력 화면으로 돌아갑니다.',
  },
  BALANCE: {
    detail: '토론 타임이 종료되고 밸런스\n 투표 화면으로 돌아갑니다.',
  },
};

const ForceCloseModal = ({ onClose }: ForceCloseModalProps) => {
  const navigate = useNavigate();
  const { roomKey } = useParams();
  const gameMode = useGameModeStore((state) => state.gameMode as GameMode);
  const { detail } = MODE_CONFIG[gameMode];

  const handleSkip = async () => {
    try {
      onClose(true);

      let res;
      if (gameMode === 'TMI') {
        res = await skipTMIHint(roomKey as string);
        if (res.code === 200) {
          navigate('/tmi/:roomKey/vote');
        }
      } else if (gameMode === 'BALANCE') {
        res = await discussionSkip(roomKey as string);
        if (res.code === 200) {
          navigate('/balance/:roomKey/vote');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OverLay onClick={() => onClose(false)}>
      <ModalContent>
        정말 종료하시겠어요?
        <ModalDetail>{detail}</ModalDetail>
        <Divider />
        <ButtonContainer>
          <Button onClick={() => onClose(false)}>아니요</Button>
          <ButtonDivider />
          <Button onClick={handleSkip} active={true}>
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
  white-space: pre-line;
  font-size: 14px;
  margin-top: 10px;
  color: #7c7c7c;
`;
const Divider = styled.div`
  height: 1px;
  background-color: #e4e4e4;
  margin-top: 20px;
`;
