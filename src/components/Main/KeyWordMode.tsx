import styled from '@emotion/styled';
import { Title, SubTitle } from '@components/shared/TextStyles';
import { Header, Container } from '@components/shared/UIStyles';
import SettingButton from '@components/Main/SettingButton';
import Button from '@components/chatRoomCreated/LoginButton';

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
    <KeyWordBox>
      <KeyWordHeader>
        <KeyWordTitle>키워드 모드</KeyWordTitle>
        <KeyWordSubTitle>
          입력한 키워드를 설정한 인원 이상이 작성하면 해당 키워드가 모두에게 공개되는 모드입니다.
          사람들과 겹치는 취향을 찾아보세요!
        </KeyWordSubTitle>
      </KeyWordHeader>

      <Selector>
        <SettingButton
          label='공감 기준 인원'
          value={empathyCount}
          onIncrease={increaseEmpathy}
          onDecrease={decreaseEmpathy}
          isDownActive={empathyCount < 3}
          isUpActive={empathyCount >= 20}
        />
        <SettingButton
          label='최대 입장 인원'
          value={maxCount}
          onIncrease={increaseMax}
          onDecrease={decreaseMax}
          isDownActive={maxCount < 3}
          isUpActive={maxCount >= 20}
        />
        <SettingButton
          label='시간 제한'
          value={timeLimit}
          unit='분'
          onIncrease={increaseTime}
          onDecrease={decreaseTime}
          isDownActive={timeLimit <= 0}
          isUpActive={timeLimit > 360}
        />
      </Selector>

      <Complete text='방 생성하기' active={timeLimit > 0} onClick={onCreateRoom} />
    </KeyWordBox>
  );
};

export default KeywordModeBox;

// 스타일 컴포넌트
const KeyWordBox = styled(Container)`
  width: 287px;
  height: 343px;
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
  margin-bottom: 15px;
  font-size: 12px;
  line-height: 140%;
`;

const Selector = styled(Container)`
  margin-top: 9px;
  gap: 17px;
`;

const Complete = styled(Button)`
  position: absolute;
  bottom: 18px;
`;
