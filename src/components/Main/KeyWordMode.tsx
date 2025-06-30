import SettingButton from '@components/Main/SettingButton';
import {
  Box,
  BoxHeader,
  BoxTitle,
  BoxSubTitle,
  BoxSelector,
  BoxComplete,
} from '@components/shared/ModeBox';

interface KeywordModeBoxProps {
  empathyCount: number;
  maxCount: number;
  timeLimit: number;
  increaseEmpathy: () => void;
  decreaseEmpathy: () => void;
  increaseMax: () => void;
  decreaseMax: () => void;
  increaseTime: () => void;
  decreaseTime: () => void;
  onCreateRoom: () => void;
}

//키워드 모드 화면
const KeywordModeBox = ({
  empathyCount,
  maxCount,
  timeLimit,
  increaseEmpathy,
  decreaseEmpathy,
  increaseMax,
  decreaseMax,
  increaseTime,
  decreaseTime,
  onCreateRoom,
}: KeywordModeBoxProps) => {
  return (
    <Box>
      <BoxHeader>
        <BoxTitle>공감 키워드 찾기</BoxTitle>
        <BoxSubTitle>사람들과의 공통 관심사를 찾아 더 재미있는 대화를 시작하세요!</BoxSubTitle>
      </BoxHeader>

      <BoxSelector>
        <SettingButton
          label='공감 기준 인원'
          value={empathyCount}
          onIncrease={increaseEmpathy}
          onDecrease={decreaseEmpathy}
          isDownActive={empathyCount < 3}
          isUpActive={empathyCount >= 7}
        />
        <SettingButton
          label='최대 입장 인원'
          value={maxCount}
          onIncrease={increaseMax}
          onDecrease={decreaseMax}
          isDownActive={maxCount < 3}
          isUpActive={maxCount >= 7}
        />
        <SettingButton
          label='시간 제한'
          value={timeLimit}
          unit='분'
          onIncrease={increaseTime}
          onDecrease={decreaseTime}
          isDownActive={timeLimit <= 0}
          isUpActive={timeLimit >= 360}
        />
      </BoxSelector>

      <BoxComplete text='방 생성하기' active={timeLimit > 0} onClick={onCreateRoom} />
    </Box>
  );
};

export default KeywordModeBox;
