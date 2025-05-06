import { CharacterImg, CharactersContainer } from '../../styles/chatRoom/chatRoom';
import rabbit from '../../assets/chatRoom/character/rabbit.svg';
import bear from '../../assets/chatRoom/character/bear.svg';
import cat from '../../assets/chatRoom/character/cat.svg';
import chick from '../../assets/chatRoom/character/chick.svg';
import pan from '../../assets/chatRoom/character/pan.svg';
import pig from '../../assets/chatRoom/character/pig.svg';
import snake from '../../assets/chatRoom/character/snake.svg';

interface User {
  id: number;
  name: string;
}
type Props = {
  users: User[];
};

const Characters = ({ users }: Props) => {
  const CharacterImgs = [rabbit, chick, pan, cat, pig, snake, bear];
  return (
    <>
      <CharactersContainer>
        {users.map((user, index) => {
          const total = CharacterImgs.length;
          if (index === 6) {
            return (
              <CharacterImg
                key={index}
                src={CharacterImgs[index]}
                alt={`${user.name}`}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          }
          const angle = (index / (total - 1)) * 2 * Math.PI - Math.PI + 1.2;
          const radius = 40;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          return (
            <CharacterImg
              key={index}
              src={CharacterImgs[index]}
              alt={`${user.name}`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        })}
      </CharactersContainer>
    </>
  );
};
export default Characters;
