import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { SubTitle, Title } from '@components/shared/TextStyles';
import { Mask, ModalBody } from '@components/shared/ModalStyles';
import { FinalResult } from '@pages/balanceExit/balanceSummaryPage';
import useRoomUsersStore from '@store/useRoomUsersStore';
import CharacterIcons from '@components/shared/CharacterIcons';
import {
  ProfileContainer,
  ProfileImage,
  ProfileTextContainer,
  Divider,
  SaveInstruction,
  InfoContainer,
  KeywordContainer,
  Keyword,
} from '../../styles/roomExit/modalStyles';

interface TmiSummaryModalProps {
  onClose: () => void;
  data: FinalResult;
}
// 채팅룸 종료 페이지에 보여지는 요약 카드 모달
const BalanceSummaryModal = ({ onClose, data }: TmiSummaryModalProps) => {
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
            <SubTitle>나의 점수</SubTitle>
            <Keyword>{data.finalScore}점</Keyword>
          </KeywordContainer>
          <KeywordContainer>
            <SubTitle>점수가 가장 높은 사람</SubTitle>
            <Keyword>{data.winnerNicknames.join(', ')}</Keyword>
          </KeywordContainer>
          <KeywordContainer>
            <SubTitle>가장 투표가 비슷했던 밸런스 질문</SubTitle>
            <Keyword>
              {data?.mostBalancedQuestions[0]?.questionA} vs{' '}
              {data?.mostBalancedQuestions[0]?.questionB}
            </Keyword>
          </KeywordContainer>
          <KeywordContainer>
            <SubTitle>가장 만장일치에 가까웠던 밸런스 질문</SubTitle>
            <Keyword>
              {data?.mostUnanimousQuestions[0]?.questionA} vs{' '}
              {data?.mostUnanimousQuestions[0]?.questionB}
            </Keyword>
          </KeywordContainer>
        </InfoContainer>
        <SaveInstruction>이미지를 꾹 눌러 저장해 보세요.</SaveInstruction>
      </ModalBody>
    </>
  );
};
export default BalanceSummaryModal;
