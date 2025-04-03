import styled from '@emotion/styled';
import { Container, Header } from '@components/shared/UIStyles';
import { SubTitle } from '@components/shared/TextStyles';
import Button from '@components/chatRoomExit/Button';

import OkiLogoIcon from '@assets/icons/oki_logo.svg?react';
import Bubble from '@assets/icons/buble_icon.svg?react';
import Exclamation from '@assets/icons/exclamation_icon.svg?react';
import ReverseBubble from '@assets/icons/reversbubble_icon.svg?react';
import Heart from '@assets/icons/heart_icon.svg?react';
import Rabbit from '@assets/icons/rabbit_icon.svg?react';
import Chick from '@assets/icons/chick_icon.svg?react';
import Turtle from '@assets/icons/turtle_icon.svg?react';
import Bear from '@assets/icons/bear_icon.svg?react';
import Panda from '@assets/icons/panda_icon.svg?react';
import Pig from '@assets/icons/pig_icon.svg?react';
import Fox from '@assets/icons/fox_icon.svg?react';

const OnBoardingPage = () => {
  return (
    <OnBoardingContainer>
      <OnBoardingHeader>
        <OkiLogo />
        <HeaderSubTitle>너와 내가 통하는 바로 그 순간</HeaderSubTitle>
      </OnBoardingHeader>

      <MainContainer>
        <BubbleWrapper>
          <BubbleIcon />
          <ExclamationIcon />
        </BubbleWrapper>
        <RabbitIcon />
        <ChickIcon />
        <TurtleIcon />
        <BearIcon />
        <PandaIcon />
        <PigIcon />
        <FoxIcon />
        <ReverseBubbleWrapper>
          <ReverseBubbleIcon />
          <HeartIcon />
        </ReverseBubbleWrapper>
      </MainContainer>

      <Button text={'시작하기'} />
    </OnBoardingContainer>
  );
};

export default OnBoardingPage;

const OnBoardingContainer = styled(Container)`
  margin: 130px 43px 0 43px;

  gap: 94px;
  align-self: stretch;
`;

const OnBoardingHeader = styled(Header)`
  gap: 10px;
`;

const OkiLogo = styled(OkiLogoIcon)`
  width: 156px;
  height: 62px;
`;
const HeaderSubTitle = styled(SubTitle)`
  line-height: 140%;
`;

const MainContainer = styled.div`
  position: relative;
  width: 304px;
`;
const BubbleWrapper = styled.div`
  position: absolute;
  top: 55px;
  left: 6px;
`;
const BubbleIcon = styled(Bubble)`
  display: block;
`;
const ExclamationIcon = styled(Exclamation)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const RabbitIcon = styled(Rabbit)`
  position: absolute;
  left: 81px;
`;
const ChickIcon = styled(Chick)`
  position: absolute;
  top: 52px;
  left: 191px;
`;
const TurtleIcon = styled(Turtle)`
  position: absolute;
  top: 127px;
`;
const BearIcon = styled(Bear)`
  position: absolute;
  top: 131px;
  left: 114px;
`;
const PandaIcon = styled(Panda)`
  position: absolute;
  top: 135px;
  left: 210px;
`;
const PigIcon = styled(Pig)`
  position: absolute;
  top: 211px;
  left: 41px;
`;
const FoxIcon = styled(Fox)`
  position: absolute;
  top: 211px;
  left: 133px;
`;
const ReverseBubbleWrapper = styled.div`
  position: absolute;
  top: 228px;
  left: 254px;
`;
const ReverseBubbleIcon = styled(ReverseBubble)`
  display: block;
`;
const HeartIcon = styled(Heart)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
