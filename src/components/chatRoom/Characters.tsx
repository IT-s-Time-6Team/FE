import { CharacterImg, CharactersContainer } from '../../styles/chatRoom/chatRoom';
import rabbit from '../../assets/chatRoom/character/rabbit.svg';
import bear from '../../assets/chatRoom/character/bear.svg';
import cat from '../../assets/chatRoom/character/cat.svg';
import chick from '../../assets/chatRoom/character/chick.svg';
import pan from '../../assets/chatRoom/character/pan.svg';
import pig from '../../assets/chatRoom/character/pig.svg';
import snake from '../../assets/chatRoom/character/snake.svg';
import styled from '@emotion/styled';
import { User } from 'src/types/chatRoom';

type Props = {
  count: number;
  user: User[];
};

const Characters = ({ count, user }: Props) => {
  const CharacterImgList = [rabbit, chick, pan, cat, pig, snake, bear];
  console.log(user);
  return (
    <CharactersContainer>
      {Array.from({ length: count }).map((_, index) => {
        const total = 7;
        if (index >= total) return null;
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
              <CharacterImg src={CharacterImgList[6]} alt={`character-${index}`} />
            </CharacterContainer>
          );
        }

        const angle = (index / (total - 1)) * 1.9 * Math.PI - Math.PI + 1.25;
        const radius = 41.6;
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
            <CharacterImg src={CharacterImgList[index]} alt={`character-${index}`} />
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
