import { Swiper, SwiperSlide } from 'swiper/react';
import KeywordCard from './keywordCard';
import { EffectCards } from 'swiper/modules';
import { Mask } from '@components/shared/ModalStyles';
const KeywordModal = () => {
  const keywords = [
    { title: '#LOL', question: 'Q. 롤에서 가장 싫은 챔피언은?' },
    { title: '#VAL', question: 'Q. 발로란트에서 제일 잘 쏜 순간은?' },
    { title: '#FOOD', question: 'Q. 최근에 먹은 음식 중 가장 맛있었던 건?' },
    { title: '#TRAVEL', question: 'Q. 다시 가고 싶은 여행지는?' },
    { title: '#MOVIE', question: 'Q. 최근에 본 영화 중 인상 깊은 장면은?' },
    { title: '#MBTI', question: 'Q. 내 MBTI에 제일 어울리는 행동은?' },
    { title: '#LOVE', question: 'Q. 이상형을 한 문장으로 말해본다면?' },
    { title: '#STRESS', question: 'Q. 스트레스 받을 때 주로 하는 행동은?' },
    { title: '#MUSIC', question: 'Q. 요즘 가장 자주 듣는 노래는?' },
    { title: '#FASHION', question: 'Q. 나만의 패션 포인트는?' },
    { title: '#PET', question: 'Q. 키우고 싶은(또는 키우는) 반려동물은?' },
  ];
  return (
    <>
      <Mask />

      <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className='mySwiper'>
        {keywords.map((item, id) => (
          <SwiperSlide key={id}>
            <KeywordCard title={item.title} question={item.question} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default KeywordModal;
