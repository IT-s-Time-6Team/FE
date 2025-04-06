import styled from '@emotion/styled';
import { useState } from 'react';
import { Container, Header } from '@components/shared/UIStyles';
import Logo from '@assets/oki_log.svg?react';
import MainIcon from '@assets/main_icon_group.svg?react';
import ChevronLeftIcon from '@assets/chevronleft_icon.svg?react';
import ChevronRightIcon from '@assets/chevronright_icon.svg?react';
import KeywordModeBox from '@components/Main/KeyWordMode';

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

      <ModeContainer>
        <ChevronLeft />
        <KeywordModeBox
          empathyCount={empathyCount}
          maxCount={maxCount}
          timeLimit={timeLimit}
          increaseEmpathy={increaseEmpathy}
          decreaseEmpathy={decreaseEmpathy}
          increaseMax={increaseMax}
          decreaseMax={decreaseMax}
          increaseTime={increaseTime}
          decreaseTime={decreaseTime}
        />
        <ChevronRight />
      </ModeContainer>

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
const ModeContainer = styled(Container)`
  position: relative;
  width: 347px;
  height: 343px;

  flex-direction: row;
`;
const ChevronLeft = styled(ChevronLeftIcon)`
  width: 28px;
  height: 28px;
  margin: 5px;
`;
const ChevronRight = styled(ChevronRightIcon)`
  width: 28px;
  height: 28px;
  margin: 5px;
`;
const Footer = styled.p`
  color: #a0a0a0;
  font-size: 10px;
  line-height: 150%;
  margin-top: -18px;
`;
