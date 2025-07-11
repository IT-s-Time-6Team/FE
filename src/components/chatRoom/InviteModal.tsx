import styled from '@emotion/styled';
import { useState, useRef } from 'react';
import ReloadIcon from '@assets/ReloadIcon.svg?react';
import DownloadIcon from '@assets/DownloadIcon.svg?react';
import { Mask, ModalBody } from '@components/shared/ModalStyles';
import { QRCodeCanvas } from 'qrcode.react';

interface SummaryModalProps {
  onClose: () => void;
  roomId: string;
}
const InviteModal = ({ onClose, roomId }: SummaryModalProps) => {
  const isDev = window.location.hostname.includes('dev');
  const chatRoomUrl = isDev
    ? `https://dev.okii.kr/rooms/${roomId}/member`
    : `https://okii.kr/rooms/${roomId}/member`;

  const [qrValue, setQrValue] = useState(chatRoomUrl);
  const [downloaded, setDownloaded] = useState(false);
  const [copy, setCopy] = useState(false);
  const qrRef = useRef<HTMLCanvasElement | null>(null);

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
    link.download = 'QR코드.png';
    link.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };
  //QR코드 링크 복사
  const handleCopyLink = async () => {
    try {
      const url = chatRoomUrl;
      await navigator.clipboard.writeText(url);
      setCopy(true);
      setTimeout(() => setCopy(false), 2000);
    } catch {
      alert('복사에 실패했어요');
    }
  };
  return (
    <>
      <Mask onClick={onClose} />
      <InviteModalBody>
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

          {/*  <QRText onClick={handleCopyLink}>초대 링크</QRText> */}
          <QRText onClick={handleCopyLink}>{chatRoomUrl}</QRText>

          <QRSubText>링크를 클릭하여 복사할 수 있어요</QRSubText>
        </QRCodeWrapper>
        {(downloaded || copy) && (
          <DownloadNotice>
            <ColoredQRSubText>
              {downloaded ? 'QR코드가 다운로드 되었습니다.' : '링크가 복사되었습니다.'}
            </ColoredQRSubText>
          </DownloadNotice>
        )}
      </InviteModalBody>
    </>
  );
};
export default InviteModal;
const InviteModalBody = styled(ModalBody)`
  width: 268px;
  height: 282px;
  align-items: center;
`;
const QRCodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const QRText = styled.p`
  margin-top: 10px;
  color: #3e3333;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
`;
const QRSubText = styled.p`
  margin-bottom: 25px;
  color: #b7b7b7;
  font-size: 12px;
  font-weight: 500;
`;
const ColoredQRSubText = styled(QRSubText)`
  color: #7c7c7c;
  margin: 0;
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
const DownloadNotice = styled.div`
  width: 211px;
  height: 31px;

  position: absolute;
  bottom: -45px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: #f7f7f7;
  border-radius: 8px;
  color: #b7b7b7;
  font-size: 12px;
  font-weight: 500;
  animation: fadeOut 2s forwards;

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
