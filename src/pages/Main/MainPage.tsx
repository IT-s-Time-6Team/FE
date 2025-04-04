import styled from '@emotion/styled';
import { Container, Header } from '@components/shared/UIStyles';
import Logo from '@assets/oki_log.svg?react';
import MainIcon from '@assets/main_icon_group.svg?react';

const MainPage = () => {
  return (
    <MainContainer>
      <MainHeader>
        <Logo />
        <MainIcon />
      </MainHeader>
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
