import styled from '@emotion/styled';
import { Title, SubTitle } from '@components/shared/TextStyles';
import { Header, Container } from '@components/shared/UIStyles';
import SettingButton from '@components/Main/SettingButton';
import Button from '@components/chatRoomCreated/LoginButton';

interface TmiModeBoxProps {
  maxCount: number;
  increaseMax: () => void;
  decreaseMax: () => void;
  onCreateRoom: () => void;
}

//키워드 모드 화면
const TmiModeBox = ({ maxCount, increaseMax, decreaseMax, onCreateRoom }: TmiModeBoxProps) => {
  return (
    <KeyWordBox>
      <KeyWordHeader>
        <KeyWordTitle>TMI 모드</KeyWordTitle>
        <KeyWordSubTitle>
          서로의 TMI를 알아맞추면서
          <br /> 더 친해지는 시간을 가질 수 있어요. 나의 TMI도 살짝 털어놓아 볼까요?
        </KeyWordSubTitle>
      </KeyWordHeader>

      <Selector>
        <SettingButton
          label='최대 입장 인원'
          value={maxCount}
          onIncrease={increaseMax}
          onDecrease={decreaseMax}
          isDownActive={maxCount < 3}
          isUpActive={maxCount >= 7}
        />
      </Selector>
      <Complete text='방 생성하기' active={maxCount > 1} onClick={onCreateRoom} />
    </KeyWordBox>
  );
};

export default TmiModeBox;

// 스타일 컴포넌트
const KeyWordBox = styled(Container)`
  width: 287px;
  min-height: 343px;
  gap: 15px;
  border-radius: 18px;
  border: 1px solid #e4e4e4;
`;

const KeyWordHeader = styled(Header)`
  margin: 0 26px;
  gap: 15px;
  border-bottom: 1px solid #e4e4e4;
  text-align: center;
`;

const KeyWordTitle = styled(Title)`
  margin-top: 21px;
`;

const KeyWordSubTitle = styled(SubTitle)`
  padding: 0px 30px;
  margin-bottom: 26px;
  font-size: 12px;
  line-height: 140%;
`;

const Selector = styled(Container)`
  margin-top: 11px;
  gap: 17px;
  min-height: 90px;
`;

const Complete = styled(Button)`
  position: absolute;
  bottom: 18px;

  width: 253px;
  height: 57px;
`;
