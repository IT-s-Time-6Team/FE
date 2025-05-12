import { CharacterImg, CharactersContainer } from '../../styles/chatRoom/chatRoom';
import rabbit from '../../assets/chatRoom/character/rabbit.svg';
import bear from '../../assets/chatRoom/character/bear.svg';
import cat from '../../assets/chatRoom/character/cat.svg';
import chick from '../../assets/chatRoom/character/chick.svg';
import pan from '../../assets/chatRoom/character/pan.svg';
import pig from '../../assets/chatRoom/character/pig.svg';
import snake from '../../assets/chatRoom/character/snake.svg';
import TypingDots from './Typing';
import styled from '@emotion/styled';

type Props = {
  count: number;
};

const Characters = ({ count }: Props) => {
  const CharacterImgs = [rabbit, chick, pan, cat, pig, snake, bear];

  return (
    <CharactersContainer>
      {Array.from({ length: count }).map((_, index) => {
        const total = 7;
        const imgIndex = index % CharacterImgs.length;

        if (index === 6) {
          return (
            <CharacterContainer
              key={index}
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <TypingDots arrow={index} />
              <CharacterImg src={CharacterImgs[imgIndex]} alt={`character-${index}`} />
            </CharacterContainer>
          );
        }

        const angle = (index / (total - 1)) * 2 * Math.PI - Math.PI + 1.2;
        const radius = 40;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);

        return (
          <CharacterContainer
            key={index}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CharacterImg src={CharacterImgs[imgIndex]} alt={`character-${index}`} />
            <TypingDots arrow={index} />
          </CharacterContainer>
        );
      })}
    </CharactersContainer>
  );
};
export default Characters;
const CharacterContainer = styled.div`
  position: absolute;
`;
