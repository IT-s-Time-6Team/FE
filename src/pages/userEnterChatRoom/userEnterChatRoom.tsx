import styled from '@emotion/styled';
import { Container, Header } from '@components/shared/UIStyles';
import { Title, SubTitle } from '@components/shared/TextStyles';

const UserEnterChatRoom = () => {
  return (
    <UserEnterContainer>
      <UserEnterHeader>
        <TitleText>키워드를 입력하러 가 볼까요</TitleText>
        <SubTitleText>사용할 닉네임과 비밀번호를 입력해주세요</SubTitleText>
      </UserEnterHeader>
    </UserEnterContainer>
  );
};

export default UserEnterChatRoom;

const UserEnterContainer = styled(Container)`
  margin-top: 97px;
  gap: 59px;
`;
const UserEnterHeader = styled(Header)``;
const TitleText = styled(Title)`
  color: #3e3333;
  text-align: center;
`;
const SubTitleText = styled(SubTitle)`
  color: #7c7c7c;
`;
