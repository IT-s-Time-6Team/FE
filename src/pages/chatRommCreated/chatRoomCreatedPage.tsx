import styled from '@emotion/styled';
import { Title, SubTitle } from '@components/shared/TextStyles';
import { Container, Header } from '@components/shared/UIStyles';
import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import ReloadIcon from '@assets/ReloadIcon.svg?react';
import DownloadIcon from '@assets/DownloadIcon.svg?react';

import useNicknameValidation from '@hooks/InputValidation/useNicknameValid';
import usePasswordValidation from '@hooks/InputValidation/usePasswordValid';
import {
  LoginContainer,
  LoginForm,
  InputContainer,
  InputLabel,
  NicknameInput,
  PasswordInput,
  CircleIcon,
  CheckIcon,
  XMarkIcon,
} from '@components/shared/LoginFormStyle';
import ValidationMessage from '@components/chatRoomCreated/ValidationMessage';
import Button from '@components/chatRoomCreated/LoginButton';

const ChatRoomCreatedPage = () => {
  const roomId = '1234';
  const chatRoomUrl = `${roomId}`;

  const [qrValue, setQrValue] = useState(chatRoomUrl);
  const qrRef = useRef<HTMLCanvasElement | null>(null);

  const { nickname, isNicknameValid, handleNicknameChange } = useNicknameValidation();
  const { password, isPasswordValid, handlePasswordChange } = usePasswordValidation();
  const isFormValid = isNicknameValid === true && isPasswordValid === true;

  //QR코드 재생성
  const handleGenerateQR = () => {
    setQrValue(`${chatRoomUrl}?t=${Date.now()}`);
  };

  //QR코드 다운로드
  const handleDownloadQR = () => {
    const canvas = qrRef.current;
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'QRcode.png';
    link.click();
  };
  //QR코드 링크 복사
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
            <Reload />
            다시 생성
          </QRActionItem>
          <QRActionItem onClick={handleDownloadQR}>
            <Download />
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
                value={nickname}
                $valid={isNicknameValid}
                onChange={(e) => handleNicknameChange(e.target.value)}
                placeholder='채팅방에서 사용할 닉네임을 입력해주세요.'
                autoComplete='on'
                required
              />
              <CircleIcon $valid={isNicknameValid} />
              <CheckIcon $show={isNicknameValid === true} />
              <XMarkIcon $show={isNicknameValid === false} />
            </InputLabel>
            <ValidationMessage valid={isNicknameValid} type='nickname' />
          </InputContainer>

          <InputContainer>
            <InputLabel>
              비밀번호
              <PasswordInput
                type='password'
                name='password'
                value={password}
                $valid={isPasswordValid}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder='채팅방에서 사용할 비밀번호를 입력해 주세요.'
                autoComplete='current-password'
                required
              />
              <CircleIcon $valid={isPasswordValid} />
              <CheckIcon $show={isPasswordValid === true} />
              <XMarkIcon $show={isPasswordValid === false} />
            </InputLabel>
            <ValidationMessage valid={isPasswordValid} type='password' />
          </InputContainer>

          <ButtonText>*닉네임과 비밀번호는 이번 채팅방에서만 사용돼요.</ButtonText>
        </LoginForm>
      </LoginContainer>
      <EntranceButton text='입장하기' active={isFormValid} />
    </ChatRoomCreatedContainer>
  );
};

export default ChatRoomCreatedPage;
const ChatRoomCreatedContainer = styled(Container)`
  padding: 100px 60px 0 60px;
  gap: 20px;
`;
const ChatRoomCreatedHeader = styled(Header)`
  gap: 5px;
`;
const QRCodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;
const QRActionGroup = styled.div`
  width: 145px;

  display: flex;
  flex-direction: row;
  gap: 25px;
`;
const QRActionItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;

  color: #7c7c7c;
  font-size: 12px;
  font-weight: 500;

  cursor: pointer;
`;
const Reload = styled(ReloadIcon)`
  width: 20px;
  height: 20px;
`;
const Download = styled(DownloadIcon)`
  width: 20px;
  height: 20px;
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

  border: none;
  height: 1px;
  background-color: #f0f0f0;
`;

const ButtonText = styled.p`
  padding-top: 25px;

  color: #b7b7b7;
  font-size: 10px;
  font-weight: 500;
  text-align: center;
`;

const EntranceButton = styled(Button)`
  position: absolute;
  bottom: 47px;
`;
