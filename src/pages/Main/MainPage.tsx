import styled from '@emotion/styled';
import { Container, Header } from '@components/shared/UIStyles';
import { Title, SubTitle } from '@components/shared/TextStyles';
import Logo from '@assets/oki_log.svg?react';
import MainIcon from '@assets/main_icon_group.svg?react';

const MainPage = () => {
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
            <EmpathySelector>
              <People>공감 기준 인원</People>
              <Counter>2명</Counter>
            </EmpathySelector>
            <MaxParticipantsSelector>
              <People>최대 입장 인원</People>
              <Counter>2명</Counter>
            </MaxParticipantsSelector>
            <TimeLimitSelector>
              <People>시간 제한</People>
              <Counter>없음</Counter>
            </TimeLimitSelector>
          </Selector>
        </KeyWordBox>
      </KeyWordMode>

      <div></div>
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
  gap: 17px;
`;
const EmpathySelector = styled.div`
  width: 220px;
  margin-right: 15px;

  display: flex;
  flex-direction: row;
  gap: 53px;
`;
const MaxParticipantsSelector = styled(EmpathySelector)``;
const TimeLimitSelector = styled(EmpathySelector)``;

const People = styled(Title)`
  width: 80px;
  font-size: 14px;
  line-height: 140%;
`;
const Counter = styled(SubTitle)`
  color: #3e3333;
  line-height: 140%;
`;
