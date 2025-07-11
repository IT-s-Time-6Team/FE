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
import useRoomUsersStore from '@store/useRoomUsersStore';
interface TmiModeBoxProps {
  maxCount: number;
  increaseMax: () => void;
  decreaseMax: () => void;
  onCreateRoom: () => void;
}

//키워드 모드 화면
const TmiModeBox = ({ maxCount, increaseMax, decreaseMax, onCreateRoom }: TmiModeBoxProps) => {
  const setRound = useRoomUsersStore((state) => state.setRound);
  return (
    <Box>
      <BoxHeader>
        <BoxTitle>TMI 모드</BoxTitle>
        <TmiBoxSubTitle>
          서로의 TMI를 알아맞추면서
          <br /> 더 친해지는 시간을 가질 수 있어요. 나의 TMI도 살짝 털어놓아 볼까요?
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
      </TmiBoxSelector>
      <BoxComplete
        text='방 생성하기'
        active={maxCount > 1}
        onClick={() => {
          setRound(maxCount);
          onCreateRoom();
        }}
      />
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
