import styled from '@emotion/styled';
import SettingButton from '@components/Main/SettingButton';

import {
  Box,
  BoxHeader,
  BoxTitle,
  BoxSubTitle,
  BoxSelector,
  BoxComplete,
} from '@components/shared/ModeBox';

interface TmiModeBoxProps {
  maxCount: number;
  increaseMax: () => void;
  decreaseMax: () => void;
  problemCount: number;
  increaseProblem: () => void;
  decreaseProblem: () => void;
  onCreateRoom: () => void;
}

//키워드 모드 화면
const TmiModeBox = ({
  maxCount,
  increaseMax,
  decreaseMax,
  problemCount,
  increaseProblem,
  decreaseProblem,
  onCreateRoom,
}: TmiModeBoxProps) => {
  return (
    <Box>
      <BoxHeader>
        <BoxTitle>밸런스 모드</BoxTitle>
        <TmiBoxSubTitle>
          A or B!
          <br />
          서로 이야기를 나눈 후 어느 선택지가 <br />
          사람이 더 많을지 예측해보세요
        </TmiBoxSubTitle>
      </BoxHeader>

      <TmiBoxSelector>
        <SettingButton
          label='최대 입장 인원'
          value={maxCount}
          onIncrease={increaseMax}
          onDecrease={decreaseMax}
          isDownActive={maxCount < 3}
          isUpActive={maxCount >= 7}
        />
        <SettingButton
          label='밸런스 문제 개수'
          value={problemCount}
          onIncrease={increaseProblem}
          onDecrease={decreaseProblem}
          isDownActive={problemCount < 3}
          isUpActive={problemCount >= 7}
        />
      </TmiBoxSelector>
      <BoxComplete text='방 생성하기' active={maxCount > 1} onClick={onCreateRoom} />
    </Box>
  );
};

export default TmiModeBox;

const TmiBoxSubTitle = styled(BoxSubTitle)`
  padding: 0px 30px;
  margin-bottom: 26px;
  font-size: 12px;
  line-height: 140%;
`;

const TmiBoxSelector = styled(BoxSelector)`
  margin-top: 9px;
  gap: 17px;
  min-height: 90px;
`;
