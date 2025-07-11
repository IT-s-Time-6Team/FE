import styled from '@emotion/styled';
import Lock from '@assets/Main/lock_icon.svg?react';
import { Container } from '@components/shared/UIStyles';
import { SubTitle, Title } from '@components/shared/TextStyles';

//개발 진행중 모드 화면
const InprogresssModeBox = () => {
  return (
    <InProgressContainer>
      <InprogressContent>
        <Lock />
        <InprogressText>
          <InprogressTitle>모드 개발중!</InprogressTitle>
          <InprogressSubTitle>
            Oki 팀이 열심히 불태우는 중이에요.. 조금만 기다려 주세요!
          </InprogressSubTitle>
        </InprogressText>
      </InprogressContent>
      <Complete>방 생성하기</Complete>
    </InProgressContainer>
  );
};

export default InprogresssModeBox;

const InProgressContainer = styled.div`
  width: 287px;
  border-radius: 18px;
  height: 343px;

  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e4e4e4;
`;
const InprogressContent = styled.div`
  margin: 54px 17px 18px 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InprogressText = styled(Container)`
  width: 171px;
  gap: 8px;
`;
const InprogressTitle = styled(Title)`
  color: #3e3333;
  text-align: center;
`;
const InprogressSubTitle = styled(SubTitle)`
  color: #7c7c7c;
  text-align: center;
  font-size: 12px;
  line-height: 150%;
`;
const Complete = styled.button`
  position: absolute;
  bottom: 18px;

  width: 253px;
  height: 57px;
  border-radius: 14px;
  background: #dadada;
  color: #939393;
  text-align: center;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
