import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { Mask } from '@components/shared/ModalStyles';
import styled from '@emotion/styled';
import { Title, SubTitle } from '@components/shared/TextStyles';
import { useState, useEffect } from 'react';
import { getQuestions } from '@api/keyword';
type Question = {
  id: number;
  keyword: string;
  question: string;
};
const KeywordModal = () => {
  const [questions, setQuestions] = useState<Question[]>();
  const keyword = 'mbti';

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!keyword) return;
      try {
        const res = await getQuestions(keyword);
        setQuestions(res.data);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };
    fetchQuestions();
  }, [keyword]);
  if (!questions) return <p>로딩중</p>;
  return (
    <>
      <Mask />
      <Swiper
        style={{
          width: '268px',
          height: '282px',
          position: 'fixed',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className='mySwiper'
      >
        {questions?.map((item, id: number) => (
          <SwiperSlide
            key={id}
            style={{
              padding: '34px 29px',
              paddingBottom: '90px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: '12px',
            }}
          >
            <Box>
              <Title>{item.keyword}</Title>
              <Divider />
            </Box>
            <KeywordSubTitle>{item.question}</KeywordSubTitle>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default KeywordModal;
const KeywordSubTitle = styled(SubTitle)`
  line-height: 140%;
  text-align: center;
  color: #3e3333;
`;
const Divider = styled.div`
  height: 1px;
  width: 106px;
  background-color: #f0f0f0;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;
