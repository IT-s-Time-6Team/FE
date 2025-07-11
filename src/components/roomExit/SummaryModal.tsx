import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { SubTitle, Title } from '@components/shared/TextStyles';
import { Mask, ModalBody } from '@components/shared/ModalStyles';
import { RoomResult } from '@pages/chatRoomExit/chatRoomSummaryPage';
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
  KeywordList,
  KeywordWrapper,
  Keyword,
  MoreKeywords,
} from '../../styles/roomExit/modalStyles';

interface SummaryModalProps {
  onClose: () => void;
  data: RoomResult;
}
// 채팅룸 종료 페이지에 보여지는 요약 카드 모달
const SummaryModal = ({ onClose, data }: SummaryModalProps) => {
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

  const MAX_VISIBLE_KEYWORDS = 3;
  const visibleKeywords = data.sharedKeywords.slice(0, MAX_VISIBLE_KEYWORDS);
  const hiddenKeywordCount = data.sharedKeywords.length - MAX_VISIBLE_KEYWORDS;
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
            <SubTitle>공감한 키워드</SubTitle>
            <KeywordList>
              <KeywordWrapper>
                {visibleKeywords.map((keyword, id) => (
                  <Keyword key={id}>#{keyword}</Keyword>
                ))}
              </KeywordWrapper>
              {hiddenKeywordCount > 0 && <MoreKeywords>+{hiddenKeywordCount}</MoreKeywords>}
            </KeywordList>
          </KeywordContainer>
          <KeywordContainer>
            <SubTitle>총 대화시간</SubTitle>
            <Keyword>{data.totalDuration}</Keyword>
          </KeywordContainer>
          <KeywordContainer>
            <SubTitle>가장 많은 키워드를 작성한 사람</SubTitle>
            <Keyword>
              {' '}
              1위:{' '}
              {data.topKeywordContributorNames.length > 1
                ? data.topKeywordContributorNames.join(', ')
                : data.topKeywordContributorNames[0]}{' '}
              ({data.topKeywordCount}개)
            </Keyword>
          </KeywordContainer>
          <KeywordContainer>
            <SubTitle>취미가 가장 많이 겹친 사람</SubTitle>
            <Keyword>
              {' '}
              1위:{' '}
              {data.mostMatchedHobbyUserNames.length > 1
                ? data.mostMatchedHobbyUserNames.join(', ')
                : data.mostMatchedHobbyUserNames[0]}{' '}
              ({data.matchedHobbyCount}개)
            </Keyword>
          </KeywordContainer>
        </InfoContainer>
        <SaveInstruction>이미지를 꾹 눌러 저장해 보세요.</SaveInstruction>
      </ModalBody>
    </>
  );
};
export default SummaryModal;
