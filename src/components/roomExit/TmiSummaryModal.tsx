import styled from '@emotion/styled';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { SubTitle, Title } from '@components/shared/TextStyles';
import { Mask, ModalBody } from '@components/shared/ModalStyles';
import { RoomResult } from '@pages/tmiExit/tmiSummaryPage';
import useRoomUsersStore from '@store/useRoomUsersStore';
import CharacterIcons from '@components/shared/CharacterIcons';

interface TmiSummaryModalProps {
  onClose: () => void;
  data: RoomResult;
}
// 채팅룸 종료 페이지에 보여지는 요약 카드 모달
const TmiSummaryModal = ({ onClose, data }: TmiSummaryModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const user = useRoomUsersStore((state) => state.user);
  const nickname = user?.nickname;
  const character = user?.character as keyof typeof CharacterIcons;

  // 길게 누를 때 실행되는 함수
  const handleLongPress = () => {
    timerRef.current = setTimeout(async () => {
      if (modalRef.current) {
        const canvas = await html2canvas(modalRef.current);
        const link = document.createElement('a');
        const fileName = `채팅요약_${new Date().toISOString().split('T')[0]}.png`;
        link.href = canvas.toDataURL('image/png');
        link.download = fileName;
        link.click();
      }
    }, 1000); // 1초 이상 눌렀을 때 캡처
  };

  // 터치나 마우스를 떼면 타이머를 취소
  const handlePressEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <>
      <Mask onClick={onClose} />
      <ModalBody
        ref={modalRef}
        onTouchStart={handleLongPress} // 모바일 터치 이벤트
        onTouchEnd={handlePressEnd} // 터치 끝났을 때
        onTouchCancel={handlePressEnd} // 터치 취소 시
        onMouseDown={handleLongPress} // 데스크탑에서 마우스 클릭 시작
        onMouseUp={handlePressEnd} // 마우스 클릭 끝났을 때
        onMouseLeave={handlePressEnd} // 마우스 떠날 때
        className='cursor-pointer'
      >
        <ProfileContainer>
          <ProfileImage src={CharacterIcons[character]} />
          <ProfileTextContainer>
            <SubTitle>이름</SubTitle>
            <Title>{nickname}</Title>
          </ProfileTextContainer>
        </ProfileContainer>
        <Divider />
        <InfoContainer>
          <KeywordContainer>
            <SubTitle>맞춘 TMI</SubTitle>
            <Keyword>{data.correctCount}개</Keyword>
          </KeywordContainer>
          <KeywordContainer>
            <SubTitle>틀린 TMI</SubTitle>
            <Keyword>{data.incorrectCount}개</Keyword>
          </KeywordContainer>
          <KeywordContainer>
            <SubTitle>가장 TMI를 잘 맞춘 사람</SubTitle>
            <Keyword>
              1위:{' '}
              {data.topVoters?.length > 0 &&
                (data.topVoters.length > 1
                  ? `${data.topVoters.map((voter) => `${voter.memberName}(${voter.correctCount}개)`).join(', ')}`
                  : `${data.topVoters[0].memberName}(${data.topVoters[0].correctCount}개)`)}
            </Keyword>
          </KeywordContainer>
          <KeywordContainer>
            <SubTitle>가장 많은 사람이 틀린 TMI</SubTitle>
            <Keyword>
              {data.mostIncorrectTmis?.length > 0 && data.mostIncorrectTmis[0].tmiContent}
            </Keyword>
          </KeywordContainer>
        </InfoContainer>
        <SaveInstruction>이미지를 꾹 눌러 저장해 보세요.</SaveInstruction>
      </ModalBody>
    </>
  );
};
export default TmiSummaryModal;

const ProfileContainer = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;

const ProfileImage = styled.img`
  background-color: #d9d9d9;
  border-radius: 8px;
`;

const ProfileTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
const KeywordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Keyword = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const Divider = styled.div`
  width: 257px;
  height: 1px;
  background-color: #f0f0f0;
`;
const SaveInstruction = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: white;
  position: absolute;
  bottom: -28px;
  left: 64px;
`;
