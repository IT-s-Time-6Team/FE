import styled from '@emotion/styled';
import { useState } from 'react';
import { Container, Header } from '@components/shared/UIStyles';
import { Title, SubTitle } from '@components/shared/TextStyles';
import Button from '@components/chatRoomCreated/LoginButton';
import SettingButton from '@components/Main/SettingButton';
import Logo from '@assets/oki_log.svg?react';
import MainIcon from '@assets/main_icon_group.svg?react';

const MainPage = () => {
  const MIN = 2;
  const MAX = 20;
  const [empathyCount, setEmpathyCount] = useState(2);
  const [maxCount, setMaxCount] = useState(2);

  const increaseEmpathy = () => {
    if (empathyCount < MAX) {
      const newCount = empathyCount + 1;
      setEmpathyCount(newCount);
      if (newCount > maxCount) setMaxCount(newCount);
    }
  };

  const decreaseEmpathy = () => {
    if (empathyCount > MIN) setEmpathyCount(empathyCount - 1);
  };

  const increaseMax = () => {
    if (maxCount < MAX) setMaxCount(maxCount + 1);
  };

  const decreaseMax = () => {
    if (maxCount > empathyCount) setMaxCount(maxCount - 1);
  };

  const getTimeStep = (minutes: number) => {
    if (minutes < 10) return 5;
    if (minutes < 60) return 10;
    return 30;
  };

  const MAX_MINUTES = 360;
  const [timeLimit, setTimeLimit] = useState(0);

  const increaseTime = () => {
    const step = getTimeStep(timeLimit);
    const newTime = Math.min(timeLimit + step, MAX_MINUTES);
    setTimeLimit(newTime);
  };

  const decreaseTime = () => {
    const step = getTimeStep(timeLimit);
    const newTime = Math.max(timeLimit - step, 0);
    setTimeLimit(newTime);
  };

  return (
    <MainContainer>
      <MainHeader>
        <Logo />
        <MainIcon />
      </MainHeader>

      <KeyWordMode>
        <KeyWordBox>
          <KeyWordHeader>
            <KeyWordTitle>키워드 모드</KeyWordTitle>
            <KeyWordSubTitle>
              입력한 키워드를 설정한 인원 이상이 작성하면 해당 키워드가 모두에게 공개되는
              모드입니다.사람들과 겹치는 취향을 찾아보세요!
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
          <Complete text={'방 생성하기'} active={timeLimit > 0} />
        </KeyWordBox>
      </KeyWordMode>

      <Footer>버전 정보</Footer>
    </MainContainer>
  );
};
export default MainPage;

const MainContainer = styled(Container)`
  margin: 95px 22px 73px 22px;
  gap: 33px;
`;

const MainHeader = styled(Header)`
  gap: 33px;
`;
const KeyWordMode = styled(Container)`
  width: 347px;
  height: 343px;

  position: relative;
`;
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
const Footer = styled.p`
  color: #a0a0a0;
  font-size: 10px;
  line-height: 150%;
  margin-top: -18px;
`;
