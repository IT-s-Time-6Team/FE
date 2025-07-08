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

interface BalanceModeBoxProps {
  maxCount: number;
  increaseMax: () => void;
  decreaseMax: () => void;
  problemCount: number;
  increaseProblem: () => void;
  decreaseProblem: () => void;
  onCreateRoom: () => void;
}

//키워드 모드 화면
const BalanceModeBox = ({
  maxCount,
  increaseMax,
  decreaseMax,
  problemCount,
  increaseProblem,
  decreaseProblem,
  onCreateRoom,
}: BalanceModeBoxProps) => {
  return (
    <Box>
      <BoxHeader>
        <BoxTitle>밸런스 모드</BoxTitle>
        <BalanceBoxSubTitle>
          A or B!
          <br />
          서로 이야기를 나눈 후 어느 선택지가 <br />
          사람이 더 많을지 예측해보세요
        </BalanceBoxSubTitle>
      </BoxHeader>

      <BalanceBoxSelector>
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
          unit='개'
          onIncrease={increaseProblem}
          onDecrease={decreaseProblem}
          isDownActive={problemCount < 3}
          isUpActive={problemCount >= 7}
        />
      </BalanceBoxSelector>
      <BoxComplete text='방 생성하기' active={maxCount > 1} onClick={onCreateRoom} />
    </Box>
  );
};

export default BalanceModeBox;

const BalanceBoxSubTitle = styled(BoxSubTitle)`
  padding: 0px 30px;
  margin-bottom: 26px;
  font-size: 12px;
  line-height: 140%;
`;

const BalanceBoxSelector = styled(BoxSelector)`
  margin-top: 9px;
  gap: 17px;
  min-height: 90px;
`;
