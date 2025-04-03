import styled from '@emotion/styled';
import { Container, Header } from '@components/shared/UIStyles';
import { SubTitle } from '@components/shared/TextStyles';
import Button from '@components/chatRoomExit/Button';

import OkiLogoIcon from '@assets/icons/oki_logo.svg?react';

const OnBoardingPage = () => {
  return (
    <OnBoardingContainer>
      <OnBoardingHeader>
        <OkiLogo/>
        <HeaderSubTitle>너와 내가 통하는 바로 그 순간</HeaderSubTitle>
      </OnBoardingHeader>
      <div>

      </div>

      <Button text={'시작하기'}/>
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

const OkiLogo = styled (OkiLogoIcon)`
  width: 156px;
  height: 62px;
`
const HeaderSubTitle =styled(SubTitle)`
  line-height: 140%;
  
`