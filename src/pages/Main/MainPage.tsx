import styled from '@emotion/styled';
import { useState } from 'react';
import { Container, Header } from '@components/shared/UIStyles';
import Logo from '@assets/okii_log.svg?react';
import DLogo from '@assets/Main/development_icon.svg?react';
import MainIcon from '@assets/Main/main_icon_group.svg?react';
import ChevronLeftIcon from '@assets/Main/chevronleft_icon.svg?react';
import ChevronRightIcon from '@assets/Main/chevronright_icon.svg?react';
import KeywordModeBox from '@components/Main/KeyWordMode';
import TmiModeBox from '@components/Main/TmiMode';
import InprogresssModeBox from '@components/Main/InProgressMode';

import { useNavigate } from 'react-router-dom';
import { createRoom } from '@api/chatRoomCreated';

const MainPage = () => {
  const navigate = useNavigate();

  const MIN = 2;
  const MAX = 7;
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

  const [activeMode, setActiveMode] = useState(0);

  const handleCreateRoom = async () => {
    try {
      const res = await createRoom({
        requiredAgreements: empathyCount,
        maxMember: maxCount,
        durationMinutes: timeLimit === 0 ? 30 : timeLimit,
        gameMode: activeMode === 1 ? 'TMI' : activeMode === 2 ? 'INPROGRESS' : 'NORMAL',
      });

      console.log('방 생성 성공:', res);
      navigate(`/rooms/${res.data.roomKey}/member`);
    } catch (err: unknown) {
      console.error('방 생성 실패:', err);
      alert('방 생성에 실패했습니다.');
    }
  };

  return (
    <MainContainer>
      <MainHeader>
        <Logo />
        <IconStyle $visible={activeMode !== 2}>
          <MainIcon />
        </IconStyle>
        <IconStyle $visible={activeMode === 2}>
          <DevelopmentLogo />
        </IconStyle>
      </MainHeader>

      <ModeContainer>
        <ChevronLeft
          $isLeftActive={activeMode === 0}
          onClick={() => {
            if (activeMode > 0) {
              setActiveMode(activeMode - 1);
              setEmpathyCount(2);
              setMaxCount(2);
              setTimeLimit(0);
            }
          }}
        />
        <SliderWrapper>
          <SlideInner $activeIndex={activeMode}>
            <SlideBox>
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
                onCreateRoom={handleCreateRoom}
              />
            </SlideBox>
            <SlideBox>
              {/* 두 번째 슬라이드: TMI 모드 */}
              <TmiModeBox
                maxCount={maxCount}
                increaseMax={increaseMax}
                decreaseMax={decreaseMax}
                onCreateRoom={handleCreateRoom}
              />
            </SlideBox>

            <SlideBox>
              <InprogresssModeBox />
            </SlideBox>
          </SlideInner>
        </SliderWrapper>

        <ChevronRight
          $isRightActive={activeMode === 2}
          onClick={() => {
            if (activeMode < 2) {
              setActiveMode(activeMode + 1);
              setEmpathyCount(2);
              setMaxCount(2);
              setTimeLimit(0);
            }
          }}
        />
      </ModeContainer>

      <Footer>버전 정보 v1.0.0</Footer>
    </MainContainer>
  );
};
export default MainPage;

const MainContainer = styled(Container)`
  padding-top: 6dvh;
`;

const MainHeader = styled(Header)`
  gap: 33px;
  position: relative;
`;
const ModeContainer = styled(Container)`
  flex-direction: row;
  min-height: 343px;
`;

const IconStyle = styled.div<{ $visible: boolean }>`
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: none;
`;
const DevelopmentLogo = styled(DLogo)`
  position: absolute;
  top: 110px;
  left: 0;
`;

//슬라이드 효과
const SliderWrapper = styled.div`
  width: 287px;
  height: 343px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
`;
const SlideInner = styled.div<{ $activeIndex: number }>`
  display: flex;
  width: 300%;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${({ $activeIndex }) => `-${($activeIndex * 100) / 3}%`});
`;
const SlideBox = styled.div`
  width: 287px;
  height: 343px;
  flex-shrink: 0;
`;

const ChevronLeft = styled(ChevronLeftIcon, {
  shouldForwardProp: (prop) => prop !== '$isLeftActive',
})<{ $isLeftActive: boolean }>`
  margin: 5px;

  path {
    fill: ${({ $isLeftActive }) => ($isLeftActive ? '#F6F6F6' : '#DADADA')};
    transition: fill 0.2s ease;
  }
  cursor: ${({ $isLeftActive }) => ($isLeftActive ? 'default' : 'pointer')};
`;
const ChevronRight = styled(ChevronRightIcon, {
  shouldForwardProp: (prop) => prop !== '$isRightActive',
})<{ $isRightActive: boolean }>`
  margin: 5px;

  path {
    fill: ${({ $isRightActive }) => ($isRightActive ? '#F6F6F6' : '#DADADA')};
    transition: fill 0.2s ease;
  }
  cursor: ${({ $isRightActive }) => ($isRightActive ? 'default' : 'pointer')};
`;
const Footer = styled.p`
  color: #a0a0a0;
  font-size: 10px;
  line-height: 150%;
  margin-top: 10px;
`;
