import styled from '@emotion/styled';
import { QRCodeCanvas } from 'qrcode.react';
import Button from '@components/chatRoomCreated/Button';

const ChatRoomCreatedPage = () => {
  const roomId = '1234';
  const chatRoomUrl = `${roomId}`;

  return (
    <ChatRoomCreatedContainer>
      <ChatRoomCreatedHeader>
        <Title>채팅룸이 생성되었어요!</Title>
        <SubTitle>qr 코드를 공유해 재미있는 이야기를 나눠 보세요.</SubTitle>
      </ChatRoomCreatedHeader>

      <QRCodeWrapper>
        <QRCodeCanvas
          value={chatRoomUrl}
          size={150}
          bgColor='#ffffff'
          fgColor='#000000'
          level='H'
        />
        <QRActionGroup>
          <QRActionItem>
            <ActionIcon />
            다시 생성
          </QRActionItem>
          <QRActionItem>
            <ActionIcon />
            저장
          </QRActionItem>
        </QRActionGroup>

        <QRText>초대 링크</QRText>
        <QRSubText>링크를 클릭하여 복사할 수 있어요</QRSubText>
        <QRLine />
      </QRCodeWrapper>

      <LoginContainer>
        <LoginForm>
          <InputContainer>
            <InputLabel>
              닉네임
              <NicknameInput
                type='text'
                name='nickname'
                placeholder='채팅방에서 사용할 닉네임을 입력해주세요'
                autoComplete='on'
                required
              />
            </InputLabel>
            <NicknameText>특수문자, 이모티콘 제외 1글자 이상</NicknameText>
          </InputContainer>

          <InputContainer>
            <InputLabel>
              비밀번호
              <PasswordInput
                type='password'
                name='password'
                placeholder='채팅방에서 사용할 비밀번호를 입력해 주세요.'
                autoComplete='current-password'
                required
              />
            </InputLabel>
            <PasswordText>영문 소문자, 특수문자 포함(../.)6글자</PasswordText>
          </InputContainer>

          <ButtonText>*닉네임과 비밀번호는 이번 채팅방에서만 사용돼요.</ButtonText>   
          <button />
        </LoginForm>
      </LoginContainer>
      <Button text='입장하기'/>
    </ChatRoomCreatedContainer>
  );
};

export default ChatRoomCreatedPage;
const ChatRoomCreatedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 30px;
  gap: 20px;
`;
const ChatRoomCreatedHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 5px;
`;
const Title = styled.h2`
  color: #3e3333;
  text-align: center;

  font-size: 20px;
  font-weight: 600;
`;
const SubTitle = styled.p`
  color: #7c7c7c;

  font-size: 14px;
  font-weight: 500;
`;

const QRCodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 5px;
`;
const QRActionGroup = styled.div`
  display: flex;
  flex-direction: row;

  margin: 10px 0;
  gap: 15px;
`;
const QRActionItem = styled.div`
  display: flex;
  flex-direction: row;

  gap: 5px;

  color: #7c7c7c;
  font-size: 12px;
  font-weight: 500;
`;
const ActionIcon = styled.span`
  width: 18px;
  height: 18px;

  display: inline-block;

  background-color: #d9d9d9;
`;
const QRText = styled.p`
  color: #3e3333;
  text-align: center;

  font-size: 14px;
  font-weight: 500;
`;
const QRSubText = styled.p`
  color: #b7b7b7;

  font-size: 12px;
  font-weight: 500;

  margin-bottom: 25px;
`;

const QRLine = styled.hr`
  width: 235px;
  margin-bottom: 20px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const InputContainer = styled.div``;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;

  color: #3e3333;
  font-size: 16px;
  font-weight: 600;
`;
const NicknameInput = styled.input`
  margin-bottom: 12px;
  padding-bottom: 15px;

  border: none;
  border-bottom: 1px solid #f0f0f0;
  outline: none;

  &::placeholder {
    color: #b7b7b7;
    font-size: 12px;
    font-weight: 500;
  }
`;

const NicknameText = styled.p`
  color: #b7b7b7;
  font-size: 10px;
  font-weight: 500;
`;

const PasswordInput = styled(NicknameInput)``;
const PasswordText = styled(NicknameText)``;
const ButtonText = styled.p`
  padding-Top:30px;
  
  color: #B7B7B7;
  font-size: 10px;
  font-weight: 500;
  `;


