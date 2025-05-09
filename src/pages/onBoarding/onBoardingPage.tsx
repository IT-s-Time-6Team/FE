import styled from '@emotion/styled';
import { Container, Header } from '@components/shared/UIStyles';
import { SubTitle } from '@components/shared/TextStyles';
import Button from '@components/chatRoomExit/Button';
import OkiLogoIcon from '@assets/oki_log.svg?react';
import Icons from '@assets/icon_group.svg?react';
import { useNavigate } from 'react-router-dom';

const OnBoardingPage = () => {
  const navigate = useNavigate();

  return (
    <OnBoardingContainer>
      <OnBoardingHeader>
        <OkiLogo />
        <HeaderSubTitle>너와 내가 통하는 바로 그 순간</HeaderSubTitle>
      </OnBoardingHeader>

      <MainContainer>
        <IconGroup />
      </MainContainer>

      <Button text={'시작하기'} onClick={() => navigate('/rooms')} />
    </OnBoardingContainer>
  );
};
export default OnBoardingPage;

const OnBoardingContainer = styled(Container)`
  margin: 130px 43px 0 43px;
  gap: 94px;
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
  height: 360px;
`;
const IconGroup = styled(Icons)`
  position: absolute;
`;
