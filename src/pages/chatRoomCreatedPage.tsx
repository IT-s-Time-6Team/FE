import styled from '@emotion/styled';
import { QRCodeCanvas } from 'qrcode.react';

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
      </QRCodeWrapper>
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
`;
