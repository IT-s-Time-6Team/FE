import styled from '@emotion/styled';
import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

import RedCircle from '@assets/RedCircle.svg?react';
import GreenCirle from '@assets/GreenCircle.svg?react';
import XMark from '@assets/XMark.svg?react';
import Check from '@assets/WhiteCheck.svg?react';
import Button from '@components/chatRoomCreated/Button';


const ChatRoomCreatedPage = () => {
  const roomId = '1234';
  const chatRoomUrl = `${roomId}`;

  const [qrValue, setQrValue] = useState(chatRoomUrl);
  const qrRef = useRef<HTMLCanvasElement | null>(null);

  const handleGenerateQR = () => {
    setQrValue(`${chatRoomUrl}?t=${Date.now()}`);
  };

  const handleDownloadQR = () => {
    const canvas = qrRef.current;
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'QRcode.png';
    link.click();
  };

  const handleCopyLink = async () => {
    try {
      const url = qrValue;
      await navigator.clipboard.writeText(url);
      alert('링크가 복사되었습니다!');
    } catch {
      alert('복사에 실패했어요');
    }
  };

  return (
    <ChatRoomCreatedContainer>
      <ChatRoomCreatedHeader>
        <Title>채팅룸이 생성되었어요!</Title>
        <SubTitle>qr 코드를 공유해 재미있는 이야기를 나눠 보세요.</SubTitle>
      </ChatRoomCreatedHeader>

      <QRCodeWrapper>
        <QRCodeCanvas
          ref={qrRef}
          value={qrValue}
          size={150}
          bgColor='#ffffff'
          fgColor='#000000'
          level='H'
        />
        <QRActionGroup>
          <QRActionItem onClick={handleGenerateQR}>
            <ActionIcon />
            다시 생성
          </QRActionItem>
          <QRActionItem onClick={handleDownloadQR}>
            <ActionIcon />
            저장
          </QRActionItem>
        </QRActionGroup>

        <QRText onClick={handleCopyLink}>초대 링크</QRText>
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
                placeholder='채팅방에서 사용할 닉네임을 입력해주세요.'
                autoComplete='on'
                required
              /> <RedCircleIcon/>
              <XMarkIcon/>
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
              /><GreenCircleIcon/>
              <CheckIcon/>
            </InputLabel>
            <PasswordText>영문 소문자, 특수문자 포함(,./~) 6글자</PasswordText>
          </InputContainer>

          <ButtonText>*닉네임과 비밀번호는 이번 채팅방에서만 사용돼요.</ButtonText>
          <button />
        </LoginForm>
      </LoginContainer>
      <Button text='입장하기' />
    </ChatRoomCreatedContainer>
  );
};

export default ChatRoomCreatedPage;
const ChatRoomCreatedContainer = styled.div`
  padding: 100px 60px 0 60px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const ChatRoomCreatedHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;
const Title = styled.p`
  color: #3e3333;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
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
  width: 138px;

  display: flex;
  flex-direction: row;
  gap: 25px;
`;
const QRActionItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;

  color: #7c7c7c;
  font-size: 12px;
  font-weight: 500;

  cursor: pointer;
`;
const ActionIcon = styled.span`
  width: 18px;
  height: 18px;

  display: inline-block;
  background-color: #d9d9d9;
`;
const QRText = styled.p`
  margin-top: 10px;
  color: #3e3333;
  text-align: center;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;
`;
const QRSubText = styled.p`
  margin-bottom: 25px;
  color: #b7b7b7;

  font-size: 12px;
  font-weight: 500;
`;

const QRLine = styled.hr`
  width: 235px;
  margin-bottom: 20px;

  border:none;
  height: 1px;
  background-color:#F0F0F0;
`;

const LoginContainer = styled.div`
  width: 273px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
`;

const InputContainer = styled.div`
  position: relative;
`;

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
  padding-right:35px;
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
  padding-top: 25px;

  color: #b7b7b7;
  font-size: 10px;
  font-weight: 500;
  text-align: center;
`;

const RedCircleIcon = styled(RedCircle)`
  width:19px;
  height:19px;

  position: absolute;
  top:36px;
  right:10px;
  transform: translate(50%, -50%);
`
const XMarkIcon = styled(XMark)`
  width:9px;
  height:9px;
  
  position: absolute;
  top:36px;
  right:10px;
  transform: translate(50%, -50%);
`
const GreenCircleIcon =styled(GreenCirle)`
  width:19px;
  height:19px;

  position: absolute;
  top:36px;
  right:10px;
  transform: translate(50%, -50%);
`
const CheckIcon =styled(Check)`
  width:9px;
  height:9px;
  
  position: absolute;
  top:36px;
  right:10px;
  transform: translate(50%, -50%);
`
