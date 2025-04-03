import styled from '@emotion/styled';
import { Container, Header } from '@components/shared/UIStyles';

import OkiLogo from '@assets/icons/oki_logo.svg?react';

const OnBoardingPage = () => {
  return (
    <OnBoardingContainer>
      <OnBoardingHeader>
        <OkiLogo />
      </OnBoardingHeader>
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
